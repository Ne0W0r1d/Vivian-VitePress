<template>
  <a
    class="bg-bg shadow-shadow group relative flex h-[100px] w-full items-center justify-between gap-4 rounded-2xl p-4 shadow-xs transition-all duration-600 hover:shadow-xl"
    :href="data.link"
    target="_blank"
  >
    <div v-if="!noAvatar" class="flex h-16 w-16 items-center justify-center overflow-hidden transition-all duration-600">
      <img
        v-if="data.avatar && !imageFailed"
        :class="[
          'h-full w-full align-top transition-all duration-600 object-cover',
          data.avatar?.startsWith('https://vitepress.dev/') ? 'rounded-none' : 'rounded-full'
        ]"
        :src="data.avatar"
        @error="handleImageError()"
        :alt="data.name"
      />
      <!-- 替代内容：显示首字母 -->
      <div v-else class="bg-main flex h-full w-full items-center justify-center rounded-full text-3xl font-bold text-white transition-all duration-600">
        {{ data.name.charAt(0).toLocaleUpperCase() }}
      </div>
    </div>
    <div class="flex h-full flex-1 flex-col justify-center transition-all duration-600">
      <h3
        class="mb-2! w-full overflow-hidden bg-[linear-gradient(to_right,var(--color-main)_50%,var(--color-text1)_50%)] bg-size-[200%_100%] bg-clip-text bg-position-[100%_0] text-base! font-semibold! whitespace-nowrap text-transparent transition-[background-position] duration-1000 group-hover:bg-position-[0_0]"
      >
        {{ data.name }}
      </h3>
      <div class="text-text2 line-clamp-2 w-full overflow-hidden leading-5 font-semibold break-all" :title="data.descr">
        {{ data.descr }}
      </div>
    </div>
  </a>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Link } from '../../type/WLink'

const props = defineProps<{ data: Link; noAvatar?: boolean }>()
const data = props.data
const noAvatar = props.noAvatar

// 记录图片加载状态
const imageFailed = ref(false)

// 处理图片加载失败
const handleImageError = () => {
  imageFailed.value = true // 更新加载状态
}
</script>
