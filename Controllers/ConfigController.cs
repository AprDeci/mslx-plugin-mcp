using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MSLX.Plugin.Mcp.Mcp;

namespace MSLX.Plugin.Mcp.Controllers;

[ApiController]
[Authorize(Roles = "admin")]
[Route("api/plugin/mslx-plugin-mcp")]
public class ConfigController : ControllerBase
{
    /// <summary>前端配置页读取：MCP 地址与各功能开关状态。</summary>
    [HttpGet("config")]
    public IActionResult GetConfig()
    {
        var tools = ToolRegistry.BuildToolList()
            .Select(n => n!.AsObject())
            .Select(t =>
            {
                var name = t["name"]!.GetValue<string>();
                return new
                {
                    name,
                    description = t["description"]!.GetValue<string>(),
                    enabled = McpSettings.IsToolEnabled(name)
                };
            })
            .ToList();

        return Ok(new
        {
            code = 200,
            data = new
            {
                mcpUrl = $"{Request.Scheme}://{Request.Host}" + McpEndpoint.Route,
                toolCount = tools.Count,
                tools
            }
        });
    }

    /// <summary>切换单个功能开关。</summary>
    [HttpPost("settings")]
    public IActionResult UpdateSettings([FromBody] UpdateSettingsDto dto)
    {
        if (string.IsNullOrWhiteSpace(dto.Tool))
            return BadRequest(new { code = 400, message = "tool 不能为空" });

        McpSettings.SetToolEnabled(dto.Tool!, dto.Enabled);
        return Ok(new
        {
            code = 200,
            data = new { tool = dto.Tool, enabled = McpSettings.IsToolEnabled(dto.Tool!) }
        });
    }

    public class UpdateSettingsDto
    {
        public string? Tool { get; set; }
        public bool Enabled { get; set; }
    }
}
