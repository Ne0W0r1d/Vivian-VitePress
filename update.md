# 更新日志

## 2026-09-04 1.2.0

- 修复与排版（友链 / Detail 布局）
    - **友链页评论区修复**：自定义布局分支不经过 VPDoc，此前留链容器内裸挂的 `<Twikoo />` 从未初始化（缺 config prop 且项目评论系统为 utterances）——现改为在留链容器之后显式挂载 `Comment` 组件，跟随 `themeConfig.comment` 配置；页面顺序为：标题 → Tag 筛选 → 友链卡片 → 留链容器 → 评论区
    - **Twikoo 挂载点防冲突**：挂载容器 `id` 改为每实例唯一，同页多个评论实例不再互相覆盖
    - **Detail 整页布局水平居中**：`VPContent.has-sidebar` 在 ≥1440px 时左右内边距不对称（左侧多出 272px 侧边栏宽度），导致 `layout: detail` 页面整体偏左；现两侧内边距同时归零，居中交给 `.detail-as-layout` 自身的 `max-width + margin-inline: auto`
    - **友链页标题 H1 化**：标题排版对齐 `.vp-doc h1` 官方规范（28px → ≥768px 32px、weight 600、letter-spacing -0.02em），与文档页 H1 观感一致
    - **移动端 NavBar 遮挡修复**：主题在所有断点将 `.VPNav` 强制为悬浮玻璃条（`position: fixed`），但官方顶部补偿仅在 ≥960px 生效，自定义布局页移动端标题被压在导航栏下——友链页 `#main` 在 <960px 补 `padding-top: calc(var(--vp-nav-height) + 16px)`（Detail 布局自带补偿，无需处理）

- `Detail` 布局
    - `detail` 现在可作为**页面布局**使用：frontmatter 声明 `layout: detail` 即可整页启用，无需再写 `<detail />` 标签
    - 整页模式下正文由 VitePress 原生 `<Content />` 渲染，Markdown 功能（标题/代码块/表格/自定义容器）完全正常
    - 整页模式自动在正文下方挂载评论区（该布局分支不经过 VPDoc，需自行挂载 Comment 组件）
    - 组件内置防递归保护：正文里再写 `<detail />` 时，内层只渲染 hero 信息区，不会重复渲染正文
    - `layout: detail` 分支自动隐藏侧边栏与大纲（`:has()` 兜底规则扩展至 `.VPContent` 左内边距修正）
- `WLink` 友链系统重构
    - 卡片重设计：**头像在上，昵称与签名在下**，居中竖排液态玻璃卡片，悬停上浮 + 主题色光环 + 昵称渐变填充
    - **保留首字头像机制**：头像加载失败时自动回退为站点名称首字
    - 新增 **Tag 分类筛选**：frontmatter 每条友链增加可选 `tag` 字段，页面顶部展示「全部 + 各 Tag」药丸按钮并带计数，点击切换分类
    - 切换分类带 **FLIP 换位 + 缩放淡入淡出动画**（TransitionGroup），遵循 `prefers-reduced-motion` 降级
    - 数据结构简化：原 `links`（分组）+ `outLinks`（折叠分组）合并为单一平铺 `links`，移除 `outLinks` / `noAvatar` / `toggleShow` / `toggleHide`
    - 新增配置项 `allTag`（「全部」按钮文案）、`defaultTag`（未标注友链的分组名）、`emptyText`（空分类提示），均可经 `themeConfig.wlink` 覆盖
    - **留链容器保留**，位置固定在友链列表与评论区之间
- 文档
    - `guide/links.md` 重写为新结构说明，新增「从旧版本迁移」章节
    - `guide/detail.md` 新增「作为页面布局使用（layout: detail）」章节
    - `links.md` 演示数据更新为 Tag 分类结构（站长 / 鸣谢 / 工具）

## 2026-09-03 1.1.0-rc2

- `detail` 详情组件（原 `DetailLayout` / `DetailHeader`）
    - 重构为全局注册的 `<detail />` 组件，不再依赖 Layout 层检测 `image` + `fields` 自动注入，可在任意页面通过自闭合标签 `<detail />` 显式使用
    - 数据来源支持组件 props 优先、回退 frontmatter，兼容旧写法
    - 新增 `cover`（顶部通栏封面）、`subtitle`（副标题）、`tag`（标题徽章）属性
    - `fields` 的 `label` / `value` 支持行内 Markdown，可书写超链接、加粗、行内代码（外链自动 `target="_blank"`）
    - 移除旧的 `DetailHeader.vue` 注入逻辑，侧边栏 / 大纲隐藏统一交由 frontmatter 的 `sidebar: false` / `aside: false` 控制
- 文档
    - 新增 `guide/detail.md` 说明 `detail` 组件的用法与属性
    - 修复了详情页 NavBar 元素布局异常的问题
- `LocalSearch` 搜索
    - 新增搜索弹窗关闭退出动画：遮罩点击、返回按钮、Enter 选中、Escape 四个关闭入口统一走延迟卸载，播放 250ms 动画后再卸载节点
    - 退出动画区分端型：PC 端向上收缩淡出（与入场方向相反），移动端向下滑出
    - 修复了移动端全屏覆盖时搜索弹窗无法关闭、返回按键失效的问题
- `ASide` 章节指示
    - 点击大纲章节锚点改为平滑滚动，不再瞬时跳转；PC 端大纲与移动端下拉菜单均生效
    - 修复了移动端下拉菜单 "Return to top" 瞬时跳顶而非平滑滚动的问题
- 杂项
    - 上述动效均支持 `prefers-reduced-motion: reduce` 降级为瞬时行为

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
