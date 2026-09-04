<template>
  <div class="detail-layout" :class="{ 'detail-as-layout': isPageLayout }">
    <!-- 可选通栏封面图 -->
    <div class="detail-cover" v-if="cover">
      <img :src="cover" :alt="title || ''" />
    </div>

    <!-- PC: 左图右信息 | Mobile: 纵向堆叠 -->
    <div class="detail-hero">
      <div class="detail-image" v-if="image">
        <img :src="image" :alt="title || ''" />
      </div>
      <div class="detail-info">
        <span class="detail-tag" v-if="tag">{{ tag }}</span>
        <h1 class="detail-title" v-if="title">{{ title }}</h1>
        <p class="detail-subtitle" v-if="subtitle">{{ subtitle }}</p>
        <div class="detail-table" v-if="fields?.length">
          <div class="detail-row" v-for="(field, i) in fields" :key="i">
            <span class="detail-label" v-html="inlineMd(field.label)"></span>
            <span class="detail-value" v-html="inlineMd(field.value)"></span>
          </div>
        </div>
      </div>
    </div>

    <!-- 整页布局模式（layout: detail）：渲染 Markdown 正文 -->
    <div v-if="isPageLayout" class="detail-body vp-doc">
      <Content />
    </div>

    <!-- 整页布局模式：评论区。自定义 layout 分支不经过 VPDoc，
         Layout.vue 的 doc-after 插槽没有出口，需要在这里自行挂载 -->
    <Comment v-if="isPageLayout" class="detail-comment" />
  </div>
</template>

<script setup lang="ts">
import { computed, inject, provide } from 'vue'
import { useData } from 'vitepress'
import { mdRender } from '../markdown'
import Comment from '../Comment.vue'

// 防递归标记：layout: detail 模式下本组件会渲染 <Content />，
// 若正文里又写了 <detail />，内层实例通过 inject 感知，保持 hero 模式不再渲染正文。
const LAYOUT_BODY_KEY = 'vivian:detail-as-layout'
const insideLayoutBody = inject<boolean>(LAYOUT_BODY_KEY, false)
provide(LAYOUT_BODY_KEY, true)

const { frontmatter } = useData()

const props = withDefaults(
  defineProps<{
    image?: string
    cover?: string
    title?: string
    subtitle?: string
    tag?: string
    fields?: { label: string; value: string }[]
  }>(),
  {
    image: undefined,
    cover: undefined,
    title: undefined,
    subtitle: undefined,
    tag: undefined,
    fields: undefined,
  }
)

// 优先使用组件 props，回退到 frontmatter（兼容旧用法）
const image = computed(() => props.image || frontmatter.value.image)
const cover = computed(() => props.cover || frontmatter.value.cover)
const title = computed(() => props.title || frontmatter.value.title)
const subtitle = computed(() => props.subtitle || frontmatter.value.subtitle)
const tag = computed(() => props.tag || frontmatter.value.tag)
const fields = computed(() => props.fields || frontmatter.value.fields || [])

// 页面布局模式：frontmatter 声明 layout: detail 时，VitePress 会把本组件
// 当作整页布局渲染（VPContent 的 <component :is="frontmatter.layout" /> 分支），
// 此时组件负责 hero + Markdown 正文 + 评论区；行内用法（<detail />）只渲染 hero。
const isPageLayout = computed(() => frontmatter.value.layout === 'detail' && !insideLayoutBody)

// 将字段文本按 Markdown 渲染（支持超链接、加粗、行内代码）
function inlineMd(src?: string): string {
  return mdRender(src)
}
</script>

<style scoped>
.detail-layout {
  width: 100%;
  max-width: 100%;
  padding: calc(var(--vp-nav-height) + 24px) 32px 48px;
}

/* 整页布局模式：限宽居中（行内模式由 VPDoc 负责限宽） */
.detail-as-layout {
  max-width: var(--vp-layout-max-width);
  margin-inline: auto;
}

.detail-body {
  margin-bottom: 24px;
}

