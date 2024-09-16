import { createApp } from 'vue';
import App from './App.vue';
import appStore from './app.store'; 

/**
 * 创建应用
 */
const app = createApp(App); 

/**
 * 应用 Store 或者 路由的方法 
 */
app.use(appStore); 


/**
 * 挂载应用到 id = app 的元素节点上。
 */
app.mount('#app'); 


