export default defineNuxtRouteMiddleware((to, from) => {
    console.log(`🌲 (前端的)全局中间件: 从 ${from.path} 到 ${to.path}`); 
})