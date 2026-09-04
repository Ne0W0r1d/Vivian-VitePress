<template>
  <div :id="elId"></div>
</template>

<script setup lang="ts">
import { onMounted, watch } from 'vue'
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
// 会互相覆盖，评论渲染进错误的容器
const elId = `twikoo-${Math.random().toString(36).slice(2, 9)}`

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
