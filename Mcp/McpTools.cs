using System.Text.Json.Nodes;
using MSLX.SDK;
using MSLX.SDK.IServices;
using MSLX.SDK.Models;
using Newtonsoft.Json.Linq;

namespace MSLX.Plugin.Mcp.Mcp;

/// <summary>
/// MCP 工具的具体实现。通过构造函数注入宿主的实例生命周期 / 控制台服务。
/// </summary>
public sealed class McpTools
{
    private readonly IInstanceLifecycleService _lifecycle;
    private readonly IInstanceConsoleService _console;

    public McpTools(IInstanceLifecycleService lifecycle, IInstanceConsoleService console)
    {
        _lifecycle = lifecycle;
        _console = console;
    }

    private static readonly string[] StatusText = { "未启动", "启动中", "运行中", "停止中", "重启中" };
    private const long ReadDefault = 256 * 1024;
    private const long ReadMax = 1024 * 1024;
    private const long WriteMax = 1024 * 1024;

    public ToolResult Invoke(string name, JsonObject args)
    {
        if (!McpSettings.IsToolEnabled(name))
            return ToolResult.Fail($"功能已关闭：{name}。可在插件「MCP 控制台 → 功能开关」中开启。");

        return name switch
        {
            "list_instances" => ListInstances(),
            "get_instance_info" => GetInstanceInfo(args),
            "instance_power" => InstancePower(args),
            "send_command" => SendCommand(args),
            "get_logs" => GetLogs(args),
            "get_plugin_config" => GetPluginConfig(),
            "set_plugin_config" => SetPluginConfig(args),
            "list_files" => ListFiles(args),
            "read_file" => ReadFile(args),
            "edit_file" => EditFile(args),
            _ => ToolResult.Fail($"未知工具: {name}")
        };
    }

    // ---------------- 实例查询 ----------------

    private ToolResult ListInstances()
    {
        var servers = SDK.MSLX.Config.Servers.GetServerList();
        var list = new JsonArray();
        foreach (var s in servers)
        {
            var running = _lifecycle.IsServerRunning((uint)s.ID);
            int online = 0;
            try { online = _lifecycle.GetOnlinePlayers((uint)s.ID).Count; } catch { /* 未运行 */ }
            list.Add(new JsonObject
            {
                ["instance_id"] = s.ID,
                ["name"] = s.Name,
                ["core"] = s.Core,
                ["running"] = running,
                ["online_players"] = online,
                ["base"] = s.Base
            });
        }
        return ToolResult.Ok(new JsonObject { ["count"] = servers.Count, ["instances"] = list });
    }

    private ToolResult GetInstanceInfo(JsonObject args)
    {
        if (!TryGetInstance(args, out var s, out var err)) return err!;
        var id = (uint)s!.ID;
        var (code, msg) = _lifecycle.GetServerStatus(id);
        var status = code >= 0 && code < StatusText.Length ? StatusText[code] : msg;

        JsonArray players = new();
        try { players = new JsonArray(_lifecycle.GetOnlinePlayers(id).Select(p => (JsonNode)p).ToArray()); } catch { }
        double uptime = 0;
        try { uptime = _lifecycle.GetServerUptime(id).TotalSeconds; } catch { }

        return ToolResult.Ok(new JsonObject
        {
            ["instance_id"] = s.ID,
            ["name"] = s.Name,
            ["core"] = s.Core,
            ["base"] = s.Base,
            ["java"] = s.Java,
            ["args"] = s.Args,
            ["status_code"] = code,
            ["status"] = status,
            ["running"] = _lifecycle.IsServerRunning(id),
            ["online_players"] = players,
            ["uptime_seconds"] = Math.Round(uptime, 1),
            ["auto_restart"] = s.AutoRestart,
            ["ignore_eula"] = s.IgnoreEula,
            ["server_properties_path"] = s.ServerPropertiesPath
        });
    }

    // ---------------- 实例控制 ----------------

