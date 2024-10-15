import express from 'express';
import * as postController from './post.controller';
import { authGuard, accessControl } from '../auth/auth.middleware';
import { sortPosts, filterPosts, paginate} from './post.middleware';
import { POSTS_PER_PAGE } from '../app/app.config';

const router = express.Router();

/**
 * 内容列表(引用控制器里面的 index 函数，因为设置了输出)
 */
router.get('/posts', 
    sortPosts, 
    filterPosts, 
    paginate(POSTS_PER_PAGE), 
    postController.index);

/**
 * 创建内容
 */
router.post('/posts', 
    authGuard, 
    postController.storePost)


/**
 * 更新内容
 */
router.patch('/posts/:postId', 
    authGuard, 
    accessControl({possession: true}), 
    postController.changePost)


/**
 * 添加内容标签
 */
router.post('/posts/tag/:postId', authGuard, accessControl({possession: true}), postController.storePostTag); 


/**
 * 移除内容标签
 */
router.delete('/posts/tag/:postId', authGuard, accessControl({possession: true}), postController.deletePostTag);  

/**
 * 单个内容
 */
router.get('/posts/:postId', postController.showPostById); 

export default router;

