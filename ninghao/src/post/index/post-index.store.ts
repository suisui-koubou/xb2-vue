import { Module } from "vuex";
import { PostItem } from "../post.store";
import { RootState } from "@/app/app.store";
import { apiHttpClient } from "@/app/app.service";

export interface PostIndexStoreState {
    loading: boolean;
    posts: Array<PostItem>; 
}


export const postIndexStoreModule: Module<PostIndexStoreState, RootState> = {
    namespaced: true, 

    state: {
        loading: true,
        posts: [], 
    } as PostIndexStoreState, 

    getters: {
        loading(state) {
            return state.loading; 
        }, 

        posts(state){
            return state.posts; 
        }
    }, 

    mutations: {
        setLoading(state, payload){
            state.loading = payload; 
        }, 

        setPosts(state, payload){
            state.posts = payload; 
        }
    }, 

    actions: {
        async getPosts({ commit }){
            try {
                const response = await apiHttpClient.get('/posts');
                commit('setLoading', false); 
                commit('setPosts', response.data); 
                return response; 
            } catch (error){
                commit('setLoading', true); 
            }
        }
    }
}