    private ToolResult InstancePower(JsonObject args)
    {
        if (!TryGetInstance(args, out var s, out var err)) return err!;

        var id = (uint)s!.ID;
        var action = (GetString(args, "action") ?? "").ToLowerInvariant();
        switch (action)
        {
            case "start":
            {
                if (_lifecycle.IsServerRunning(id)) return ToolResult.Ok("实例已在运行中。");
                var (ok, msg) = _lifecycle.StartServer(id, isAutoRestart: false, skipEulaCheck: false);
                return ok ? ToolResult.Ok($"已发出启动指令：{msg}") : ToolResult.Fail($"启动失败：{msg}");
            }
            case "stop":
            {
                var ok = _lifecycle.StopServer(id);
                return ok ? ToolResult.Ok("已发出安全停止指令。") : ToolResult.Fail("停止失败（可能未在运行）。");
            }
            case "kill":
            {
                var ok = _lifecycle.ForceKillServer(id);
                return ok ? ToolResult.Ok("已强制结束实例进程。") : ToolResult.Fail("强制结束失败（可能未在运行）。");
            }
            case "restart":
            {
                var (ok, msg) = _lifecycle.RestartServer(id).GetAwaiter().GetResult();
                return ok ? ToolResult.Ok($"已发出重启指令：{msg}") : ToolResult.Fail($"重启失败：{msg}");
            }
            default:
                return ToolResult.Fail("action 必须是 start / stop / restart / kill 之一。");
        }
    }

    // ---------------- 命令与日志 ----------------

    private ToolResult SendCommand(JsonObject args)
    {
        if (!TryGetInstance(args, out var s, out var err)) return err!;
        var cmd = GetString(args, "command");
        if (string.IsNullOrWhiteSpace(cmd)) return ToolResult.Fail("command 不能为空。");
        var repeat = GetBool(args, "repeat_to_log") ?? true;
        var id = (uint)s!.ID;

        var waitMs = GetInt(args, "wait_ms") ?? 1000;
        if (waitMs < 0) waitMs = 0;
        if (waitMs > 5000) waitMs = 5000;

        // 锚定日志最后一行（宿主缓冲可能环形截断，用行数不稳），发送后再取它之后的新行
        var anchor = _console.GetLogs(id)?.LastOrDefault();

        if (!_console.SendCommand(id, cmd!, repeat))
            return ToolResult.Fail("发送命令失败（实例可能未在运行）。");

        var output = new List<string>();
        if (waitMs > 0)
        {
            // ponytail: 轮询宿主日志缓冲取增量，命令输出没有可订阅事件；真有推送接口再换
            long lastChange = 0;
            var sw = System.Diagnostics.Stopwatch.StartNew();
            while (sw.ElapsedMilliseconds < waitMs)
            {
                Thread.Sleep(100);
                var delta = TailAfter(_console.GetLogs(id)?.ToList() ?? new List<string>(), anchor);
                var changed = delta.Count != output.Count || (delta.Count > 0 && delta[^1] != output[^1]);
                if (changed) { output = delta; lastChange = sw.ElapsedMilliseconds; }
                else if (output.Count > 0 && sw.ElapsedMilliseconds - lastChange >= 250) break; // 输出已稳定，提前返回
            }
        }

        var text = output.Count == 0
            ? $"已发送命令：{cmd}\n（{waitMs} ms 内控制台无新输出；可加大 wait_ms 或改用 get_logs 查看）"
            : $"已发送命令：{cmd}\n---- 控制台输出 ----\n{string.Join("\n", output)}";
        return ToolResult.Ok(text);
    }

    /// <summary>返回快照中「锚点行」之后的所有行；锚点缺失或已滚出缓冲时返回整份快照。</summary>
    private static List<string> TailAfter(List<string> snap, string? anchor)
    {
        if (anchor is null) return snap;
        for (int i = snap.Count - 1; i >= 0; i--)
            if (snap[i] == anchor) return snap.Skip(i + 1).ToList();
        return snap;
    }

