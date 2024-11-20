
/* 
    在后端接口api使用地址参数。
*/
export default defineEventHandler((event) => {
    const {context} = event; 
    const {params: {name}} = context; 

    return {
        message: `您好 ~ ${name}`
    }
}); 


