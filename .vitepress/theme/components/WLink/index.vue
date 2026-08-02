<template>
  <div id="main" class="mx-auto w-full max-w-384 p-6 lg:p-8">
    <h1 class="text-text1 text-2xl! font-bold!">{{ config.title }}</h1>
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
            <span class="pl-2">{{ collapsedStates[index] ? config.toggleShow : config.toggleHide }}</span>
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
        <h3 class="bg-bg-soft absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] px-8 text-center text-xl! font-bold!">{{ config.leaveTitle }}</h3>
      </div>
      <p class="mb-8! text-center font-medium!">{{ config.leaveDesc }}</p>
      <div class="link-comment-container rounded-2xl p-6">
        <p class="mb-3!">
          {{ config.joinText }}
          <a :href="config.siteLink" target="_blank"><b>{{ config.siteName }}</b></a> {{ config.joinSuffix }}
        </p>
        <div class="note custom-block github-alert mb-3">
          <p class="custom-block-title">{{ config.siteInfoTitle }}</p>
          <p>
            {{ config.siteInfoLabel.title }}：{{ config.siteInfo.title }} <br />
            {{ config.siteInfoLabel.url }}：{{ config.siteInfo.url }} <br />
            {{ config.siteInfoLabel.avatar }}：{{ config.siteInfo.avatar }} <br />
            {{ config.siteInfoLabel.desc }}：{{ config.siteInfo.desc }} <br />
          </p>
        </div>
        <div class="link-details-container mb-6 rounded-lg p-4">
          <details class="group">
            <summary class="flex cursor-pointer list-none items-center font-medium">
              <span class="mr-2 text-lg text-(--vp-c-tip-1) transition-transform duration-200 group-open:rotate-90">▶</span>
              {{ config.rulesTitle }}
            </summary>
            <div class="mt-2 mb-2 pl-1">
              <p v-for="(rule, i) in config.rules" :key="i">{{ rule }}</p>
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
import { ref, computed } from 'vue'
import LinkSite from './LinkSite.vue'
import Twikoo from '../../Twikoo.vue'
import { LinkList } from '../../type/WLink'
import { defaultConfig, type WLinkConfig } from './config'
// import WIcon from '../WIcon.vue'

const { frontmatter: fm, theme } = useData()

const linksData = (fm.value.links as LinkList[]) || []
const outLinksData = (fm.value.outLinks as LinkList[]) || []

// 折叠状态管理
const collapsedStates = ref<boolean[]>(outLinksData.map(() => true))

const toggleOutLink = (index: number) => {
  collapsedStates.value[index] = !collapsedStates.value[index]
}

// 从 themeConfig.wlink 读取文案，提供默认值
const config = computed<WLinkConfig>(() => {
  const w = (theme.value.wlink || {}) as Record<string, any>
  return {
    ...defaultConfig,
    ...w,
    siteInfoLabel: { ...defaultConfig.siteInfoLabel, ...(w.siteInfoLabel || {}) },
    siteInfo: { ...defaultConfig.siteInfo, ...(w.siteInfo || {}) },
  }
})
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
    opacity: 1;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
