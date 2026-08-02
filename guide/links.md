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

### 文本编辑（推荐方式）

所有友链页面的文案都在独立配置文件中，主题更新后只需维护这个文件即可：

`.vitepress/theme/components/WLink/config.ts`

修改 `defaultConfig` 中对应的字段即可自定义文案。也可以在 `config.ts` 的 `defaultConfig` 中统一修改，无需改动组件代码。

#### 可配置字段说明

| 字段 | 说明 | 默认值 |
|------|------|--------|
| `title` | 页面标题 | 友链 |
| `toggleShow` | 折叠按钮-展开文案 | 查看 |
| `toggleHide` | 折叠按钮-收起文案 | 收起 |
| `leaveTitle` | 留链区块标题 | 留链 |
| `leaveDesc` | 留链区块描述 | 欢迎留下你的足迹 |
| `joinText` | 邀请文案前半部分 | 非常高兴能和很多朋友交流，如果你也想加入 |
| `siteName` | 站点名称 | Vivian |
| `siteLink` | 站点链接 | https://vivian.0w0.red |
| `joinSuffix` | 邀请文案后半部分 | 的友链，可以在评论区回复哦！ |
| `siteInfoTitle` | 本站信息标题 | 本站信息 |
| `siteInfoLabel` | 本站信息字段标签 | { title, url, avatar, desc } |
| `siteInfo` | 本站信息内容 | { title, url, avatar, desc } |
| `rulesTitle` | 友链须知标题 | 友链须知 |
| `rules` | 友链须知内容（数组） | 4 条默认规则 |

#### 通过 themeConfig 覆盖

也可以在 `.vitepress/config.ts` 的 `themeConfig.wlink` 中覆盖任意字段，优先级高于 `config.ts` 中的默认值：

```ts
export default defineConfig({
  themeConfig: {
    wlink: {
      siteName: '我的博客',
      siteInfo: {
        title: '我的博客',
        url: 'https://example.com',
        avatar: 'https://example.com/avatar.png',
        desc: '我的博客描述',
      },
    },
  },
})
```

#### 旧方式（不推荐）

如果你之前是直接改 `index.vue` 的模板内容，建议迁移到 `config.ts`，主题更新后不用再手动改组件。
