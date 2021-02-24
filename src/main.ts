import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "@/static/css/reset.css"
import "@/static/css/el-reset.css"

const app = createApp(App);
/* 引入多个自定义函数 */
import * as getConfig from '@/utils/config'

app.config.globalProperties.$getConfig = getConfig.default;
/* 引入element */
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';

app.use(ElementPlus)
/* 引入mock模拟数据 */
require("./mock")

/* 引入通用的网络请求 */
import * as api from '@/api/index'

app.config.globalProperties.$getApi = api.default;
/* 引入bus */
import bus from '@/utils/bus'

app.config.globalProperties.$bus = bus;
/* 引入echarts */
import * as echarts from "echarts";

app.config.globalProperties.$echarts = echarts;

app.use(store);
app.use(router);
app.mount('#app');
