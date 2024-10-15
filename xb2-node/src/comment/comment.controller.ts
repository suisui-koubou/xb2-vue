import { Request, Response, NextFunction } from "express";
import { createComment, 
    deleteCommentImpl, 
    getCommentById, 
    getComments, 
    getCommentsTotalCount, 
    updateCommentImpl,
    getCommentReplies
} from "./comment.service";
import { get } from "lodash";

/**
 * 发表评论
 */
export const storeComment = async (
    request: Request, 
    response: Response, 
    next: NextFunction
) => {
    // 中间件authGuard把识别的用户加入到请求头里面 (request.user)
    const {id: userId} = request.user; 
    // 从 request.body (即 JSON 里面的信息，发送一个JSON文件)
    const {content, postId} = request.body; 

    // 一个评论必然有 postId, userId 和 内容
    const comment = {
        postId, 
        userId, 
        content 
    }; 

    try {
        const data = await createComment(comment); 
        response
            .status(201)
            .send(data); 
    } catch(error){
        next(error); 
    }

}

/**
 * Reply 
 */
export const replyComment = async (
    request: Request, 
    response: Response, 
    next: NextFunction
) => {
    const { commentId } = request.params; 
    const parentId = parseInt(commentId, 10);   // 从 url 处获得评论的 parentId
    const {id: userId} = request.user;          // authGuard 插入的用户数据
    const {content} = request.body;     // 请求体内评论的数据
    let postId: number = null; 

    try {
        // 检测是否为回复评论 (不能无限递归回复)
        const parentComment = await getCommentById(parentId); 
        if (parentComment.parentId) return next(new Error("UNABLE_TO_REPLY_THIS_COMMENT")); // 回复本身不能被回复
        if (!parentComment.postId) return next(new Error("POST_ID_NOT_FOUND")); 
        postId = parentComment.postId; 
    } catch (error){
        return next(error); 
    }

    // 可以在这里定义一个 Interface, 意思就是只要有以下域的对象就是一个评论。
    const comment = {
        postId, 
        parentId, 
        userId, 
        content
    }; 

    try {
        const data = await createComment(comment); 
        response.status(201).send(data); 
    } catch(error){
        next(error); 
    }

    // 
}


/**
 * 修改评论
 */
export const updateComment = async (
  request: Request, 
  response: Response, 
  next: NextFunction
) => {
    const {commentId} = request.params;
    const {content} = request.body; // JSON

    const comment = {
        id: parseInt(commentId, 10), 
        content
    }

    try {
        const data = await updateCommentImpl(comment); 
        response.send(data); 
    } catch (error){
        next(error); 
    }
}



/**
 * 删除评论 
 */
export const deleteComment = async (
  request: Request, 
  response: Response, 
  next: NextFunction
) => {
    const {commentId} = request.params; 

    try {
        const data = await deleteCommentImpl(parseInt(commentId, 10)); 
        response.status(201).send(data); 
    } catch(error){
        next(error); 
    }
}



/**
 * 评论列表
 */
export const index = async (
  request: Request, 
  response: Response, 
  next: NextFunction
) => {
  // 统计评论数量
  try {
    const totalCommentCount = await getCommentsTotalCount({filter: request.mFilter});  
    response.header('X-Total-Count', totalCommentCount); 
  } catch(error){
    next(error); 
  }


  // 获取评论列表
  try { 
    const comments = await getComments({filter: request.mFilter, pagination: request.pagination}); 
    response.send(comments);
  } catch(error) {
    next(error); 
  }
}


/**
 * 回复列表
 */
export const indexReplies = async (
  request: Request, 
  response: Response, 
  next: NextFunction
) => {
  const { commentId } = request.params; 

  try {
    const replies = await getCommentReplies({
        commentId: parseInt(commentId, 10), 
    }); 
    response.send(replies); 
  } catch (error){
    next(error); 
  }
}

