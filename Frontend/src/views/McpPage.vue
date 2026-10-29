<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { MessagePlugin } from 'tdesign-vue-next';
import { CopyIcon, RefreshIcon, LinkIcon, LockOnIcon, ToolsIcon } from 'tdesign-icons-vue-next';
import request from 'mslx-request';

type ToolItem = { name: string; description: string; enabled: boolean };
type Cfg = {
  mcpUrl: string;
  toolCount: number;
  tools: ToolItem[];
};

const loading = ref(true);
const cfg = ref<Cfg | null>(null);
const saving = ref(false);

// 宿主拦截器在 code===200 时会自动解包出 data；但不同版本行为不一致，这里两种都兼容。
const unwrap = (res: any) => (res && typeof res === 'object' && 'data' in res && res.data != null ? res.data : res);

const load = async () => {
  loading.value = true;
  try {
    const res: any = await request.get({ url: '/api/plugin/mslx-plugin-mcp/config' });
    cfg.value = unwrap(res);
  } catch (e: any) {
    MessagePlugin.error('读取插件配置失败：' + (e?.message || '未知错误'));
  } finally {
    loading.value = false;
  }
};

const copy = async (text: string, tip = '已复制') => {
  try {
    await navigator.clipboard.writeText(text);
    MessagePlugin.success(tip);
  } catch {
    MessagePlugin.warning('复制失败，请手动选择复制');
  }
};

const toggle = async (tool: ToolItem, val: boolean) => {
  const prev = tool.enabled;
  tool.enabled = val;
  saving.value = true;
  try {
    await request.post({
      url: '/api/plugin/mslx-plugin-mcp/settings',
      data: { tool: tool.name, enabled: val }
    });
  } catch (e: any) {
    tool.enabled = prev; // 回滚
    MessagePlugin.error('保存失败：' + (e?.message || '未知错误'));
  } finally {
    saving.value = false;
  }
};

// 客户端连接示例：x-api-key 必须使用宿主管理员的 API 密钥
const clientSnippet = () => {
  const url = cfg.value?.mcpUrl || '';
  return JSON.stringify(
    {
      mcpServers: {
        mslx: {
          type: 'http',
          url,
          headers: { 'x-api-key': '<configs/userlist.json 里管理员的 ApiKey>' }
        }
      }
    },
    null,
    2
  );
};

onMounted(load);
</script>

