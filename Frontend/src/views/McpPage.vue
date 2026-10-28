<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { MessagePlugin } from 'tdesign-vue-next';
import { CopyIcon, RefreshIcon, LinkIcon, KeyIcon, ToolsIcon, LockOnIcon } from 'tdesign-icons-vue-next';
import request from 'mslx-request';

type Cfg = {
  apiKey: string;
  mcpUrl: string;
  allowFileWrite: boolean;
  allowHeavyOps: boolean;
  toolCount: number;
};

const loading = ref(true);
const cfg = ref<Cfg | null>(null);
const showKey = ref(false);
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

const regenerate = async () => {
  try {
    const res: any = await request.post({ url: '/api/plugin/mslx-plugin-mcp/regenerate-key' });
    const data = unwrap(res);
    if (cfg.value) cfg.value.apiKey = data.apiKey;
    MessagePlugin.success('API Key 已重置，请同步更新 MCP 客户端');
  } catch (e: any) {
    MessagePlugin.error('重置失败：' + (e?.message || '未知错误'));
  }
};

const saveToggle = async (key: 'allowFileWrite' | 'allowHeavyOps', val: boolean) => {
  if (!cfg.value) return;
  cfg.value[key] = val;
  saving.value = true;
  try {
    const body: any = {};
    body[key] = val;
    await request.post({ url: '/api/plugin/mslx-plugin-mcp/settings', data: body });
    MessagePlugin.success('已保存');
  } catch (e: any) {
    cfg.value[key] = !val; // 回滚
    MessagePlugin.error('保存失败：' + (e?.message || '未知错误'));
  } finally {
    saving.value = false;
  }
};

const maskedKey = () => {
  const k = cfg.value?.apiKey || '';
  if (showKey.value) return k;
  return k.length > 12 ? k.slice(0, 6) + '••••••••' + k.slice(-4) : '••••••••';
};

// 客户端连接示例：统一用 x-api-key（宿主的 API 密钥，长期有效）
const clientSnippet = () => {
  const url = cfg.value?.mcpUrl || '';
  return JSON.stringify(
    {
      mcpServers: {
        mslx: {
          type: 'http',
          url,
          headers: { 'x-api-key': '<面板 → 用户管理 → API 密钥>' }
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
          {{ cfg.toolCount }} 个工具
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
          <label class="text-xs text-[var(--td-text-color-secondary)]">插件自带 Key（可选，兼容旧客户端）</label>
          <div class="flex flex-col sm:flex-row gap-2">
            <t-input :value="maskedKey()" readonly class="flex-grow font-mono" />
            <t-button variant="outline" @click="showKey = !showKey">
              <template #icon><key-icon /></template>
              {{ showKey ? '隐藏' : '显示' }}
            </t-button>
            <t-button variant="outline" @click="copy(cfg.apiKey, '已复制 API Key')">
              <template #icon><copy-icon /></template>
              复制
            </t-button>
            <t-button theme="warning" variant="outline" @click="regenerate">
              <template #icon><refresh-icon /></template>
              重置
            </t-button>
          </div>
          <p class="text-xs text-[var(--td-text-color-placeholder)] m-0">
            一般用不上：端点挂在宿主 /api 下，客户端带上宿主的 <code>x-api-key</code>（面板 → 用户管理 → API 密钥）即可，长期有效。这个 Key 只在需要绕过宿主鉴权直连时才有意义。
          </p>
        </div>
      </section>

      <!-- 安全开关 -->
      <section class="flex flex-col gap-3">
        <div class="flex items-center gap-2 text-sm font-bold text-[var(--td-text-color-primary)]">
          <lock-on-icon class="text-[var(--color-primary)]" />
          安全开关
        </div>
        <div class="rounded-xl border border-[var(--td-component-border)] bg-[var(--td-bg-color-secondarycontainer)] p-4 flex flex-col gap-4">
          <div class="flex items-center justify-between gap-4">
            <div class="flex flex-col">
              <span class="text-sm text-[var(--td-text-color-primary)]">允许文件写入（edit_file）</span>
              <span class="text-xs text-[var(--td-text-color-secondary)] mt-0.5">关闭后仅可读文件，禁止任何写入。写入前会自动备份。</span>
            </div>
            <t-switch :value="cfg.allowFileWrite" :loading="saving" @change="(v:any)=>saveToggle('allowFileWrite', !!v)" />
          </div>
          <div class="h-px bg-[var(--td-component-border)]"></div>
          <div class="flex items-center justify-between gap-4">
            <div class="flex flex-col">
              <span class="text-sm text-[var(--td-text-color-primary)]">允许启停 / 结束实例（instance_power）</span>
              <span class="text-xs text-[var(--td-text-color-secondary)] mt-0.5">关闭后 AI 无法启动、停止、重启或强杀服务器。</span>
            </div>
            <t-switch :value="cfg.allowHeavyOps" :loading="saving" @change="(v:any)=>saveToggle('allowHeavyOps', !!v)" />
          </div>
        </div>
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
