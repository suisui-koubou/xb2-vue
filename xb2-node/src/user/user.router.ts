import express from 'express'
import * as userController from './user.controller'
import { validateUserData, hashPassword, validateUserUpdate} from './user.middleware';
import { authGuard } from "../auth/auth.middleware";

const router = express.Router(); 

/**
 * 创建用户
 */
router.post('/users', validateUserData, hashPassword, userController.newUser); 

/**
 * 获取用户
 */
router.get('/users/:userId', userController.showUser); 


/**
 * 更新用户
 */
router.patch('/users', authGuard, validateUserUpdate, userController.updateUser); 


export default router; 

