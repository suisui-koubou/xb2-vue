import { postCreateStore } from "./create/post-create.store";

export const postStore = {
    namespaced: true, 

    modules: {
        create: postCreateStore, 
               
    }
}

