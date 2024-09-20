
import { createStore } from "vuex"; 

// 创建 store
// (可以把数据放到 store 里面 的 state , 允许任意一个 vue 组件使用)。
const store = createStore({
    state: {
        name: ''
    }, 

    getters: {
        name(state) {
            return `🎈 ${state.name}`; 
        }
    },

    mutations: {
        setName(state, newData) {
            state.name = newData; 
        }
    }, 

    actions: {
        getName(context){ 
            const name = '宁浩网'; 
            context.commit('setName', name); 
        }
    }
});

export default store; 


