import { NextFunction, Request, Response } from "express";
import { UserModel } from './user.model'; 
import * as userService from './user.service'; 
import _ from 'lodash'; 


export const newUser = async (
    request: Request, 
    response: Response, 
    next: NextFunction
) => {
    // 获取参数
    const {name, password} = request.body; 
    // 创建用户
    try {
        const data = await userService.newUserImp({name, password}); 
        response.status(201)
                .send(data); 
    } catch (error){
        next(error); 
    }
}


/**
 * 用户账号
 */
export const showUser = async (
  request: Request, 
  response: Response, 
  next: NextFunction
) => { 
    // 准备数据
    const {userId} = request.params; // 在router定义一个 :userId 变量。
    const userIdInt = parseInt(userId, 10); 
    if (Number.isNaN(userIdInt) || userIdInt < 0){
        next(new Error('USER_ID_INVALID')); 
    }

    try {
        const user = await userService.getUserById(userIdInt); 
        if (!user){
            return next(new Error('USER_NOT_FOUND')); 
        }
        response.send(user); 
    } catch(error) {
        next(error); 
    }
}


/**
 * 更新用户
 */
export const updateUser = async (
  request: Request, 
  response: Response, 
  next: NextFunction
) => {
    const {id} = request.user; // 要修改的用户id是由authGuard获得的。
    const userData = _.pick(request.body.update, ['name', 'password']); // 需要更新的数据。
    
    try {
        const data = await userService.updateUser(id, userData); 
        response.send(data); 
    } catch(error) {
        next(error); 
    }
}
