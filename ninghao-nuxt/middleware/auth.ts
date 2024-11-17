export default defineNuxtRouteMiddleware(() => {
    console.log('👮‍♀️auth中间件');

    const isLoggedIn = false; 
    if (!isLoggedIn){
        return navigateTo('/login');
    }
})