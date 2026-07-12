<template>
  <div id="main" class="mx-auto w-full max-w-384 p-6 lg:p-8">
    <h1 class="text-text1 text-2xl! font-bold!">友链</h1>
    <div class="mb-12">
      <div class="link" v-for="(item, index) of linksData" :key="index">
        <div class="relative mt-12 mb-6 h-px bg-slate-200 dark:bg-neutral-700">
          <h3 class="bg-bg-soft absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] px-6 text-center text-xl! font-bold!">
            {{ item.title }}
          </h3>
        </div>
        <p class="mb-8! text-center font-medium!">{{ item.desc }}</p>
        <div class="link-container grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <div v-for="temp of item.list" :key="temp.link" class="link-wrapper">
            <LinkSite :data="temp" />
          </div>
        </div>
      </div>

      <div class="link" v-for="(item, index) of outLinksData" :key="'out-' + index">
        <div class="relative mt-12 mb-6 h-px bg-slate-200 dark:bg-neutral-700">
          <h3 class="bg-bg-soft absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] px-6 text-center text-xl! font-bold!">
            {{ item.title }}
          </h3>
        </div>
        <p class="mb-4! text-center font-medium!">{{ item.desc }}</p>

        <!-- Toggle Button -->
        <div class="mb-8 flex justify-center">
          <div
            @click="toggleOutLink(index)"
            class="bg-bg hover:bg-main text-text1 border-border group flex cursor-pointer items-center gap-2 rounded-md border px-4 py-1.5 text-sm font-bold transition-all duration-300 hover:text-white"
          >
            <span class="pl-2">{{ collapsedStates[index] ? '查看' : '收起' }}</span>
            <WIcon tag="right" class="transition-transform duration-300 group-hover:text-white!" :class="collapsedStates[index] ? 'rotate-90' : '-rotate-90'" />
          </div>
        </div>

        <div v-show="!collapsedStates[index]" class="animate-fade-in grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          <div v-for="temp of item.list" :key="temp.link" class="link-wrapper">
            <LinkSite :data="temp" :noAvatar="true" />
          </div>
        </div>
      </div>
    </div>
    <div class="message">
      <div class="relative mt-12 mb-6 h-px bg-slate-200 dark:bg-neutral-700">
        <h3 class="bg-bg-soft absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] px-8 text-center text-xl! font-bold!">留链</h3>
      </div>
      <p class="mb-8! text-center font-medium!">欢迎留下你的足迹</p>
      <div class="link-comment-container rounded-2xl p-6">
        <p class="mb-3!">
          非常高兴能和很多朋友交流，如果你也想加入
          <a href="https://note.weizwz.com" target="_blank"><b>Vivian</b></a> 的友链，可以在评论区回复哦！
        </p>
        <div class="note custom-block github-alert mb-3">
          <p class="custom-block-title">本站信息</p>
          <p>
            标题：Vivian <br />
            地址：https://vivian.0w0.red <br />
            头像：https://vivian.0w0.red/imgs/vivian.webp <br />
            描述：一个 Vibe Coding 的，用于 Can We Tux 的 VitePress 主题 <br />
          </p>
        </div>
        <div class="link-details-container mb-6 rounded-lg p-4">
          <details class="group">
            <summary class="flex cursor-pointer list-none items-center font-medium">
              <span class="mr-2 text-lg text-(--vp-c-tip-1) transition-transform duration-200 group-open:rotate-90">▶</span>
              友链须知
            </summary>
            <div class="mt-2 mb-2 pl-1">
              <p>互换原则：请先将本站添加到您的友链页面，确认后会添加您的友链</p>
              <p>链接维护：友链网站长期无法访问或内容违规，将会被移除</p>
              <p>内容要求：内容积极向上，不含有任何含色情/反动/暴力等违法违规内容</p>
              <p>站点要求：支持 HTTPS，以原创内容为主，能够正常访问且有持续更新</p>
            </div>
          </details>
        </div>
        <Twikoo />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useData } from 'vitepress'
import { ref } from 'vue'
import LinkSite from './LinkSite.vue'
import Twikoo from '../../Twikoo.vue'
import { LinkList } from '../../type/WLink'
// import WIcon from '../WIcon.vue'

const { frontmatter: fm } = useData()

const linksData = (fm.value.links as LinkList[]) || []
const outLinksData = (fm.value.outLinks as LinkList[]) || []

// 折叠状态管理
const collapsedStates = ref<boolean[]>(outLinksData.map(() => true))

const toggleOutLink = (index: number) => {
  collapsedStates.value[index] = !collapsedStates.value[index]
}
</script>

<style scoped>
@media (min-width:  96rem) {
  .link-container {
    grid-template-columns: repeat(5, minmax(0, 1fr));
  }
}

.animate-fade-in {
  animation: fadeIn 0.5s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
