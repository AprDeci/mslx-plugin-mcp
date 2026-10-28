using System.Text;
using System.Text.Json;
using System.Text.Json.Nodes;
using MSLX.SDK;
using Microsoft.AspNetCore.Http;

namespace MSLX.Plugin.Mcp.Mcp;

/// <summary>
/// 基于 HTTP 的 MCP（Model Context Protocol）JSON-RPC 端点处理器。
/// 采用 Streamable HTTP 的「纯 JSON 响应」模式：POST 一条/一批 JSON-RPC，返回 application/json。
/// 不使用 SSE（GET 返回 405），对 curl / 各类 MCP 客户端最稳。
/// </summary>
public static class McpEndpoint
{
    public const string Route = "/api/plugin/mslx-plugin-mcp/mcp";
    private const string DefaultProtocolVersion = "2025-06-18";
    private const int MaxBodyBytes = 4 * 1024 * 1024;

    public static async Task HandleAsync(HttpContext ctx)
    {
        // 鉴权：宿主已鉴权（X-API-Key / X-User-Token / 登录态）即放行，插件自带 Key 仅作直连兜底
        if (!IsAuthorized(ctx))
        {
            ctx.Response.StatusCode = StatusCodes.Status401Unauthorized;
            await WriteJsonAsync(ctx, new JsonObject
            {
                ["jsonrpc"] = "2.0",
                ["error"] = JsonRpcError.InvalidRequest("未授权：请提供宿主的 X-API-Key（面板 → 用户管理 → API 密钥）").ToJson(),
                ["id"] = null
            });
            return;
        }

        if (!HttpMethods.IsPost(ctx.Request.Method))
        {
            // 无 SSE 推送；Strict 客户端收到 405 会回落到纯 JSON 模式。
            ctx.Response.StatusCode = StatusCodes.Status405MethodNotAllowed;
            ctx.Response.Headers["Allow"] = "POST";
            await ctx.Response.WriteAsync("MCP endpoint: use POST with JSON-RPC body.");
            return;
        }

        string body;
        using (var reader = new StreamReader(ctx.Request.Body, Encoding.UTF8))
        {
            body = await reader.ReadToEndAsync();
        }
        if (body.Length > MaxBodyBytes)
        {
            ctx.Response.StatusCode = StatusCodes.Status413PayloadTooLarge;
            return;
        }

        JsonNode? parsed;
        try
        {
            parsed = JsonNode.Parse(body);
        }
        catch (JsonException ex)
        {
            await WriteAsync(ctx, ErrorResponse(null, JsonRpcError.ParseError(ex.Message)));
            return;
        }

        if (parsed is JsonArray batch)
        {
            if (batch.Count == 0)
            {
                await WriteAsync(ctx, ErrorResponse(null, JsonRpcError.InvalidRequest("空的批量请求")));
                return;
            }
            var results = new JsonArray();
            foreach (var item in batch)
            {
                var resp = HandleOne(ctx, item);
                if (resp is not null) results.Add(resp);
            }
            if (results.Count == 0) { ctx.Response.StatusCode = StatusCodes.Status202Accepted; return; }
            await WriteAsync(ctx, results);
            return;
        }

        if (parsed is JsonObject obj)
        {
            var resp = HandleOne(ctx, obj);
            if (resp is null) { ctx.Response.StatusCode = StatusCodes.Status202Accepted; return; }
            await WriteAsync(ctx, resp);
            return;
        }

        await WriteAsync(ctx, ErrorResponse(null, JsonRpcError.InvalidRequest("请求必须是 JSON 对象或数组")));
    }

    /// <summary>处理单个 JSON-RPC 请求；通知返回 null。</summary>
    private static JsonObject? HandleOne(HttpContext ctx, JsonNode? node)
    {
        if (node is not JsonObject req)
            return ErrorResponse(null, JsonRpcError.InvalidRequest("无效的 JSON-RPC 请求对象"));

        var id = req["id"];
        var isNotification = id is null;
        var method = req["method"]?.GetValue<string>();
        var prms = req["params"] as JsonObject;

        if (string.IsNullOrEmpty(method))
            return isNotification ? null : ErrorResponse(id, JsonRpcError.InvalidRequest("缺少 method"));

        try
        {
            JsonObject? result;
            switch (method)
            {
                case "initialize":
                    result = HandleInitialize(prms);
                    break;
                case "ping":
                    result = new JsonObject();
                    break;
                case "tools/list":
                    result = new JsonObject { ["tools"] = ToolRegistry.BuildToolList() };
                    break;
                case "tools/call":
                    result = HandleToolCall(ctx, prms);
                    break;
                // 通知类（无 id）与未知通知：直接忽略
                case "notifications/initialized":
                case "notifications/cancelled":
                case "notifications/roots/list_changed":
                    return null;
                default:
                    return isNotification ? null : ErrorResponse(id, JsonRpcError.MethodNotFound(method));
            }

            if (isNotification) return null;
            return new JsonObject { ["jsonrpc"] = "2.0", ["id"] = id?.DeepClone(), ["result"] = result };
        }
        catch (Exception ex)
        {
            SDK.MSLX.Logger.Error($"[MCP] 处理 {method} 异常", ex);
            return isNotification ? null : ErrorResponse(id, JsonRpcError.Internal(ex.Message));
        }
    }

