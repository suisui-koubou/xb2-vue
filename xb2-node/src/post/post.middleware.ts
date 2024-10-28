import { Request, Response, NextFunction} from "express";

/**
 * 排列方式
 */
export const sortPosts = async (
  request: Request, 
  response: Response, 
  next: NextFunction
) => {
  // 获取客户端的排序方式(在 express.d.ts 中添加了 request 的类型)
  const { sortBy } = request.query; 
  
  // 排序后面的 SQL 附加句
  let sortSql: string; 

  switch (sortBy){
    case 'earliest': 
        sortSql = 'posts.id ASC';  
        break; 
    case 'latest':
        sortSql = 'posts.id DESC'; 
        break; 
    case 'most_comments': 
        sortSql = 'totalComments DESC, posts.id DESC';  
        break; 
    default: 
        sortSql = 'posts.id DESC'
        break; 
  }
  // 重新修正请求头
  request.sortBy = sortSql; 
  
  next(); 
}


/**
 * 过滤列表
 */
export const filterPosts = async (
  request: Request, 
  response: Response, 
  next: NextFunction
) => {
  // 结构查询符号(http://127.0.0.1/?tag=xxx&user=xxx&action=xxx)
  const {tag, user, action} = request.query; 

  // 设置默认的过滤
  request.mFilter = {
    name: 'default', 
    sql: 'posts.id IS NOT NULL', 
  }
  // 按照标签名过滤
  if (tag && !user && !action){
    request.mFilter = {
      name: 'tagName', 
      sql: 'tag.name = ?', 
      param: tag.toString()
    }
  }
  // 过滤出用户发布的内容
  if (user && action == 'published' && !tag) {
    request.mFilter = {
      name: 'userPublished',
      sql: 'user.id = ?', 
      param: user.toString()
    }
  }

  // 过滤出用户赞过的内容
  if (user && action == 'liked' && !tag) {
    request.mFilter = {
      name: 'userLiked',
      sql: 'user_like_post.userId = ?', 
      param: user.toString()
    }
  }

  // 下一步
  next(); 
}


/**
 * 内容分页中间件
 */
export const paginate = (itemPerPage: number) => {
  return async (request: Request, response: Response, next: NextFunction) => {
    // 当前页面（默认1）
    const { page:pageQs } = request.query; 
    let page = 1; 
    if (pageQs) {
      page = parseInt(pageQs.toString(), 10) || 1;  
    }
    // 每页内容数量
    const limit = itemPerPage || 30; // 如果 parseInt解析错误，就用30
    // 计算出偏移量
    const offset = limit * (page - 1); 
    // 设置请求中的分页
    request.pagination = {limit, offset};   
    // 下一步
    next(); 
  }; 
}; 

