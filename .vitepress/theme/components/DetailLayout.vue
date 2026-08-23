<template>
  <div class="detail-layout">
    <!-- PC: 左图右信息 | Mobile: 纵向堆叠 -->
    <div class="detail-hero">
      <div class="detail-image" v-if="image">
        <img :src="image" :alt="title || ''" />
      </div>
      <div class="detail-info">
        <h1 class="detail-title" v-if="title">{{ title }}</h1>
        <div class="detail-table" v-if="fields?.length">
          <div class="detail-row" v-for="(field, i) in fields" :key="i">
            <span class="detail-label">{{ field.label }}</span>
            <span class="detail-value">{{ field.value }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Markdown 内容通过 slot 传入 -->
    <div class="detail-content vp-doc">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'

const { frontmatter } = useData()

const image = computed(() => frontmatter.value.image)
const title = computed(() => frontmatter.value.title)
const fields = computed(() => frontmatter.value.fields || [])
</script>

<style scoped>
/* detail 布局：隐藏 sidebar 和 aside */
:deep(.VPSidebar) {
  display: none !important;
}

:deep(.VPDoc .aside) {
  display: none !important;
}

:deep(.VPDoc .content) {
  padding-left: 0 !important;
}

.detail-layout {
  width: 100%;
  max-width: 100%;
  padding: calc(var(--vp-nav-height) + 24px) 32px 48px;
}

/* PC: 左右布局 */
.detail-hero {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
  align-items: start;
  margin-bottom: 40px;
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

.detail-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: 1px solid color-mix(in srgb, var(--vp-c-border) 40%, transparent);
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

/* Markdown 内容区域 */
.detail-content {
  padding: 0 0 32px;
}

/* 深色模式 */
.dark .detail-image {
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
}
</style>
