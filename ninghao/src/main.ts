import { createApp } from 'vue'; 
import App from './app/App.vue'; 
import appStore from './app/app.store'; 
import appRouter from './app/app.router'; 


// 创建应用
const app = createApp(App); 

// 应用store (store就是一个前段数据仓库，类似 本地NoSQL)
app.use(appStore); 

// 路由器
app.use(appRouter); 

// 挂载应用
app.mount('#app'); 

