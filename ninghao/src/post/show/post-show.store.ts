import { apiHttpClient } from "@/app/app.service";
import { RootState } from "@/app/app.store";
import { Module } from "vuex";


export interface Post {
    id: number;
    title: string;
    content: string; 
}


export interface PostShowStoreState {
    loading: boolean; 
    post: Post;
}


export const postShowStoreModule: Module<PostShowStoreState, RootState> = {
    namespaced: true, 

    state: {
        loading: true, 
        post: {}
    } as PostShowStoreState, 


    getters: {
        loading(state) {
            return state.loading; 
        }, 

        post(state) {
            // 判断里面有没有东西
            return Object.keys(state.post).length ? state.post : null; 
        }
    }, 


    mutations: {
        setLoading(state, payload){
            state.loading = payload; 
        }, 

        setPost(state, payload){
            state.post = payload; 
        }
    }, 


    actions: {
        async getPostById({ commit }, postId){
            commit('setLoading', true); 

            try {
                const response = await apiHttpClient.get(`/posts/${postId}`); 
                commit('setLoading', false);
                commit('setPost', response.data);
            } catch(error) {
                commit('setLoading', false);
                throw error;  
            }
        }
    }
}