using MSLX.SDK;
using MSLX.SDK.Interfaces;

namespace MSLX.Plugin.Mcp.Mcp;

/// <summary>
/// 插件配置：每个工具一个独立开关（配置键 <c>tool.&lt;工具名&gt;</c>，默认全开）。
/// 通过 MSLX.SDK 的 IPluginConfigBridge 访问，不手写文件路径。
/// </summary>
public sealed class McpSettings
{
    private const string Prefix = "tool.";

    private static IPluginConfigBridge Cfg => MSLXPluginEntry.Instance.Config();

    public static bool IsToolEnabled(string tool) => ReadBool(Prefix + tool, true);

    public static void SetToolEnabled(string tool, bool enabled) => Cfg.WriteConfigKey(Prefix + tool, enabled);

    private static bool ReadBool(string key, bool fallback)
    {
        var v = Cfg.ReadConfigKey(key);
        return v is null ? fallback : bool.TryParse(v.ToString(), out var b) ? b : fallback;
    }
}
