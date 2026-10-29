import McpPage from './views/McpPage.vue';
import './style.css';

export const pluginConfig = {
    name: 'MSLX.Plugin.Mcp',
    version: '1.1.0',

    // 注入一级菜单 + 单页
    routes: [
        {
            path: '/plugin-mcp',
            name: 'MslxMcpBase',
            component: 'HOST_LAYOUT',
            meta: { title: 'MCP 控制台', icon: 'api', roleCode: ['admin'] },
            children: [
                {
                    path: '',
                    name: 'MslxMcpPage',
                    component: McpPage,
                    meta: { title: 'MCP 控制台', hidden: true, roleCode: ['admin'] },
                },
            ],
        },
    ],
};
