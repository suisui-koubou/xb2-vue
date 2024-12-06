/* 
Nuxt会扫描这个目录里面使用use作为前缀的文件里面定义的这个组合。
组合就是一个函数。

runtimeConfig可以被环境变量覆盖掉。
在根目录新建 '.env' 文件，
NUXT_PUBLIC_API_BASE_URL=http://localhost:3001
*/

type UseApiFetchOptions = {
    method?: string; 
    body?: Record<string, any>; 
}

export const useApiFetch = <T>(
    api: string | () => string, 
    options?: UseApiFetchOptions
) => {
    // 对象析构(只需提供对象的一部分)
    const {public: {apiBaseUrl}} = useRuntimeConfig(); 
    // console.log(apiBaseUrl);  

    const currentUser = useState('currentUser'); 

    // 添加统一的Base前缀。
    return useFetch<T>(api, { 
        baseURL: apiBaseUrl, 

        onRequest: async (context) => {
            if (currentUser.value){
                context.options.headers = {
                    Authorization: `Bearer ${currentUser.value.token}`
                }; 
            }
        }, 

        ...options
    });  
}

