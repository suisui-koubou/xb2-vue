import { Module } from "vuex";
import { postCreateStore, PostCreateStoreState } from "./create/post-create.store";
import { RootState } from "@/app/app.store";

export interface PostStoreState {
    create: PostCreateStoreState; 
}

export const postStore: Module<PostStoreState, RootState> = {
    namespaced: true, 

    modules: {
        create: postCreateStore, 
               
    }
}

