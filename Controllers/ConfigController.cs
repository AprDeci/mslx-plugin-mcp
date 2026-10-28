using Microsoft.AspNetCore.Mvc;
using MSLX.Plugin.Mcp.Mcp;

namespace MSLX.Plugin.Mcp.Controllers;

[ApiController]
[Route("api/plugin/mslx-plugin-mcp")]
public class ConfigController : ControllerBase
{
    /// <summary>前端配置页读取：API Key、MCP 地址、开关与工具数量。</summary>
    [HttpGet("config")]
    public IActionResult GetConfig()
    {
        var key = McpSettings.GetOrCreateApiKey();
        var baseUrl = $"{Request.Scheme}://{Request.Host}";
        return Ok(new
        {
            code = 200,
            data = new
            {
                apiKey = key,
                mcpUrl = baseUrl + McpEndpoint.Route,
                allowFileWrite = McpSettings.AllowFileWrite,
                allowHeavyOps = McpSettings.AllowHeavyOps,
                toolCount = ToolRegistry.BuildToolList().Count
            }
        });
    }

    /// <summary>重置 API Key。</summary>
    [HttpPost("regenerate-key")]
    public IActionResult RegenerateKey()
    {
        var key = McpSettings.RegenerateApiKey();
        return Ok(new { code = 200, data = new { apiKey = key } });
    }

    /// <summary>修改开关：allowFileWrite / allowHeavyOps。</summary>
    [HttpPost("settings")]
    public IActionResult UpdateSettings([FromBody] UpdateSettingsDto dto)
    {
        if (dto.AllowFileWrite is not null) McpSettings.AllowFileWrite = dto.AllowFileWrite.Value;
        if (dto.AllowHeavyOps is not null) McpSettings.AllowHeavyOps = dto.AllowHeavyOps.Value;
        return Ok(new
        {
            code = 200,
            data = new
            {
                allowFileWrite = McpSettings.AllowFileWrite,
                allowHeavyOps = McpSettings.AllowHeavyOps
            }
        });
    }

    public class UpdateSettingsDto
    {
        public bool? AllowFileWrite { get; set; }
        public bool? AllowHeavyOps { get; set; }
    }
}
