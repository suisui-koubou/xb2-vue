# 90天獨立開發之路

https://www.bilibili.com/video/BV1FE421P7dN/?spm_id_from=333.788&vd_source=eefa19ed1149679e6ec8d83a6f2eebcc


## Vuex

Vuex 可以往根对象注入数据。比如 

```js
import { createStore } from "vuex"; 
// 创建 store (可以把数据放到 store 里面 的 state , 允许任意一个 vue 组件使用)。
const myStore = createStore({
    state: {
        name: '哔哩哔哩📺'
    }, 
});
export default myStore; 
```

然后在 Vue组件访问

```vue
<template>
  <h3>{{ $store.state.name }}</h3>
</template>

<script lang="ts">

export default {
  data() {
    return { }
  },
};

</script>
```

此时 `$store` 可能报错，这是因为 TypeScript 的类型检查。

https://github.com/vuejs/vetur/issues/2292

可以尝试声明类型, 创建一个 `vuex-shim.d.ts` 文件。

```ts
import { ComponentCustomProperties } from 'vue'
import { Store } from 'vuex'

declare module '@vue/runtime-core' {
	interface ComponentCustomProperties {
		$store: Store<any>
	}
}
```

但是进一步想在方法里面 修改状态 `this.$store.state.name` 又出错了。