    private ToolResult GetLogs(JsonObject args)
    {
        if (!TryGetInstance(args, out var s, out var err)) return err!;
        var lines = GetInt(args, "lines") ?? 200;
        if (lines < 1) lines = 1;
        if (lines > 2000) lines = 2000;
        var logs = _console.GetLogs((uint)s!.ID) ?? new List<string>();
        var tail = logs.Count > lines ? logs.Skip(logs.Count - lines).ToList() : logs;
        return ToolResult.Ok(string.Join("\n", tail));
    }

    // ---------------- 插件自身配置 ----------------

    private ToolResult GetPluginConfig()
    {
        var obj = new JsonObject();
        foreach (var t in ToolRegistry.BuildToolList().Select(n => n!.AsObject()))
        {
            var name = t["name"]!.GetValue<string>();
            obj[name] = McpSettings.IsToolEnabled(name);
        }
        return ToolResult.Ok(obj.ToJsonString(JsonOpts.Pretty));
    }

    private ToolResult SetPluginConfig(JsonObject args)
    {
        var key = GetString(args, "key")?.Trim();
        var value = GetString(args, "value");
        if (string.IsNullOrWhiteSpace(key)) return ToolResult.Fail("key 不能为空。");
        if (!ToolRegistry.Exists(key!)) return ToolResult.Fail($"未知功能：{key}");
        if (!bool.TryParse(value, out var enabled)) return ToolResult.Fail("value 需为 true/false。");

        McpSettings.SetToolEnabled(key!, enabled);
        return ToolResult.Ok($"功能 {key} 已{(enabled ? "开启" : "关闭")}。");
    }

    // ---------------- 沙箱化文件工具 ----------------

    private ToolResult ListFiles(JsonObject args)
    {
        if (!TryGetInstance(args, out var s, out var err)) return err!;
        if (!TryResolvePath(s!, GetString(args, "path"), out var full, out var perr)) return perr!;
        if (!Directory.Exists(full)) return ToolResult.Fail($"目录不存在：{full}");

        var items = new JsonArray();
        foreach (var d in Directory.GetDirectories(full).OrderBy(x => x))
            items.Add(new JsonObject { ["name"] = Path.GetFileName(d), ["type"] = "dir" });
        foreach (var f in Directory.GetFiles(full).OrderBy(x => x))
        {
            var fi = new FileInfo(f);
            items.Add(new JsonObject
            {
                ["name"] = fi.Name,
                ["type"] = "file",
                ["size"] = fi.Length,
                ["modified"] = fi.LastWriteTime.ToString("yyyy-MM-dd HH:mm:ss")
            });
        }
        return ToolResult.Ok(new JsonObject { ["path"] = full, ["items"] = items });
    }

    private ToolResult ReadFile(JsonObject args)
    {
        if (!TryGetInstance(args, out var s, out var err)) return err!;
        if (!TryResolvePath(s!, GetString(args, "path"), out var full, out var perr)) return perr!;
        if (!File.Exists(full)) return ToolResult.Fail($"文件不存在：{full}");

        long max = GetInt(args, "max_bytes") ?? ReadDefault;
        if (max < 1) max = 1;
        if (max > ReadMax) max = ReadMax;

        var fi = new FileInfo(full);
        using var fs = File.OpenRead(full);
        var buf = new byte[Math.Min(max, fi.Length)];
        int read = fs.Read(buf, 0, buf.Length);
        var text = System.Text.Encoding.UTF8.GetString(buf, 0, read);
        var truncated = fi.Length > read;
        return ToolResult.Ok(truncated ? text + $"\n\n[已截断：文件共 {fi.Length} 字节，仅显示前 {read} 字节]" : text);
    }

