
/* 
    
    可以将后端接口放在 server/api 或者 server/routes (routes的 url 没有api)
    文件名含有 get 的时候, 可以转化为 GET 方法。
*/
export default defineEventHandler(() => {
    return {
        message: '您好 ~ '
    }
}); 


