using System.Text.Json.Nodes;

namespace MSLX.Plugin.Mcp.Mcp;

/// <summary>
/// MCP 工具清单（名称 + JSON Schema）与 dispatch 入口。
/// </summary>
public static class ToolRegistry
{
    public static JsonArray BuildToolList() => new(All().Select(t => (JsonNode)t).ToArray());

    private static JsonObject Tool(string name, string description, JsonObject inputSchema) => new()
    {
        ["name"] = name,
        ["description"] = description,
        ["inputSchema"] = inputSchema
    };

    private static JsonObject Obj(params (string key, JsonObject val)[] props)
    {
        var p = new JsonObject();
        foreach (var (k, v) in props) p[k] = v;
        return new JsonObject { ["type"] = "object", ["properties"] = p, ["additionalProperties"] = false };
    }

    private static JsonObject Prop(string type, string desc, string[]? enums = null)
    {
        var o = new JsonObject { ["type"] = type, ["description"] = desc };
        if (enums is not null) o["enum"] = new JsonArray(enums.Select(e => (JsonNode)e).ToArray());
        return o;
    }

    private static JsonObject InstanceId() => Prop("integer", "MSLX 服务端实例 ID（可用 list_instances 获取）");

    private static IEnumerable<JsonObject> All()
    {
        // ---- 实例查询 ----
        yield return Tool("list_instances",
            "列出 MSLX 中所有 Minecraft 服务端实例（ID、名称、核心、运行状态、在线人数）。",
            Obj());

        yield return Tool("get_instance_info",
            "获取单个实例的详细信息：运行状态、在线玩家、已运行时长、实例目录、核心等。",
            new JsonObject
            {
                ["type"] = "object",
                ["properties"] = new JsonObject { ["instance_id"] = InstanceId() },
                ["required"] = new JsonArray("instance_id")
            });

        // ---- 实例控制（合并开关） ----
        yield return Tool("instance_power",
            "启动 / 停止 / 重启 / 强制结束一个实例。action: start、stop、restart、kill。",
            new JsonObject
            {
                ["type"] = "object",
                ["properties"] = new JsonObject
                {
                    ["instance_id"] = InstanceId(),
                    ["action"] = Prop("string", "start=启动, stop=安全停止, restart=重启, kill=强制结束进程", new[] { "start", "stop", "restart", "kill" })
                },
                ["required"] = new JsonArray("instance_id", "action")
            });

        // ---- 命令输入 ----
        yield return Tool("send_command",
            "向实例控制台发送一条命令（无需带前导 /）。例如 say hello、gamemode creative <player>、list。",
            new JsonObject
            {
                ["type"] = "object",
                ["properties"] = new JsonObject
                {
                    ["instance_id"] = InstanceId(),
                    ["command"] = Prop("string", "要发送的命令文本"),
                    ["repeat_to_log"] = Prop("boolean", "是否把该命令也回显到日志，默认 true")
                },
                ["required"] = new JsonArray("instance_id", "command")
            });

        yield return Tool("get_logs",
            "读取实例当前控制台输出日志的尾部若干行。",
            new JsonObject
            {
                ["type"] = "object",
                ["properties"] = new JsonObject
                {
                    ["instance_id"] = InstanceId(),
                    ["lines"] = Prop("integer", "返回最后多少行，默认 200，最大 2000")
                },
                ["required"] = new JsonArray("instance_id")
            });

        // ---- 插件自身配置（结构化） ----
        yield return Tool("get_plugin_config",
            "读取本 MCP 插件的自身配置（apiKey 会脱敏显示）。",
            Obj());

        yield return Tool("set_plugin_config",
            "修改本 MCP 插件的自身配置项。key: apiKey / allowFileWrite / allowHeavyOps。",
            new JsonObject
            {
                ["type"] = "object",
                ["properties"] = new JsonObject
                {
                    ["key"] = Prop("string", "配置键：apiKey（重置访问密钥）、allowFileWrite（true/false）、allowHeavyOps（true/false）"),
                    ["value"] = Prop("string", "配置值（布尔请填 true/false）")
                },
                ["required"] = new JsonArray("key", "value")
            });

        // ---- 沙箱化文件工具（覆盖 server.properties 等官方无 API 的层） ----
        yield return Tool("list_files",
            "列出某个实例根目录（或其子目录）下的文件与文件夹。path 为相对实例根目录的相对路径，留空表示根目录。",
            new JsonObject
            {
                ["type"] = "object",
                ["properties"] = new JsonObject
                {
                    ["instance_id"] = InstanceId(),
                    ["path"] = Prop("string", "相对实例根目录的相对路径，留空为根目录")
                },
                ["required"] = new JsonArray("instance_id")
            });

        yield return Tool("read_file",
            "读取实例目录内的一个文本文件（如 server.properties、whitelist.json）。超过上限会被截断。",
            new JsonObject
            {
                ["type"] = "object",
                ["properties"] = new JsonObject
                {
                    ["instance_id"] = InstanceId(),
                    ["path"] = Prop("string", "相对实例根目录的文件相对路径"),
                    ["max_bytes"] = Prop("integer", "最多读取字节数，默认 262144，最大 1048576")
                },
                ["required"] = new JsonArray("instance_id", "path")
            });

        yield return Tool("edit_file",
            "对实例目录内的文本文件做局部字符串替换（优先用它而不是整文件重写，避免写坏配置）。写入前会自动备份原文件。",
            new JsonObject
            {
                ["type"] = "object",
                ["properties"] = new JsonObject
                {
                    ["instance_id"] = InstanceId(),
                    ["path"] = Prop("string", "相对实例根目录的文件相对路径"),
                    ["old_string"] = Prop("string", "要被替换的原文（需唯一匹配，除非 replace_all=true）"),
                    ["new_string"] = Prop("string", "替换后的新文本"),
                    ["replace_all"] = Prop("boolean", "是否替换全部匹配，默认 false")
                },
                ["required"] = new JsonArray("instance_id", "path", "old_string", "new_string")
            });
    }

    /// <summary>dispatch 到一个工具。任何异常都转成 ToolResult.Fail，避免把栈泄给客户端。</summary>
    public static ToolResult Dispatch(McpTools tools, string name, JsonObject? args)
    {
        try
        {
            return tools.Invoke(name, args ?? new JsonObject());
        }
        catch (Exception ex)
        {
            SDK.MSLX.Logger.Error($"[MCP] 工具 {name} 执行异常", ex);
            return ToolResult.Fail($"工具执行异常: {ex.Message}");
        }
    }
}

