import { postStore, PostStoreState } from "@/post/post.store";
import { createStore } from "vuex";

// RootState 是怎样的类型呢?
/* 
    RootState:
        appName, 
        postStoreState: {
            create: PostCreateStoreState: {
                loading
            }
        }
*/

export interface RootState {
    appName: string; 
    post: PostStoreState; 
}

/**
 * create a store 
 * (每一个文件夹可以当作是一个模块，比如 app, user, post, comment)
 * (每一个模块下有单独的Store, 可以更有逻辑和层次)
 * (仔细在 console.log 查看 Store 对象的结构)
 */
const store = createStore({
    state: {
        appName: '比特蠕动', 
    } as RootState, 

    modules: {
        post: postStore
    }
});


/**
 * 默认导出(全局)
 */
export default store; 