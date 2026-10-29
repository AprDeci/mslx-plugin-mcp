# MSLX.Plugin.Mcp — MCP 控制台插件

为 MSLX 开服器提供 **MCP（Model Context Protocol）** 服务端能力，让 AI 客户端（Claude Desktop / Cursor / Cherry Studio 等）可以直接：

- 查看 / 控制 Minecraft 实例（启停重启、强杀）
- 向服务器控制台**发送命令**、读取实时日志
- 读取 / 修改实例内的文本配置文件（如 `server.properties`）
- 读取 / 修改本插件自身配置

## 注意事项

- 插件整体仅限 **admin 管理员**访问（页面、配置 API 与 MCP 端点）；MCP 客户端必须使用管理员的宿主 API 密钥。未认证请求返回 **401**，已认证的普通用户返回 **403**，不会执行工具或批量请求。
- MCP 端点为**鉴权后的 POST**；宿主若置于反向代理之后，请确认代理允许 POST 与较大请求体。
- 暂不支持多节点


