import { Request, Response, NextFunction, request } from "express";
import * as userService from '../user/user.service'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { PUBLIC_KEY } from "../app/app.config";
import { TokenPayload } from "./auth.user.interface";
import { possess } from "./auth.service"

/**
 * 验证用户登陆中间件
 */
export const validateLoginData = async (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    console.log('👮 验证用户数据(登陆授权验证)'); 
    // 准备数据
    const { name, password } = request.body; 
    // 验证数据是否完整
    if (!name) return next(new Error('NAME_IS_REQUIRED')); 
    if (!password) return next(new Error('PASSWORD_IS_REQUIRED')); 
    // 验证用户名是否存在
    const user = await userService.getUserByName(name, {password: true}); 
    if (!user) return next(new Error('USER_DOES_NOT_EXIST')); 
    // 比较密码是否匹配(尝试一下 bcrypt.compare 接await 和 不接await 有什么区别)
    const matched = await bcrypt.compare(password, user.password); 
    if (!matched) return next(new Error('PASSWORD_DOES_NOT_MATCH')); 

    // 在请求主体添加用户(验证数据后, 添加用户数据，传递给下一层的controller)
    request.body.user = user; 

    // 下一步
    next(); 
}; 


/**
 * 利用jwt验证用户身份(类似 cookies)
 */
export const authGuard = (
    request: Request, 
    response: Response, 
    next: NextFunction
) => {
    console.log('👮‍♀️ 验证JWT'); 
    try{
        // 提取 authorization 
        const authorization = request.header('Authorization'); 
        if (!authorization) throw new Error(); 
        // 提取 JWT 令牌
        const token = authorization.replace('Bearer ', ''); // 去掉 bearer
        if (!token) throw new Error(); 
        // 验证 
        const decoded = jwt.verify(token, PUBLIC_KEY, {algorithms: ['RS256']});
        // 在请求添加payload内容（新定义的 User Interface ）
        request.user = decoded as TokenPayload ; 
        next();  
    }catch (error){
        next(new Error('UNAUTHORIZED')); 
    }
}


/**
 * 访问控制
 */
interface AccessControlOptions{
    possession?: boolean;
}

export const accessControl = (options: AccessControlOptions) => {
    return async (request: Request, response: Response, next: NextFunction) => {
        console.log('👮 访问控制');
        // 解构选项
        const { possession } = options;   
        const {id: userId} = request.user; 
        // 放行管理员
        if (userId == 0) return next(); 
        // 准备资源(从request获取资源的类型和资源id)
        // 比如请求包含 userId, 那么获取key就是 userId, 可以之后 request.params['userId'] 获取参数值。
        const resourceIdParam = Object.keys(request.params)[0]; 
        // 了解资源类型(比如 postId 去掉Id 就是 post类型)。
        let resourceType = resourceIdParam.replace('Id', ''); 
        // 由于数据库post表名为 posts， 所以解析出来要加's'。
        if (resourceType == 'post') resourceType += 's';
        // 解析 resourceId
        const resourceId = parseInt(request.params[resourceIdParam], 10); 
        // 检查资源的所有权
        if (possession){
            try {
                const ownResource = await possess({resourceId, resourceType, userId}); 
                if (!ownResource){
                    return next(new Error('USER_DOES_NOT_HAVE_RESOURCE')); 
                }
            } catch (error){
                return next(error); 
            }
        }
        // 下一步
        next(); 
    }; 
}; 