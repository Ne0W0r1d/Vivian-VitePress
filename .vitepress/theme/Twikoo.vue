<template>
  <div :id="elId"></div>
</template>

<script setup lang="ts">
import { onMounted, useId, watch } from 'vue'
import { useRoute } from 'vitepress'

interface TwikooConfig {
  enabled?: boolean
  envId: string
  region?: string
  path?: string
  lang?: string
}

const props = defineProps<{
  config: TwikooConfig
}>()

const route = useRoute()

// 实例唯一挂载点：硬编码 id="twikoo" 在同页多实例（如友链页 + 行内组件）时
// 会互相覆盖，评论渲染进错误的容器。
// 用 useId() 而非 Math.random()：SSG 预渲染与客户端水合生成同一 id，
// 避免 SSR HTML 里的随机 id 与客户端不一致（Math.random 在构建时烤死一个值进 HTML）
const elId = useId()

const initTwikoo = async () => {
  // 判断是否在浏览器环境中
  if (typeof window !== 'undefined' && props.config.envId) {
    const twikoo = await import('twikoo')
    twikoo.init({
      envId: props.config.envId,
      el: `#${elId}`,
      region: props.config.region,
      path: props.config.path,
      lang: props.config.lang,
    })
  }
}

// 监听路由刷新评论
watch(route, () => {
  initTwikoo()
})

onMounted(() => {
  initTwikoo()
})
</script>