/* 通栏封面 */
.detail-cover {
  margin-bottom: 32px;
  border-radius: 16px;
  overflow: hidden;
  background-color: color-mix(in srgb, var(--vp-c-bg) 45%, transparent);
  -webkit-backdrop-filter: blur(40px) saturate(200%);
  backdrop-filter: blur(40px) saturate(200%);
  border: 1px solid color-mix(in srgb, var(--vp-c-border) 50%, transparent);
  box-shadow:
    0 2px 8px color-mix(in srgb, var(--main-color) 12%, transparent),
    0 4px 16px color-mix(in srgb, var(--main-color) 8%, transparent);
}

.detail-cover img {
  width: 100%;
  height: auto;
  display: block;
}

/* PC: 左右布局 */
.detail-hero {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
  align-items: start;
  margin-bottom: 40px;
}

.detail-as-layout .detail-hero {
  margin-bottom: 32px;
}

/* 预览图 */
.detail-image {
  position: sticky;
  top: calc(var(--vp-nav-height) + 24px);
  border-radius: 16px;
  overflow: hidden;
  background-color: color-mix(in srgb, var(--vp-c-bg) 45%, transparent);
  -webkit-backdrop-filter: blur(40px) saturate(200%);
  backdrop-filter: blur(40px) saturate(200%);
  border: 1px solid color-mix(in srgb, var(--vp-c-border) 50%, transparent);
  box-shadow:
    0 2px 8px color-mix(in srgb, var(--main-color) 12%, transparent),
    0 4px 16px color-mix(in srgb, var(--main-color) 8%, transparent);
}

.detail-image img {
  width: 100%;
  height: auto;
  display: block;
}

/* 信息区域 */
.detail-info {
  padding: 36px 48px;
  background-color: color-mix(in srgb, var(--vp-c-bg) 40%, transparent);
  -webkit-backdrop-filter: blur(40px) saturate(200%);
  backdrop-filter: blur(40px) saturate(200%);
  border: 1px solid color-mix(in srgb, var(--vp-c-border) 50%, transparent);
  border-radius: 16px;
  box-shadow:
    0 2px 8px color-mix(in srgb, var(--main-color) 12%, transparent),
    0 4px 16px color-mix(in srgb, var(--main-color) 8%, transparent);
}

/* 标签徽章 */
.detail-tag {
  display: inline-block;
  margin-bottom: 14px;
  padding: 4px 14px;
  font-size: 0.8rem;
  font-weight: 600;
  color: #fff;
  background-color: var(--main-color);
  border-radius: 999px;
  letter-spacing: 0.02em;
}

.detail-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin-bottom: 12px;
  padding-bottom: 12px;
  border-bottom: 1px solid color-mix(in srgb, var(--vp-c-border) 40%, transparent);
}

/* 副标题 */
.detail-subtitle {
  margin: -4px 0 16px;
  font-size: 1rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
}

/* 信息表格 */
.detail-table {
  width: 100%;
}

.detail-row {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 16px;
  padding: 12px 0;
  border-bottom: 1px solid color-mix(in srgb, var(--vp-c-border) 40%, transparent);
  align-items: baseline;
}

.detail-row:last-child {
  border-bottom: none;
}

.detail-label {
  font-weight: 600;
  color: var(--vp-c-text-2);
  white-space: nowrap;
}

.detail-value {
  color: var(--vp-c-text-1);
  word-break: break-word;
}

/* 深色模式 */
.dark .detail-image,
.dark .detail-cover {
  background-color: color-mix(in srgb, var(--vp-c-bg) 55%, transparent);
}

.dark .detail-info {
  background-color: color-mix(in srgb, var(--vp-c-bg) 55%, transparent);
}

/* ========== 移动端：纵向堆叠 ========== */
@media (max-width: 959px) {
  .detail-layout {
    padding: calc(var(--vp-nav-height) + 16px) 16px 32px;
  }

  .detail-cover {
    margin-bottom: 20px;
  }

  .detail-hero {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .detail-image {
    position: static;
  }

  .detail-info {
    padding: 20px;
  }

  .detail-title {
    font-size: 1.25rem;
  }

  .detail-subtitle {
    font-size: 0.95rem;
  }
}
</style>
