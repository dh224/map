import { createApp } from 'vue'
import App from './App.vue'
import * as echarts from 'echarts'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// 默认element-plus 主题

const app = createApp(App)
app.use(ElementPlus)
app.mount('#app')