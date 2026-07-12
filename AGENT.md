# AGENT.md - Vivian-VitePress 主题开发文档

## 项目基础信息

**项目名称**：Vivian-VitePress
**项目类型**：VitePress 主题
**设计风格**：液态玻璃（Liquid Glass）
**灵感来源**：《绝区零》薇薇安
**技术栈**：VitePress + Vue 3 + Tailwind CSS + Twikoo

### 项目结构

```
Vivian/
├── .vitepress/
│   ├── config.mts              # VitePress 配置
│   └── theme/
│       ├── index.ts            # 主题入口
│       ├── Layout.vue          # 布局组件
│       ├── Twikoo.vue          # 评论组件
│       ├── components/
│       │   ├── ThemeSwitch.vue         # 深浅色切换
│       │   ├── VPSwitchAppearance.vue  # 三态切换
│       │   └── WLink/
│       │       ├── index.vue           # 友链页面
│       │       └── LinkSite.vue        # 友链卡片
│       ├── style/
│       │   └── tailwind.css    # 液态玻璃样式
│       └── type/
│           └── WLink.ts        # 类型定义
├── guide/                      # 示例文档
├── index.md                    # 首页
├── package.json
└── README.md
```

## 环境搭建

### 系统要求

- Node.js >= 18.0.0
- pnpm >= 8.0.0

### 安装步骤

```bash
# 克隆项目
git clone https://github.com/Slepwerks/Vivian.git
cd Vivian

# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 构建生产版本
pnpm build

# 预览构建结果
pnpm preview
```

### 开发工具推荐

- **编辑器**：VS Code / WebStorm
- **浏览器**：Chrome / Firefox（开发者工具）
- **版本控制**：Git

## 测试规范

### 功能测试

#### 1. 深浅色模式测试

- [ ] 默认跟随系统主题
- [ ] 手动切换浅色模式
- [ ] 手动切换深色模式
- [ ] 切换后刷新页面保持状态
- [ ] 移动端下拉菜单中的切换按钮

#### 2. 响应式布局测试

- [ ] 移动端（< 768px）：悬浮菜单栏
- [ ] 平板端（768px - 960px）：适配布局
- [ ] PC 端（>= 960px）：悬浮导航和侧边栏

#### 3. 液态玻璃效果测试

- [ ] 菜单栏半透明背景
- [ ] 侧边栏模糊效果
- [ ] 搜索框和弹窗样式
- [ ] 自定义块（tip/warning/danger）样式
- [ ] 上一页/下一页按钮样式

#### 4. 评论系统测试

- [ ] doc 布局页面显示评论
- [ ] home 子页面显示评论
- [ ] 首页不显示评论
- [ ] 评论提交功能
- [ ] 移动端评论显示
- [ ] 评论系统开关配置

#### 5. 搜索功能测试

- [ ] 搜索按钮显示
- [ ] 搜索弹窗打开/关闭
- [ ] 搜索结果高亮
- [ ] 键盘快捷键（Ctrl+K）

### 兼容性测试

- [ ] Chrome >= 90
- [ ] Firefox >= 90
- [ ] Safari >= 14
- [ ] Edge >= 90
- [ ] 移动端浏览器

### 性能测试

- [ ] 首屏加载时间 < 3s
- [ ] 模糊效果不影响滚动性能
- [ ] 动画流畅度（60fps）

## 代码规范

### Vue 组件规范

```vue
<script setup lang="ts">
// 1. 导入语句
import { ref, computed } from 'vue'
import { useData } from 'vitepress'

// 2. 类型定义
interface Props {
  title: string
  description?: string
}

// 3. Props 和 Emits
const props = withDefaults(defineProps<Props>(), {
  description: ''
})

const emit = defineEmits<{
  (e: 'update', value: string): void
}>()

// 4. 响应式数据
const count = ref(0)

// 5. 计算属性
const doubleCount = computed(() => count.value * 2)

// 6. 方法
function increment() {
  count.value++
  emit('update', String(count.value))
}

// 7. 生命周期
onMounted(() => {
  console.log('Component mounted')
})
</script>

<template>
  <div class="component">
    <slot />
  </div>
</template>

<style scoped>
.component {
  /* 样式 */
}
</style>
```

### CSS 规范

