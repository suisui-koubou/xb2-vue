import { RootState } from "@/app/app.store";
import { Module } from "vuex";

// State的类型
export interface PostCreateStoreState {
    loading: boolean; 
}

export const postCreateStore: Module<PostCreateStoreState, RootState> = {
    namespaced: true, 

    state: {
        loading: false, 
    }, 

    getters: {
        loading(state){ // state就是store模块里面的 state
            return state.loading; 
        }
    }
}