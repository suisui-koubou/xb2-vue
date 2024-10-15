import { Request, Response, NextFunction } from "express";
import { createUserLikePost, deleteUserLikePostImpl } from "./like.service";

/**
 * 点赞内容
 */
export const storeUserLikePost = async (
  request: Request, 
  response: Response, 
  next: NextFunction
) => {
    const {postId} = request.params; 
    const {id: userId} = request.user; 

    // 
    try {
        const data = await createUserLikePost(userId, parseInt(postId, 10)); 
        response.status(201).send(data); 
    }catch(error){
        next(error); 
    }
}


/**
 * 取消点赞内容
 */
export const deleteUserLikePost = async (
  request: Request, 
  response: Response, 
  next: NextFunction
) => {
    const { postId } = request.params; 
    const { id: userId } = request.user; // authGurad 添加的用户数据 

    try {
        const data = await deleteUserLikePostImpl(userId, parseInt(postId, 10));
        response.send(data);  
    } catch(error) {
        next(error); 
    }

}