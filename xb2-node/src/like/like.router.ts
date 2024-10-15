import express from 'express'; 
import * as likeController from './like.controller'; 
import { authGuard } from '../auth/auth.middleware';

const router = express.Router(); 


/**
 * 点赞内容（由于产生了变化，所以不能用get
 */
router.post('/posts/like/:postId', authGuard, likeController.storeUserLikePost); 


/**
 * 取消内容
 */
router.delete('/posts/like/:postId', authGuard, likeController.deleteUserLikePost); 


export default router; 