```css
/* 1. 使用 CSS 变量 */
:root {
  --main-color: #6a4c93;
}

/* 2. 液态玻璃样式模式 */
.glass-element {
  background-color: color-mix(in srgb, var(--vp-c-bg) 50%, transparent);
  -webkit-backdrop-filter: blur(20px) saturate(200%);
  backdrop-filter: blur(20px) saturate(200%);
  border: 1px solid color-mix(in srgb, var(--vp-c-border) 50%, transparent);
  border-radius: 12px;
  box-shadow: 0 2px 8px color-mix(in srgb, var(--main-color) 15%, transparent);
}

/* 3. 响应式断点 */
@media (min-width: 768px) { /* tablet */ }
@media (min-width: 960px) { /* desktop */ }
@media (min-width: 1280px) { /* large desktop */ }

/* 4. 深色模式适配 */
.dark .element {
  background-color: color-mix(in srgb, var(--vp-c-bg) 55%, transparent);
}
```

### 命名规范

- **组件文件**：PascalCase（如 `VPSwitchAppearance.vue`）
- **CSS 类名**：kebab-case（如 `twikoo-home-container`）
- **CSS 变量**：kebab-case（如 `--main-color`）
- **TypeScript 接口**：PascalCase（如 `LinkList`）

### 注释规范

```vue
<!-- 组件功能说明 -->
<template>
  <!-- 主要内容区域 -->
  <div class="container">
    <!-- 标题插槽 -->
    <slot name="title" />
  </div>
</template>
```

```css
/* ========== 模块名称 ========== */
.module {
  /* 属性说明 */
  property: value;
}
```

## 配置说明

### 站点图标

在 `.vitepress/config.mts` 中配置：

```typescript
export default defineConfig({
  themeConfig: {
    vivianLogo: {
      src: '/imgs/icons.webp', // 图标路径（支持 SVG、ICO、图片）
      alt: 'Vivian', // 图标描述
      width: 24, // 图标宽度
      height: 24, // 图标高度
      emoji: '🎨', // Emoji 图标（优先级高于 src）
    }
  }
})
```

**支持格式：**
- SVG：`/imgs/logo.svg`
- ICO：`/favicon.ico`
- 图片：`/imgs/logo.png`、`/imgs/logo.webp` 等
- Emoji：`🎨`、`🌙`、`💬` 等

**禁用图标：**
```typescript
vivianLogo: {
  src: '', // 不设置 src
  emoji: '' // 不设置 emoji
}
```

**使用 Emoji 作为图标：**
```typescript
vivianLogo: {
  emoji: '🎨', // 直接使用 Emoji
  alt: 'Vivian'
}
```

**配置选项：**

| 选项 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `src` | `string` | - | 图标路径 |
| `alt` | `string` | `'Logo'` | 图标描述 |
| `width` | `number` | `24` | 图标宽度 |
| `height` | `number` | `24` | 图标高度 |
| `emoji` | `string` | - | Emoji 图标（优先级高于 src） |

### Twikoo 评论系统

在 `.vitepress/config.mts` 中配置：

```typescript
export default defineConfig({
  themeConfig: {
    twikoo: {
      enabled: true, // 是否启用评论系统
      envId: 'https://your-twikoo-url.vercel.app', // Twikoo 环境 ID
      // 可选配置
      // region: 'ap-shanghai',
      // path: 'window.location.pathname',
      // lang: 'zh-CN',
    }
  }
})
```

**配置选项：**

| 选项 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `enabled` | `boolean` | `true` | 是否启用评论系统 |
| `envId` | `string` | - | Twikoo 环境 ID（必填） |
| `region` | `string` | - | 腾讯云区域 |
| `path` | `string` | - | 自定义路径 |
| `lang` | `string` | `'zh-CN'` | 语言设置 |

**禁用评论系统：**

```typescript
twikoo: {
  enabled: false
}
```

## 安全规范

### XSS 防护

```vue
<!-- 错误：直接插入 HTML -->
<div v-html="userInput"></div>

<!-- 正确：使用文本插值 -->
<div>{{ userInput }}</div>

<!-- 正确：对可信内容进行净化 -->
<div v-html="sanitize(userInput)"></div>
```

### CSS 注入防护

