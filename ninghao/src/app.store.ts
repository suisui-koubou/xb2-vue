
import { createStore } from "vuex"; 

// 创建 store
// (可以把数据放到 store 里面 的 state , 允许任意一个 vue 组件使用)。
const store = createStore({
    state: {
        name: '哔哩哔哩'
    }
});

export default store; 


