import { createRouter, createWebHistory } from "vue-router";
import appRoutes from './app.routes'; 
import postRoutes from '@/post/post.routes'; 

// 路由器
const router = createRouter({
    history: createWebHistory(), 
    routes: [
        ...appRoutes,  // 展开操作符
        ...postRoutes, 
    ], 

}); 

// 默认导出
export default router; 


