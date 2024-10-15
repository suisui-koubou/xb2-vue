import { Request, Response, NextFunction } from "express";

/**
 * 过滤器
 */
export const filter = async (
  request: Request, 
  response: Response, 
  next: NextFunction
) => {
  // 解构查询符
  const {post, user, action} = request.query; 

  // 默认的过滤
  request.mFilter = {
    name: 'default', 
    sql: 'comment.parentId IS NULL', 
  }
  
  // 内容的评论
  if (post && !user && !action){
    request.mFilter = {
      name: 'postIdComment', 
      sql: 'comment.parentId IS NULL AND comment.postId = ?', 
      param: post.toString()
    }
  }

  // 某个用户所有的评论
  if (user && action == 'published' && !post){
    request.mFilter = {
      name: 'userPublished', 
      sql: 'comment.parentId IS NULL AND comment.userId = ?', 
      param: user.toString()
    }
  } 

  // 用户的回复
  if (user && action == 'replied' && !post){
    request.mFilter = {
      name: 'userReplied', 
      sql: 'comment.parentId IS NOT NULL AND comment.userId = ?', 
      param: user.toString()
    }
  }


  

  // 下一步
  next(); 
}