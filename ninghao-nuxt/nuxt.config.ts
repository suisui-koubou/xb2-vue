// https://nuxt.com/docs/api/configuration/nuxt-config
// 在Nuxt项目里面使用应用的配置就是使用 nuxt.config.ts里面的配置。

// 我们也可以在Nuxt项目里面的配置 Runtime Config去添加一些配置。
// 这些应用到服务端、也可以选择定义公开的配置。
// 另外这些配置可以使用环境变量去覆盖掉。

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  ssr: false,

  modules: ['@nuxt/image'], 
  image: {
    domains: ['https://resources.ninghao.net/']
  },

  runtimeConfig: {
    // 在 runtimeConfig 对象里面直接添加的东西是私有的配置。
    // 如果有定义公开的配置可以放在 runtimeConfig.public 下面。
    public: {
        apiBaseUrl: '', // 在 .env 里面定义 NUXT_PUBLIC_API_BASE_URL 的时候，Nuxt会自动覆盖掉 apiBaseUrl 。
    }
  } 
})

