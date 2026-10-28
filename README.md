# MSLX.Plugin.Mcp — MCP 控制台插件

为 MSLX 开服器提供 **MCP（Model Context Protocol）** 服务端能力，让 AI 客户端（Claude Desktop / Cursor / Cherry Studio 等）可以直接：

- 查看 / 控制 Minecraft 实例（启停重启、强杀）
- 向服务器控制台**发送命令**、读取实时日志
- 读取 / 修改实例内的文本配置文件（如 `server.properties`）
- 读取 / 修改本插件自身配置

## 技术要点

- **进程内 ASP.NET Core 插件**（.NET 10 + MSLX.SDK 1.7.6），在 `OnRegisterEndpoints` 挂载 MCP JSON-RPC 端点。
- **传输**：Streamable HTTP 的「纯 JSON 响应」模式（POST JSON-RPC，返回 `application/json`）。不使用 SSE（GET 返回 405），对各类客户端最稳。
- **鉴权**：复用宿主鉴权——客户端带 `x-api-key`（面板 → 用户管理 → API 密钥，长期有效）即可；插件自带的 `mcp_xxx` Key 仅作直连兜底。
- **多节点**：声明 `SupportsMultiNode = Unsupported`，仅主节点运行，避免子节点命令路由歧义。

## MCP 端点

```
POST /api/plugin/mslx-plugin-mcp/mcp
Header: x-api-key: <面板 API 密钥>   （旧客户端也可用 Authorization: Bearer mcp_xxx）
Content-Type: application/json
```

插件自带 Key 在首次加载时自动生成，可在插件前端页面「MCP 控制台」查看 / 重置。

## 工具清单（10 个）

| 工具 | 说明 |
|---|---|
| `list_instances` | 列出所有实例及运行状态、在线人数 |
| `get_instance_info` | 单实例详情（状态、玩家、运行时长、目录等） |
| `instance_power` | `action`: start / stop / restart / kill |
| `send_command` | 向控制台发送命令 |
| `get_logs` | 读取控制台日志尾部 N 行 |
| `get_plugin_config` | 读取本插件配置（apiKey 脱敏） |
| `set_plugin_config` | 修改 apiKey / allowFileWrite / allowHeavyOps |
| `list_files` | 列出实例目录内文件 |
| `read_file` | 读取实例内文本文件 |
| `edit_file` | 局部字符串替换（自动备份，防写坏） |

## 安全设计

- 文件工具沙箱：所有路径解析后必须落在实例根目录 `ServerInfo.Base` 内，`Path.GetFullPath` + 前缀校验防 `../../` 穿越。
- `edit_file` 写入前自动 `File.Copy` 生成 `.bak-时间戳` 备份并校验存在。
- 两个远程开关（前端可切换）：
  - `allowFileWrite`：关闭后禁止文件写入。
  - `allowHeavyOps`：关闭后禁止 start/stop/restart/kill。
- 文件读写大小上限：读默认 256KB / 最大 1MB，编辑仅限 ≤1MB 文件。

## 构建与打包

```bash
# 后端（Release 会自动 ILRepack 合并为单 DLL 并嵌入前端 dist）
dotnet build -c Release
# 产物：bin/Release/net10.0/MSLX.Plugin.Mcp.dll

# 前端
cd Frontend
pnpm install
pnpm build   # 产物 Frontend/dist/mslx-plugin-entry.js
```

> 注意：本机需将 `DOTNET_CLI_HOME` 指向可写目录（沙箱环境），例如
> `$env:DOTNET_CLI_HOME="D:\games\mc\server-dsh\.dotnet"`。

## 目录结构

```
MSLX.Plugin.Mcp/
├─ MSLXPluginEntry.cs                # 插件入口：注册 DI 服务 + MCP 端点
├─ Controllers/ConfigController.cs   # 前端用的配置读写接口
├─ Mcp/
│  ├─ McpEndpoint.cs                 # Streamable HTTP / JSON-RPC 处理 + 鉴权
│  ├─ JsonRpcModels.cs               # JSON-RPC 数据模型
│  ├─ ToolRegistry.cs                # 工具清单 + Schema + dispatch
│  ├─ McpTools.cs                    # 工具实现（实例/命令/配置/文件）
│  └─ McpSettings.cs                 # 插件自身配置（API Key / 开关）
└─ Frontend/                         # Vue3 + TDesign + UnoCSS 配置页
```

## 客户端配置示例

```json
{
  "mcpServers": {
    "mslx": {
      "type": "http",
      "url": "http://<mslx-host>:<port>/api/plugin/mslx-plugin-mcp/mcp",
      "headers": { "x-api-key": "<面板 → 用户管理 → API 密钥>" }
    }
  }
}
```

## 已知限制 / 待现场验证

- MCP 端点为**鉴权后的 POST**；宿主若置于反向代理之后，请确认代理允许 POST 与较大请求体。
- 子节点（多节点）环境下此插件仅主节点生效；如需跨节点操作，需后续按 `MSLX_NodeContext` / 节点转发机制扩展。