    private ToolResult EditFile(JsonObject args)
    {
        if (!TryGetInstance(args, out var s, out var err)) return err!;
        if (!TryResolvePath(s!, GetString(args, "path"), out var full, out var perr)) return perr!;
        if (!File.Exists(full)) return ToolResult.Fail($"文件不存在：{full}");

        var fi = new FileInfo(full);
        if (fi.Length > WriteMax) return ToolResult.Fail($"文件过大（{fi.Length} 字节 > {WriteMax}），拒绝编辑。");

        var oldStr = GetString(args, "old_string");
        var newStr = GetString(args, "new_string") ?? "";
        if (string.IsNullOrEmpty(oldStr)) return ToolResult.Fail("old_string 不能为空。");
        var replaceAll = GetBool(args, "replace_all") ?? false;

        var content = File.ReadAllText(full);
        int count = CountOccurrences(content, oldStr!);
        if (count == 0) return ToolResult.Fail("未找到 old_string，未做任何修改。");
        if (count > 1 && !replaceAll)
            return ToolResult.Fail($"old_string 命中 {count} 处，若要全部替换请设置 replace_all=true。");

        var updated = replaceAll
            ? content.Replace(oldStr!, newStr)
            : ReplaceFirst(content, oldStr!, newStr);

        // 先备份并校验备份存在（遵循仓库 AGENTS.md 规则）
        var backup = full + ".bak-" + DateTime.Now.ToString("yyyyMMddHHmmss");
        File.Copy(full, backup, overwrite: false);
        if (!File.Exists(backup)) return ToolResult.Fail("备份创建失败，已中止写入。");

        File.WriteAllText(full, updated);
        return ToolResult.Ok(new JsonObject
        {
            ["file"] = full,
            ["backup"] = backup,
            ["replaced"] = replaceAll ? count : 1,
            ["message"] = "修改成功，已备份原文件。"
        }.ToJsonString(JsonOpts.Pretty));
    }

    // ---------------- helpers ----------------

    private static bool TryGetInstance(JsonObject args, out McServerInfo.ServerInfo? server, out ToolResult? error)
    {
        server = null;
        error = null;
        var idNode = args["instance_id"];
        if (idNode is null) { error = ToolResult.Fail("缺少 instance_id。"); return false; }
        if (!int.TryParse(idNode.ToString(), out var id)) { error = ToolResult.Fail("instance_id 必须是整数。"); return false; }
        var s = SDK.MSLX.Config.Servers.GetServer((uint)id);
        if (s is null) { error = ToolResult.Fail($"找不到实例 {id}。"); return false; }
        server = s;
        return true;
    }

    private static bool TryResolvePath(McServerInfo.ServerInfo s, string? relPath, out string full, out ToolResult? error)
    {
        full = "";
        error = null;
        var root = s.Base;
        if (string.IsNullOrWhiteSpace(root) || !Directory.Exists(root))
        {
            error = ToolResult.Fail($"实例根目录无效：{root}");
            return false;
        }
        var rootFull = Path.GetFullPath(root);
        var rel = string.IsNullOrWhiteSpace(relPath) ? "." : relPath!;
        full = Path.GetFullPath(Path.Combine(rootFull, rel));

        // 防路径穿越：必须落在实例根目录内
        var rootWithSep = rootFull.EndsWith(Path.DirectorySeparatorChar) ? rootFull : rootFull + Path.DirectorySeparatorChar;
        if (!full.Equals(rootFull, StringComparison.OrdinalIgnoreCase) &&
            !full.StartsWith(rootWithSep, StringComparison.OrdinalIgnoreCase))
        {
            error = ToolResult.Fail("路径越界：只允许访问实例根目录内的文件。");
            return false;
        }
        return true;
    }

    private static int CountOccurrences(string haystack, string needle)
    {
        int count = 0, idx = 0;
        while ((idx = haystack.IndexOf(needle, idx, StringComparison.Ordinal)) >= 0) { count++; idx += needle.Length; }
        return count;
    }

    private static string ReplaceFirst(string haystack, string oldStr, string newStr)
    {
        var idx = haystack.IndexOf(oldStr, StringComparison.Ordinal);
        return idx < 0 ? haystack : haystack[..idx] + newStr + haystack[(idx + oldStr.Length)..];
    }

    private static string? GetString(JsonObject o, string key) => o[key]?.GetValue<object>()?.ToString();
    private static bool? GetBool(JsonObject o, string key) { var n = o[key]; return n is null ? null : bool.TryParse(n.ToString(), out var b) ? b : null; }
    private static int? GetInt(JsonObject o, string key) { var n = o[key]; return n is null ? null : int.TryParse(n.ToString(), out var i) ? i : null; }
}
