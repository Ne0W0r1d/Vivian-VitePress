import DefaultTheme from 'vitepress/theme'
import Layout from './Layout.vue'
import './style/tailwind.css'
import WLink from './components/WLink/index.vue' // 友链页
export default {
    ...DefaultTheme,
    Layout,
    enhanceApp({ app }) {
        // 注册全局组件
        app.component('weiz-link', WLink)
    }
};
