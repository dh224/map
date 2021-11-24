import { createApp } from 'vue'
import App from './App.vue'
import * as echarts from 'echarts'
import ElementPlus from 'element-plus'
// 默认element-plus 主题
import 'element-plus/dist/index.css'



createApp(App).mount('#app')
app.config.globalProperties.$echarts = echarts
app.use(ElementPlus).use(store).use(router).mount('#app')