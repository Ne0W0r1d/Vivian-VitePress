<template>
  <div id="twikoo"></div>
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

const initTwikoo = async () => {
  // 判断是否在浏览器环境中
  if (typeof window !== 'undefined' && props.config.envId) {
    const twikoo = await import('twikoo')
    twikoo.init({
      envId: props.config.envId,
      el: '#twikoo',
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
