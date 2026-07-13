import { defineConfig } from 'vitepress'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  appearance: true,
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['script', {}, `
      (function() {
        const mode = localStorage.getItem('vitepress-theme-mode') || 'auto';
        let isDark;
        if (mode === 'auto') {
          isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        } else {
          isDark = mode === 'dark';
        }
        document.documentElement.classList.toggle('dark', isDark);
      })();
    `]
  ],
  title: "Vivian",
  description: "A VitePress theme with liquid glass design",
  themeConfig: {
    // 站点图标配置（自定义实现，不使用 VitePress 内置 logo）
    vivianLogo: {
      src: '/imgs/vivian.webp', // 图标路径（支持 SVG、ICO、图片）
      alt: 'Vivian', // 图标描述
    },
    search: {
      provider: 'local',
      options: {
        translations: {
          button: { buttonText: '搜索' },
          modal: {
            footer: {
              selectText: '选中',
              navigateText: '导航',
              closeText: '关闭搜索'
            }
          }
        }
      }
    },
    outline: { label: '在此章节中' },
    docFooter: { prev: '上一章节', next: '下一章节' },
    darkModeSwitchLabel: '深浅色模式',
    darkModeSwitchTitle: '切换到深色模式',
    lightModeSwitchTitle: '切换到浅色模式',
    notFound: {
      title: '页面不见了',
      quote: '页面藏起来了，可能是站长遗忘了或者你输入错了？',
      linkLabel: '回到首页',
      linkText: '返回首页'
    },
    footer: {
      message: 'Powered by VitePress Vivian',
      copyright: 'Copyright © 2026 Ne0W0r1d'
    },
    // Twikoo 评论系统配置
    twikoo: {
      enabled: false, // 是否启用评论系统
      envId: 'https://your-twikoo-url.vercel.app', // Twikoo 环境 ID
      // 可选配置
      // region: 'ap-shanghai',
      // path: 'window.location.pathname',
      // lang: 'zh-CN',
    },
    nav: [
      { text: '主页', link: '/' },
      { text: '文档', link: '/guide/' },
      { text: '友链', link: '/links.md' },

    ],
    socialLinks: [
      { icon: 'gitee', link: 'https://gitee.com/ne0w0r1d/vivian-vitepress' },
      { icon: 'codeberg', link: 'https://codeberg.org/ne0w0r1d/vivian-vitepress' },
    ],
    sidebar: [
      {
        text: '指南',
        items: [
          { text: '介绍', link: '/guide/' },
          { text: '更新日志', link: '/update' },
          { text: '快速开始', link: '/guide/getting-started' },
          { text: "Twikoo 集成", link: '/guide/twikoo'},
          { text: "友链", link: '/guide/links'},
          { text: "代码高亮", link: '/guide/highlight'},
        ],
      },
      {
        text: '详细教程',
        items: [
          { text: '完整功能 Demo 站', link: 'https://tux.red' },
          { text: '跳转至 VitePress', link: 'https://vitepress.dev/zh/guide/getting-started' },
        ],
      },

    ]
  },
  markdown: {
    theme: {
      light: 'everforest-light',
      dark: 'everforest-dark'
    },
    lineNumbers: true
  },
  vite: {
    plugins: [tailwindcss()]
  }
})
