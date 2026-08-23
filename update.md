# 更新日志

## 2026-08-23

- `Comment` 评论系统
    - 新增统一评论组件 `Comment.vue`，支持多评论系统切换
    - 支持 Utterances（基于 GitHub Issues）评论系统
    - 支持 Twikoo 评论系统（保持兼容）
    - 配置方式：`themeConfig.comment.provider` 可选 `'none'` | `'twikoo'` | `'utterances'`
- `Utterances` 组件
    - 新增 Utterances 评论组件，自动根据页面路由注入评论
    - 支持深浅色主题自动切换
    - 页面导航时自动重新渲染评论
- `Layout.vue`
    - 集成 Comment 组件到文档页面（`doc-after` slot）
    - 保持对 Home 子页面的评论支持（`layout-bottom` slot）
    - 向后兼容旧版 `twikoo` 配置
- 文档
    - 新增 `guide/comment.md` 评论系统配置文档
    - 包含 Twikoo 和 Utterances 的完整配置说明

## 2026-08-02

- `WLink` 友链系统
    - 将文案配置抽离至独立文件 `config.ts`，主题更新后无需重新设置
    - 支持通过 `themeConfig.wlink` 覆盖任意字段
    - 更新了 `guide/links.md` 文档说明
- `DetailLayout` 详情布局
    - 新增全宽布局组件，PC 端左图右信息（4:6 比例）
    - 移动端（<960px）自动切换为纵向堆叠
    - 隐藏 sidebar 和 aside，不受 doc 布局影响
- `Layout.vue`
    - 新增 `layout: detail` 判断，自动切换至 DetailLayout

## 2026-07-26

- 杂项
    - 由于 Codeberg 已上线新版 EULA，由于该代码基于 LLM 生成，本项目海外地址将迁移至 Github
- `ASide` 章节指示
    - 为手机端加入章节指示高亮
    - 优化了显示样式
- `LocalSearch` 搜索
    - 修复了按钮错位的 Bug
- `NavBar` 菜单栏
    - 修复了 `ExtraMenu` 额外菜单和 `Appearance` 主题设置在特定分辨率不显示的 Bug
    - `Search` 按钮在部分分辨率下，在该快照将会是按钮状态而非搜索框状态
    - 修复了手机端过高导致无法重新选中回到顶部的 BUG
- `Footer` 页脚
    - 降低了分割线的存在感
- `Twikoo` 集成
    - 修复了回帖存在的容器显示问题
- `WLink` 友链系统
    - 将模板和文案解耦合，以方便更改
    - 未来研究更好解耦合的逻辑以避免修改后更新导致出错

## 2026-07-13

- ASide
    - 修改了 ASide 移动端的按钮
    - 修复了 ASide 指示器位置对不上的 Bug
- Sidebar
    - 优化了 Sidebar 的滚动条

## 2026-07-12

- 项目立项，将已经修改好的主题《Can We Tux》Hard Fork 下来
