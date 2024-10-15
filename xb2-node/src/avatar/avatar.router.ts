import express from 'express'
import * as avatarController from './avatar.controller'
import { authGuard } from '../auth/auth.middleware';
import { avatarInterceptor, avatarProcessor} from './avatar.middleware';

const router = express.Router(); 

/**
 * 上传头像(鉴权,文件类型,保存文件)
 */
router.post('/avatar', authGuard, avatarInterceptor, avatarProcessor, avatarController.storeImg); 

/**
 * 头像服务
 */
router.get('/users/avatar/:userId', avatarController.serveAvatar); 

// 导出路由
export default router; 

