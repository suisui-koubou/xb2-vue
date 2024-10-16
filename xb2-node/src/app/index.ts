import express from 'express';
import cors from 'cors'; 
import postRouter from '../post/post.router';
import userRouter from '../user/user.router'; 
import authRouther from '../auth/auth.router'; 
import fileRouter from '../file/file.router'; 
import tagRounter from '../tag/tag.router'; 
import commentRouter from '../comment/comment.router'; 
import avatarRouter from '../avatar/avatar.router'; 
import likeRouter from '../like/like.router'; 
import appRouter from './app.router'; 

import { defaultErrorHandler } from './app.middleware';


/**
 * 创建应用
 */
const app = express();

/**
 * 处理 JSON
 */
app.use(express.json());

/**
 * 跨域资源共享
 */
app.use(cors()); 

/**
 * 路由
 */
app.use(
    postRouter, 
    userRouter, 
    authRouther, 
    fileRouter, 
    tagRounter, 
    avatarRouter, 
    commentRouter, 
    likeRouter, 
    appRouter
);


/**
 * 默认的异常处理器中间件(依赖函数签名是别的?)
 */
app.use(defaultErrorHandler); 

/**
 * 导出应用
 */
export default app;
