using System.Text.Json;
using System.Text.Json.Nodes;

namespace MSLX.Plugin.Mcp.Mcp;

/// <summary>
/// 一个 JSON-RPC 2.0 请求。id 为 null 表示通知（notification），无响应。
/// </summary>
public sealed class JsonRpcRequest
{
    public string? Jsonrpc { get; set; }
    public string? Method { get; set; }
    /// <summary>id 可能是数字、字符串或 null，保留原始 JSON。</summary>
    public JsonNode? Id { get; set; }
    public JsonNode? Params { get; set; }
}

/// <summary>JSON-RPC 2.0 错误对象。</summary>
public sealed class JsonRpcError
{
    public int Code { get; init; }
    public string Message { get; init; } = "";
    public object? Data { get; init; }

    public static JsonRpcError ParseError(string msg) => new() { Code = -32700, Message = msg };
    public static JsonRpcError InvalidRequest(string msg) => new() { Code = -32600, Message = msg };
    public static JsonRpcError MethodNotFound(string method) => new() { Code = -32601, Message = $"Method not found: {method}" };
    public static JsonRpcError InvalidParams(string msg) => new() { Code = -32602, Message = msg };
    public static JsonRpcError Internal(string msg, object? data = null) => new() { Code = -32603, Message = msg, Data = data };

    public JsonObject ToJson() => new()
    {
        ["code"] = Code,
        ["message"] = Message,
        ["data"] = Data is null ? null : JsonSerializer.SerializeToNode(Data)
    };
}

/// <summary>统一的工具执行结果：成功返回内容，失败返回 isError=true 的文本。</summary>
public sealed class ToolResult
{
    public bool IsError { get; init; }
    public string Text { get; init; } = "";

    public static ToolResult Ok(string text) => new() { IsError = false, Text = text };
    public static ToolResult Ok(object payload) => new() { IsError = false, Text = JsonSerializer.Serialize(payload, JsonOpts.Pretty) };
    public static ToolResult Fail(string text) => new() { IsError = true, Text = text };
}

public static class JsonOpts
{
    public static readonly JsonSerializerOptions Pretty = new()
    {
        WriteIndented = true,
        Encoder = System.Text.Encodings.Web.JavaScriptEncoder.UnsafeRelaxedJsonEscaping
    };

    public static readonly JsonSerializerOptions Compact = new()
    {
        WriteIndented = false,
        Encoder = System.Text.Encodings.Web.JavaScriptEncoder.UnsafeRelaxedJsonEscaping
    };
}