```css
/* 错误：使用用户输入作为 CSS 值 */
.element {
  background: var(--user-color);
}

/* 正确：限制颜色值范围 */
.element {
  background: color-mix(in srgb, var(--safe-color) 50%, transparent);
}
```

### 依赖安全

```bash
# 定期检查依赖漏洞
pnpm audit

# 更新依赖
pnpm update

# 使用锁文件
pnpm install --frozen-lockfile
```

### 敏感信息保护

- **禁止**：在代码中硬编码 API 密钥、密码等敏感信息
- **推荐**：使用环境变量或配置文件管理敏感信息
- **推荐**：将 `.env` 文件添加到 `.gitignore`

### 内容安全策略（CSP）

```typescript
// config.mts
export default defineConfig({
  head: [
    ['meta', { 'http-equiv': 'Content-Security-Policy', content: "default-src 'self'; script-src 'self' 'unsafe-inline'" }]
  ]
})
```

## 提交规范

### Commit Message 格式

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Type 类型

| 类型 | 说明 | 示例 |
|------|------|------|
| `feat` | 新功能 | `feat: 添加液态玻璃效果` |
| `fix` | 修复 bug | `fix: 修复深色模式切换问题` |
| `docs` | 文档更新 | `docs: 更新 README 文档` |
| `style` | 代码格式（不影响功能） | `style: 格式化 CSS 代码` |
| `refactor` | 重构（非新功能非修复） | `refactor: 重构搜索组件` |
| `perf` | 性能优化 | `perf: 优化模糊效果性能` |
| `test` | 测试相关 | `test: 添加深浅色切换测试` |
| `chore` | 构建/工具相关 | `chore: 更新依赖版本` |
| `ci` | CI/CD 相关 | `ci: 添加 GitHub Actions` |
| `revert` | 回滚 | `revert: 回滚到上一版本` |

### Scope 范围

- `theme` - 主题相关
- `layout` - 布局相关
- `style` - 样式相关
- `component` - 组件相关
- `config` - 配置相关
- `doc` - 文档相关

### 示例

```bash
# 新功能
git commit -m "feat(theme): 添加三态深浅色切换功能"

# 修复 bug
git commit -m "fix(layout): 修复移动端菜单栏显示问题"

# 样式调整
git commit -m "style(glass): 调整液态玻璃透明度"

# 文档更新
git commit -m "docs: 添加 AGENT.md 开发文档"

# 重构
git commit -m "refactor(component): 重构 VPSwitchAppearance 组件"

# 性能优化
git commit -m "perf(style): 优化 backdrop-filter 性能"
```

### 分支规范

- `main` - 主分支，稳定版本
- `develop` - 开发分支
- `feature/*` - 功能分支（如 `feature/liquid-glass`）
- `fix/*` - 修复分支（如 `fix/mobile-navbar`）
- `release/*` - 发布分支

### Pull Request 规范

1. **标题**：简洁明了，概括变更内容
2. **描述**：详细说明变更原因、实现方式、测试情况
3. **关联 Issue**：使用 `Closes #123` 格式
4. **截图**：UI 变更需提供截图
5. **测试**：说明已进行的测试

## 感谢

感谢 Mimo V2.5 Pro 在整个 Vivian-VitePress 主题开发过程中的卓越贡献！

### 核心贡献

- **液态玻璃设计系统**：完整实现了半透明背景 + 模糊效果的现代 UI 设计
- **三态深浅色切换**：支持浅色/深色/跟随系统三种模式
- **响应式布局**：移动端和 PC 端的悬浮导航栏和侧边栏
- **评论系统集成**：Twikoo 评论系统的完美适配
- **搜索框优化**：液态玻璃风格的搜索框和弹窗
- **页面切换动画**：淡入上滑的流畅过渡效果
- **自定义组件开发**：VPSwitchAppearance、WLink 等组件

### 技术亮点

- CSS `color-mix()` 和 `backdrop-filter` 的创新应用
- VitePress 插槽系统的深度利用
- Vue 3 Composition API 的灵活运用
- 响应式设计的精细化处理

### 设计理念

- 现代感与可读性的平衡
- 深色/浅色模式的优雅适配
- 移动端体验的优先考虑
- 细节之处见真章

---

*此文档由 Vivian-VitePress 主题自动生成*
*最后更新：2026年7月12日*
