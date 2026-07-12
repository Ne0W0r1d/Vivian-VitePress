# Twikoo 集成

## 前言
由于折腾 [Can We Tux?](https://tux.red) ，所以对我来说评论系统是很重要的，这也是为什么直接集成 Twikoo 的原因。

目前，Vivian Theme 已经支持 Twikoo 集成，可以按照以下手段启用。

感谢[唯知笔记的教程](https://note.weizwz.com/vitepress/extend/vitepress-twikoo)

## 环境搭建

[![Static Badge](https://img.shields.io/badge/前往-Twikoo_文档-blue?style=flat)](https://twikoo.js.org/)

## 配置

在完成环境搭建后

前往 `.vitepress/config.mjs` 启用

```diff
    // Twikoo 评论系统配置
    twikoo: {
-     enabled: false, // 是否启用评论系统
+     enabled: true, // 是否启用评论系统
-     envId: 'https://your-twikoo-url.vercel.app', // Twikoo 环境 ID
+     envId: 'https://twikoo.twikoo.zzz', // Twikoo 环境 ID
      // 可选配置
      // region: 'ap-shanghai',
      // path: 'window.location.pathname',
      // lang: 'zh-CN',
    },
```
