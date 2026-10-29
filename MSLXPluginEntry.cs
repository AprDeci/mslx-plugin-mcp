using Microsoft.AspNetCore.Mvc.ApplicationParts;
using MSLX.Plugin.Mcp.Mcp;
using MSLX.SDK;
using MSLX.SDK.Interfaces;
using MSLX.SDK.Models.Plugins;

[assembly: ApplicationPart("MSLX.Plugin.Mcp")]

namespace MSLX.Plugin.Mcp;

public class MSLXPluginEntry : IPlugin
{
    public static MSLXPluginEntry Instance { get; private set; } = null!;

    public string Id => "mslx-plugin-mcp";
    public string Name => "MCP 控制台";
    public string Description => "通过 MCP 协议为 AI 客户端提供 MC 服务器命令输入、实例控制、配置与文件读写能力";
    public string Version => "1.2.0";
    public string Icon => "icon.png";
    public string MinSDKVersion => "1.7.6";
    public string Developer => "aprdec";
    public string AuthorUrl => "https://github.com/AprDeci";
    public string PluginUrl => "https://github.com/AprDeci/mslx-plugin-mcp";

    // 仅主节点运行（后台管理仍会同步到子节点），避免多节点命令路由歧义。
    public PluginMultiNodeSupport SupportsMultiNode => PluginMultiNodeSupport.Unsupported;

    public void OnPluginInitialize(IServiceProvider serviceProvider)
    {
        Instance = this;
        SDK.MSLX.Logger.Info("[MCP] 插件开始初始化...");
        var dataDir = this.Config().GetDataPath();
        if (!Directory.Exists(dataDir)) Directory.CreateDirectory(dataDir);
    }

    public void OnLoad()
    {
        Instance = this;
        SDK.MSLX.Logger.Info("[MCP] 载入成功。MCP 端点: " + McpEndpoint.Route);
        SDK.MSLX.Logger.Info($"[MCP] 已就绪，可用工具 {ToolRegistry.BuildToolList().Count} 个。");
    }

    public void OnUnload()
    {
        SDK.MSLX.Logger.Info("[MCP] 卸载成功~");
    }

    public void OnRegisterServices(IServiceCollection services)
    {
        services.AddSingleton<McpTools>();
    }

    public void OnRegisterEndpoints(IEndpointRouteBuilder endpoints)
    {
        endpoints.MapPost(McpEndpoint.Route, ctx => McpEndpoint.HandleAsync(ctx));
        endpoints.MapGet(McpEndpoint.Route, ctx => McpEndpoint.HandleAsync(ctx));
    }
}
