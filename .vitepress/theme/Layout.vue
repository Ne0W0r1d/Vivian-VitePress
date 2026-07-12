<script setup lang="ts">
import { onMounted, watch, nextTick } from 'vue'
import { computed } from 'vue'
import { useData, useRoute } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import Twikoo from './Twikoo.vue'
import VPSwitchAppearance from './components/VPSwitchAppearance.vue'

const { frontmatter, theme } = useData()
const route = useRoute()

// Twikoo 配置
const twikooConfig = computed(() => theme.value.twikoo || { enabled: false })
const isTwikooEnabled = computed(() => twikooConfig.value.enabled !== false)

// Logo 配置
const logoConfig = computed(() => theme.value.vivianLogo || {})
const hasLogo = computed(() => !!logoConfig.value.src || !!logoConfig.value.emoji)
const hasEmoji = computed(() => !!logoConfig.value.emoji)

// 页面切换动画
function triggerPageAnimation() {
  nextTick(() => {
    const content = document.querySelector('.VPContent')
    if (content) {
      content.classList.remove('fade-slide-enter')
      void content.offsetWidth // 强制重绘
      content.classList.add('fade-slide-enter')
    }
  })
}

watch(() => route.path, triggerPageAnimation)

// 判断是否是真正的首页（有 hero 配置）
const isRealHome = computed(() => {
  return frontmatter.value.layout === 'home' && frontmatter.value.hero !== undefined
})

// 判断是否是 home 布局的子页面（有 layout: home 但没有 hero）
const isHomeSubPage = computed(() => {
  return frontmatter.value.layout === 'home' && frontmatter.value.hero === undefined
})

// 表格滚动容器
function wrapTables() {
  nextTick(() => {
    const tables = document.querySelectorAll('.vp-doc table')
    tables.forEach(table => {
      if (table.parentElement?.classList.contains('table-scroll-wrapper')) return
      const wrapper = document.createElement('div')
      wrapper.className = 'table-scroll-wrapper'
      table.parentNode?.insertBefore(wrapper, table)
      wrapper.appendChild(table)
    })
  })
}

onMounted(wrapTables)
watch(() => route.path, () => {
  nextTick(wrapTables)
})
</script>

<template>
  <DefaultTheme.Layout>
    <!-- 标题前的图标 -->
    <template #nav-bar-title-before>
      <span v-if="hasEmoji" class="nav-emoji">{{ logoConfig.emoji }}</span>
      <img
        v-else-if="hasLogo && !hasEmoji"
        :src="logoConfig.src"
        :alt="logoConfig.alt || 'Logo'"
        :width="logoConfig.width || 24"
        :height="logoConfig.height || 24"
        class="nav-icon"
      />
    </template>

    <!-- 自定义深浅色切换 - PC 端（搜索栏和社交媒体之间） -->
    <template #nav-bar-content-after>
      <VPSwitchAppearance class="desktop-theme-switch" />
    </template>

    <!-- 自定义深浅色切换 - 移动端（下拉菜单内） -->
    <template #nav-screen-content-after>
      <div class="mobile-theme-switch">
        <VPSwitchAppearance />
      </div>
    </template>

    <!-- 404 页面 -->
    <template #not-found>
      <div class="not-found">
        <img src="https://http.cat/404" alt="404" class="not-found-img" />
        <h1 class="not-found-title">页面不见了</h1>
        <p class="not-found-desc">页面藏起来了，可能是站长遗忘了或者你输入错了？</p>
        <a href="/" class="not-found-link">返回首页</a>
      </div>
    </template>

    <!-- doc 布局的页面 -->
    <template #doc-after>
      <Twikoo v-if="isTwikooEnabled" :config="twikooConfig" />
    </template>

    <!-- home 布局的子页面（非首页） -->
    <template #layout-bottom>
      <div v-if="isHomeSubPage && isTwikooEnabled" class="twikoo-home-container">
        <Twikoo :config="twikooConfig" />
      </div>
    </template>
  </DefaultTheme.Layout>
</template>

<style scoped>
.nav-icon {
  height: 24px;
  width: 24px;
  margin-right: 8px;
  vertical-align: middle;
  object-fit: contain;
}

.nav-emoji {
  font-size: 20px;
  margin-right: 8px;
  vertical-align: middle;
  line-height: 1;
}
/* 评论区域样式 */
.twikoo-home-container {
  max-width: 960px;
  margin: 0 auto;
  padding: 2rem 2.5rem;
}

/* Home 子页面分割线 */
.twikoo-home-container::before {
  content: '';
  display: block;
  border-top: 1px solid rgba(70, 71, 87, 0.4);
  margin-bottom: 2rem;
}

@media (max-width: 768px) {
  .twikoo-home-container {
    padding: 1rem 1.5rem;
  }
}

/* 404 页面 */
.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - var(--vp-nav-height) - 200px);
  padding: 2rem;
  text-align: center;
}

.not-found-img {
  max-width: 400px;
  width: 100%;
  border-radius: 16px;
  margin-bottom: 2rem;
  box-shadow: 0 8px 32px color-mix(in srgb, var(--main-color) 15%, transparent);
}

.not-found-title {
  font-size: 2rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin-bottom: 0.5rem;
}

.not-found-desc {
  font-size: 1.1rem;
  color: var(--vp-c-text-2);
  margin-bottom: 2rem;
  max-width: 500px;
}

.not-found-link {
  display: inline-block;
  padding: 12px 32px;
  background-color: var(--main-color);
  color: #fff;
  border-radius: 12px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.25s ease;
  box-shadow: 0 4px 16px color-mix(in srgb, var(--main-color) 30%, transparent);
}

.not-found-link:hover {
  background-color: var(--main-color-light);
  transform: translateY(-2px);
  box-shadow: 0 8px 24px color-mix(in srgb, var(--main-color) 40%, transparent);
}
</style>

<style>
/* 让 Footer 显示在评论之后 */
.VPFooter {
  order: 1;
  border-top: none !important;
}

/* Footer 上方分割线：短一点，不延伸到侧边导览 */
.VPFooter::before {
  content: '';
  display: block;
  width: 960px;
  max-width: calc(100% - 48px);
  margin: -32px auto 0;
  border-top: 1px solid rgba(70, 71, 87, 0.4);
}

/* 让 docs 页面也显示 Footer */
.VPFooter.has-sidebar {
  display: block !important;
}
</style>
