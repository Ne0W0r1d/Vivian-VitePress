---
title: "Vivian 主题详情测试"
image: /imgs/vivian.webp
subtitle: "反舌鸟阵营 · 隶属「无关人士」"
tag: "限定"
sidebar: false
aside: false
prev: false
next: false
fields:
  - label: 贡献者
    value: Ne0W0r1d
  - label: 运行方式
    value: VitePress + Tailwind CSS
  - label: Runner 版本
    value: v2.0.0-alpha.18
  - label: 运行环境
    value: Node.js 22+
  - label: 游戏厂商
    value: "[Nous Research](https://nousresearch.com)"
  - label: 反作弊提供者
    value: 无
  - label: 运行结果
    value: 正常运行
  - label: 相关链接
    value: "[官网](https://tux.red) · [代码仓库](https://github.com/Ne0W0r1d/vivian-vitepress)"
---

<detail />

## 备注信息

这是一个 **Detail 布局** 的测试页面，现在通过 `<detail />` 组件显式使用（自闭合标签，数据来自 frontmatter）。

### 功能特性

- 左侧预览图 + 右侧基础信息（PC 端）
- 移动端自动切换为纵向布局
- 完全兼容 Markdown 语法
- 支持 Twikoo 评论区

### 代码示例

```javascript
const vivian = {
  name: 'Vivian',
  version: '0.1.0-alpha',
  features: ['liquid-glass', 'detail-component', 'twikoo']
}
```

> 💡 这是一个自定义块，展示了 Detail 组件对 VitePress 原生 Markdown 功能的完整兼容。

### 列表测试

1. 第一项
2. 第二项
3. 第三项

| 字段 | 值 |
|------|-----|
| 主题 | 液态玻璃 |
| 布局 | Detail |
| 评论 | Twikoo |
