import DefaultTheme from 'vitepress/theme'
import Layout from './Layout.vue'
import './style/tailwind.css'
import WLink from './components/WLink/index.vue' // 友链页
import DetailLayout from './components/DetailLayout.vue' // 详情布局
export default {
    ...DefaultTheme,
    Layout,
    enhanceApp({ app }) {
        // 注册全局组件
        app.component('weiz-link', WLink)
        app.component('detail-layout', DetailLayout)
    }
};
