import { Module } from "vuex";
import { postCreateStore, PostCreateStoreState } from "./create/post-create.store";
import { RootState } from "@/app/app.store";
import PostIndex from "./index/post-index.vue";
import { postIndexStoreModule } from "./index/post-index.store";
import { postShowStoreModule } from "./show/post-show.store";

export interface PostItem {
    id: number;
    title: string;
    content: string; 
}

export interface PostStoreState {
    create: PostCreateStoreState; 
}

export const postStore: Module<PostStoreState, RootState> = {
    namespaced: true, 

    modules: {
        create: postCreateStore, 
        index: postIndexStoreModule, 
        show: postShowStoreModule
    }
}