    private static JsonObject HandleInitialize(JsonObject? prms)
    {
        var clientVersion = prms?["protocolVersion"]?.GetValue<string>();
        var negotiated = string.IsNullOrEmpty(clientVersion) ? DefaultProtocolVersion : clientVersion!;
        return new JsonObject
        {
            ["protocolVersion"] = negotiated,
            ["capabilities"] = new JsonObject
            {
                ["tools"] = new JsonObject { ["listChanged"] = false }
            },
            ["serverInfo"] = new JsonObject
            {
                ["name"] = "mslx-plugin-mcp",
                ["version"] = MSLXPluginEntry.Instance?.Version ?? "1.0.0"
            },
            ["instructions"] = "MSLX MCP 控制台：可查看/控制 Minecraft 实例、发送控制台命令、读取日志、读写实例内的文本配置文件。"
        };
    }

    private static JsonObject HandleToolCall(HttpContext ctx, JsonObject? prms)
    {
        var name = prms?["name"]?.GetValue<string>();
        if (string.IsNullOrEmpty(name))
            return new JsonObject { ["isError"] = true, ["content"] = TextContent("缺少工具名称") };

        var args = prms?["arguments"] as JsonObject ?? new JsonObject();
        var tools = ctx.RequestServices.GetService(typeof(McpTools)) as McpTools;
        if (tools is null)
            return new JsonObject { ["isError"] = true, ["content"] = TextContent("插件服务未初始化") };

        var r = ToolRegistry.Dispatch(tools, name!, args);
        return new JsonObject
        {
            ["isError"] = r.IsError,
            ["content"] = new JsonArray(new JsonObject { ["type"] = "text", ["text"] = r.Text })
        };
    }

    private static JsonArray TextContent(string text) => new(new JsonObject { ["type"] = "text", ["text"] = text });

    private static JsonObject ErrorResponse(JsonNode? id, JsonRpcError error) => new()
    {
        ["jsonrpc"] = "2.0",
        ["id"] = id?.DeepClone(),
        ["error"] = error.ToJson()
    };

    /// <summary>
    /// 端点挂在宿主 /api 下，请求能到达这里说明宿主已校验过凭证；因此宿主鉴权通过即放行。
    /// 插件自带 Key（mcp_xxx）仅保留作直连兜底，不是必需。
    /// </summary>
    private static bool IsAuthorized(HttpContext ctx)
    {
        if (ctx.User?.Identity?.IsAuthenticated == true) return true;
        if (ctx.Request.Headers.ContainsKey("X-API-Key") || ctx.Request.Headers.ContainsKey("X-User-Token")) return true;

        var expected = McpSettings.GetOrCreateApiKey();
        string? provided = null;
        var auth = ctx.Request.Headers["Authorization"].FirstOrDefault();
        if (!string.IsNullOrEmpty(auth) && auth.StartsWith("Bearer ", StringComparison.OrdinalIgnoreCase))
            provided = auth["Bearer ".Length..].Trim();
        if (string.IsNullOrEmpty(provided)) return false;
        return FixedTimeEquals(provided!, expected);
    }

    private static bool FixedTimeEquals(string a, string b)
    {
        var ba = Encoding.UTF8.GetBytes(a);
        var bb = Encoding.UTF8.GetBytes(b);
        if (ba.Length != bb.Length) return false;
        return System.Security.Cryptography.CryptographicOperations.FixedTimeEquals(ba, bb);
    }

    private static async Task WriteAsync(HttpContext ctx, JsonNode payload)
    {
        ctx.Response.StatusCode = StatusCodes.Status200OK;
        await WriteJsonAsync(ctx, payload);
    }

    private static async Task WriteJsonAsync(HttpContext ctx, JsonNode payload)
    {
        ctx.Response.ContentType = "application/json; charset=utf-8";
        var json = payload.ToJsonString(JsonOpts.Compact);
        await ctx.Response.WriteAsync(json);
    }
}
