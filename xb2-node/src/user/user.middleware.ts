import { Request, Response, NextFunction} from "express";
import * as userService from './user.service'; 
import bcrypt from 'bcrypt'; 
import _ from 'lodash'; 

/**
 * 验证用户数据(一般是正则，防止SQL注入攻击)
 * (看起来跟 Controller 差不多?)
 */
export const validateUserData = async (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    console.log('👮 验证用户数据'); 
    // 准备数据
    const { name, password } = request.body; 
    // 验证数据
    if (!name) return next(new Error('NAME_IS_REQUIRED')); 
    if (!password) return next(new Error('PASSWORD_IS_REQUIRED')); 
    // 验证用户名是否唯一
    const user = await userService.getUserByName(name); 
    if (user) return next(new Error('USER_ALREADY_EXIST')); 

    // TODO: 需要更多验证规则

    // 下一步
    next(); 
}; 


/**
 * Hash密码(加盐处理密码)
 */
export const hashPassword = async (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    console.log("ads "); 
    // 明文传输密码?
    const { password } = request.body; 
    // hash密码
    request.body.password = await bcrypt.hash(password, 10); 
    console.log("加密密码-->" + request.body.password); 
    // 下一步
    next();     
}


/**
 * 验证更新用户数据
 */
export const validateUserUpdate = async (
    request: Request, 
    response: Response, 
    next: NextFunction
) => {
    // 准备更新的数据
    const {validate, update} = request.body; 
    // 当前用户(保证有 authGuard)
    const {id: userId} = request.user; 
    // 检查用户是否提供了当前密码(一般在修改密码前都要提供原来的密码，这是为了防止非本人操作(因为登陆可以有效一段时间))。
    try {
        // 
        if (!_.has(validate, 'password')){
            return next(new Error('PASSWORD_IS_REQUIRED')); 
        }
        // 调取用户数据
        const user = await userService.getUserById(userId, {password: true}); 
        // 验证用户密码是否匹配
        const matched = await bcrypt.compare(validate.password, user.password); 
        if (!matched){
            return next(new Error('PASSWORD_DOES_NOT_MATCH')); 
        }
        // 检查用户名是否被占用
        if (update.name){
            const user = await userService.getUserByName(update.name);
            if (user) {
                return next(new Error('USER_ALREADY_EXIST')); 
            } 
        }
        // 处理用户更新密码
        if (update.password){
            const matched = await bcrypt.compare(update.password, user.password); 
            if (matched){
                return next(new Error('PASSWORD_IS_SAME'));
            }
            // HASH用户更新密码
            request.body.update.password = await bcrypt.hash(update.password, 10); 
        }
    } catch(error) {
        next(error);    
    }
    // 下一步
    next(); 
}
