import express from 'express'
import * as commentController from './comment.controller'
import { accessControl, authGuard } from '../auth/auth.middleware';
import { filter } from './comment.middleware'; 
import { COMMENTS_PER_PAGE } from '../app/app.config'; 
import { paginate } from '../post/post.middleware';


const router = express.Router(); 

/**
 * 发表评论
 */
router.post("/comments", authGuard, commentController.storeComment); 


/**
 * 回复评论
 */
router.post("/comments/reply/:commentId", authGuard, commentController.replyComment); 


/**
 * 修改评论
 */
router.patch("/comments/:commentId", authGuard, accessControl({possession: true}), commentController.updateComment); 


/**
 * 删除评论
 */
router.delete("/comments/:commentId", authGuard, accessControl({possession: true}), commentController.deleteComment); 

/**
 * 评论列表
 */
router.get('/comments', 
    filter, 
    paginate(COMMENTS_PER_PAGE), 
    commentController.index); 

/**
 * 回复列表
 */
router.get('/comments/replies/:commentId', commentController.indexReplies); 


// 导出路由
export default router; 
