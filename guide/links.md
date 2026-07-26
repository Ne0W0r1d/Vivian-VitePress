# Twikoo 集成

## 前言

加入，交换，建立良好关系，这就是友链系统存在的必要性。
感谢[唯知笔记的教程](https://note.weizwz.com/vitepress/extend/links#vitepress-%E6%B7%BB%E5%8A%A0%E5%8F%8B%E9%93%BE%E7%95%8C%E9%9D%A2)

## 配置

### 加入链接

新建一个 Markdown 文件，名字自定义，Frontmatter，然后在 Frontmatter 加入东西。

```md
---
layout: weiz-link
title: 友链
description: 这是 Can We Tux 的友链系统，基于 weizwz 的方案
sidebar: false
<!--Links 是不折叠的链接，outLinks 是折叠的，每个 Title 代表一个分类-->
links:
  - title: 站长
    desc: 如果想看近期的一些开发动态，杂谈，欢迎来到我的博客！
    list:
      - name: Ne0W0r1d
        link: https://0w0.red
        avatar: https://0w0.red/images/ava.png
        descr: 继续沉醉，自我迂回
outLinks:
  - title: 鸣谢
    desc: 感谢如下网站，为 Can We Tux 贡献力量📩
    list:
      - name: VitePress
        link: https://vitepress.dev/zh/
        avatar: https://vitepress.dev/vitepress-logo-mini.svg
        descr: 由 Vite 和 Vue 驱动的静态站点生成器，本站所使用技术栈
      - name: 唯知笔记
        link: https://note.weizwz.com/
        avatar: https://p.weizwz.com/logo_a4353391cbf0889b.webp 
        descr: 友链和 Twikoo 集成教程
---
```

### 文本编辑（需要有 Vue 基础）

前往 `.vitepress/theme/components/WLink/index.vue` 编辑，默认 Weizwz 的方案就够用，如果你想 Vibe 新的，或者觉得像个性化，则改动以下部分的内容。

```vue
<template>
<!--……-->
</template>
```

如果单纯只想改文案，则直接跳转到
```vue
// 从 themeConfig.wlink 读取文案，提供默认值
const config = computed(() => {
<!--……-->
    ],
  }
})
```

这个区域修改即可