<template>
  <div class="design-card relative flex flex-col rounded-2xl border border-[var(--td-component-border)] shadow-sm p-5 sm:p-6">
    <!-- 头部 -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[var(--td-component-border)]">
      <div class="flex items-center gap-3">
        <div class="w-1.5 h-5 bg-[var(--color-primary)] rounded-full shadow-[0_0_8px_var(--color-primary-light)] opacity-90"></div>
        <div class="flex flex-col">
          <h2 class="text-lg font-bold m-0 text-[var(--td-text-color-primary)]">MCP 控制台</h2>
          <span class="text-xs text-[var(--td-text-color-secondary)] mt-0.5">为 AI 客户端提供实例命令、控制、配置与文件读写能力</span>
        </div>
      </div>
      <div class="flex items-center gap-2">
        <t-tag v-if="cfg" theme="success" variant="light-outline" shape="round" size="small">
          {{ cfg.toolCount }} 个功能
        </t-tag>
        <t-button size="small" variant="outline" :loading="loading" @click="load">
          <template #icon><refresh-icon /></template>
          刷新
        </t-button>
      </div>
    </div>

    <div v-if="loading && !cfg" class="flex justify-center py-12">
      <t-loading size="28px" text="加载中..." />
    </div>

    <div v-else-if="cfg" class="flex flex-col gap-5 pt-5">
      <!-- 连接信息 -->
      <section class="flex flex-col gap-3">
        <div class="flex items-center gap-2 text-sm font-bold text-[var(--td-text-color-primary)]">
          <link-icon class="text-[var(--color-primary)]" />
          连接信息
        </div>

        <div class="flex flex-col gap-2">
          <label class="text-xs text-[var(--td-text-color-secondary)]">MCP 端点地址（Streamable HTTP）</label>
          <div class="flex flex-col sm:flex-row gap-2">
            <t-input :value="cfg.mcpUrl" readonly class="flex-grow" />
            <t-button variant="outline" @click="copy(cfg.mcpUrl, '已复制端点地址')">
              <template #icon><copy-icon /></template>
              复制
            </t-button>
          </div>
          <p class="text-xs text-[var(--td-text-color-placeholder)] m-0">
            自动生成，无需手填：就是当前面板地址 + 固定路径 <code>/api/plugin/mslx-plugin-mcp/mcp</code>（只读，复制给 AI 客户端即可）。
          </p>
        </div>

        <div class="flex flex-col gap-2">
          <label class="text-xs text-[var(--td-text-color-secondary)]">鉴权：宿主管理员 API 密钥（请求头 <code>x-api-key</code>）</label>
          <div class="flex flex-col sm:flex-row gap-2">
            <t-input value="configs/userlist.json → 管理员用户的 ApiKey 字段" readonly class="flex-grow font-mono" />
          </div>
          <p class="text-xs text-[var(--td-text-color-placeholder)] m-0">
            本插件仅限管理员使用，普通用户密钥会返回 403。面板里暂时看不到密钥：可在服务器的 <code>configs/userlist.json</code> 中查找管理员用户的 <code>ApiKey</code> 值，仅交给可信客户端使用。
          </p>
        </div>
      </section>

      <!-- 功能开关 -->
      <section class="flex flex-col gap-3">
        <div class="flex items-center gap-2 text-sm font-bold text-[var(--td-text-color-primary)]">
          <lock-on-icon class="text-[var(--color-primary)]" />
          功能开关
        </div>
        <div class="rounded-xl border border-[var(--td-component-border)] bg-[var(--td-bg-color-secondarycontainer)] p-4 flex flex-col">
          <div v-for="(t, i) in cfg.tools" :key="t.name" class="flex flex-col">
            <div v-if="i > 0" class="h-px bg-[var(--td-component-border)] my-3"></div>
            <div class="flex items-center justify-between gap-4">
              <div class="flex flex-col min-w-0">
                <span class="text-sm font-mono text-[var(--td-text-color-primary)]">{{ t.name }}</span>
                <span class="text-xs text-[var(--td-text-color-secondary)] mt-0.5">{{ t.description }}</span>
              </div>
              <t-switch :value="t.enabled" :loading="saving" @change="(v:any)=>toggle(t, !!v)" />
            </div>
          </div>
        </div>
        <p class="text-xs text-[var(--td-text-color-placeholder)] m-0">
          关闭的功能 AI 调用时会直接报错；全部关闭后 AI 仍然能看到工具列表但无法执行。默认全开。
        </p>
      </section>

      <!-- 客户端配置示例 -->
      <section class="flex flex-col gap-3">
        <div class="flex items-center justify-between gap-2">
          <div class="flex items-center gap-2 text-sm font-bold text-[var(--td-text-color-primary)]">
            <tools-icon class="text-[var(--color-primary)]" />
            客户端配置示例
          </div>
          <t-button size="small" variant="text" @click="copy(clientSnippet(), '已复制配置 JSON')">
            <template #icon><copy-icon /></template>
            复制 JSON
          </t-button>
        </div>
        <div class="overflow-x-auto rounded-xl border border-[var(--td-component-border)] bg-[#1e1e1e]">
          <pre class="m-0 p-4 text-[13px] leading-relaxed font-mono text-[#d4d4d4]"><code>{{ clientSnippet() }}</code></pre>
        </div>
        <p class="text-xs text-[var(--td-text-color-secondary)] m-0 leading-relaxed">
          支持纯 JSON 响应模式（Streamable HTTP）。若客户端只支持 SSE，请改用支持 HTTP 的 MCP 客户端（如 Claude Desktop、Cursor、Cherry Studio 等）。
        </p>
      </section>
    </div>
  </div>
</template>

<style scoped>
@unocss;
</style>
