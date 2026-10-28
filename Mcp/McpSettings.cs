using System.Security.Cryptography;
using MSLX.SDK;
using MSLX.SDK.Interfaces;
using Newtonsoft.Json.Linq;

namespace MSLX.Plugin.Mcp.Mcp;

/// <summary>
/// 插件自身配置（key 级读写，落在插件 GetDataPath() 下的配置文件里）。
/// 通过 MSLX.SDK 的 IPluginConfigBridge 访问，不手写文件路径。
/// </summary>
public sealed class McpSettings
{
    private const string KApiKey = "apiKey";
    private const string KAllowFileWrite = "allowFileWrite";
    private const string KAllowHeavyOps = "allowHeavyOps";

    private static IPluginConfigBridge Cfg => MSLXPluginEntry.Instance.Config();

    /// <summary>获取（必要时生成）MCP 访问用的 API Key。</summary>
    public static string GetOrCreateApiKey()
    {
        var token = Cfg.ReadConfigKey(KApiKey) as JValue;
        var val = token?.Value?.ToString();
        if (!string.IsNullOrWhiteSpace(val)) return val!;

        val = "mcp_" + Convert.ToHexString(RandomNumberGenerator.GetBytes(24)).ToLowerInvariant();
        Cfg.WriteConfigKey(KApiKey, val);
        return val;
    }

    public static string RegenerateApiKey()
    {
        var val = "mcp_" + Convert.ToHexString(RandomNumberGenerator.GetBytes(24)).ToLowerInvariant();
        Cfg.WriteConfigKey(KApiKey, val);
        return val;
    }

    public static bool AllowFileWrite
    {
        get => (bool?)Cfg.ReadConfigKey(KAllowFileWrite) ?? true;
        set => Cfg.WriteConfigKey(KAllowFileWrite, value);
    }

    /// <summary>是否允许 start/stop/restart/kill 等改变服务器运行状态的操作。</summary>
    public static bool AllowHeavyOps
    {
        get => (bool?)Cfg.ReadConfigKey(KAllowHeavyOps) ?? true;
        set => Cfg.WriteConfigKey(KAllowHeavyOps, value);
    }
}
