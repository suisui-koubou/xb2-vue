import { connection } from '../app/database/mysql';
import { PostModel } from './post.model';
import { sqlFragment } from './post.sql.statement';
import { ParsedQs } from 'qs'; 


/**
 * 分页选项
 */
export interface GetPostsOptionsPagination{
  limit: number; 
  offset: number; 
}


/**
 * 获取内容列表
 */

export interface GetPostsOptionsFilter {
  name: string; 
  sql: string; 
  param?: string;
}


interface GetPostsOptions{
  sort?: string;  
  filter?: GetPostsOptionsFilter; 
  pagination?: GetPostsOptionsPagination; 
}

export const getPosts = async (options: GetPostsOptions) => {
  const { sort, filter, pagination:{limit, offset}} = options;  // 双重解构(options提取pagination,再提取limit,offset)

  // SQL参数
  let params: Array<any> = [limit, offset]; 
  // 设置SQL参数
  if (filter.param){
    params = [filter.param, ...params]; // 把filter数组的内容放到 parames 里面(主要是介绍这种写法)
  }

  const statement = 
    `SELECT 
      posts.id, 
      posts.title, 
      posts.content, 
      ${sqlFragment.user},
      ${sqlFragment.totalComments}, 
      ${sqlFragment.file}, 
      ${sqlFragment.tags}, 
      ${sqlFragment.totalLikes}
    FROM posts
    ${sqlFragment.leftJoinUser}
    ${sqlFragment.leftJoinOneFile}
    ${sqlFragment.leftJoinTag}
    ${filter.name == 'userLiked' ? sqlFragment.innerJoinUserLikePost : ''}
    WHERE ${filter.sql}
    GROUP BY posts.id 
    ORDER BY ${sort}
    LIMIT ? 
    OFFSET ? 
  `;

  const [data] = await connection.promise().query(statement, params);  
  return data;
};

/**
 * 创建内容
 */
export const createPost = async (post: PostModel) => {
  // 准备查询语句(模版字符串)
  const statement = `
    INSERT INTO posts
    SET ? 
  `;   
  // 执行查询
  const [data] = await connection.promise().query(statement, post); 
  return data; 
} 


/**
 * 更新内容
 */
export const updatePost = async (postId: number, post: PostModel) => {
  // 准备查询语句(模版字符串)
   const statement = `
    UPDATE posts
     SET ?
     WHERE id = ? 
    `;
    // 执行查询
    const [data] = await connection.promise().query(statement, [post, postId]); 
    return data;  
}


/**
 * 统计内容数量
 */
export const getPostsTotalCount = async (
   options: GetPostsOptions
) => {
  const {filter} = options; 
  // SQL参数
  let params = [filter.param]; 
  // 查询
  const statement = `
    SELECT 
      COUNT(DISTINCT posts.id) AS total
    FROM posts 
      ${sqlFragment.leftJoinUser} 
      ${sqlFragment.leftJoinOneFile}
      ${sqlFragment.leftJoinTag}
      ${filter.name == 'userLiked' ? sqlFragment.innerJoinUserLikePost : ''}
      WHERE ${filter.sql} 
  `; 

  const [data] = await connection.promise().query(statement, params);
  
  return data[0].total; 
}


/**
 * 按ID获取内容
 */
export const getPostById = async (postId: number) => {
  const statement = 
  `SELECT 
    posts.id, 
    posts.title, 
    posts.content, 
    ${sqlFragment.user}, 
    ${sqlFragment.totalComments}, 
    ${sqlFragment.file}, 
    ${sqlFragment.tags}, 
    ${sqlFragment.totalLikes}
  FROM posts
  ${sqlFragment.leftJoinUser}
  ${sqlFragment.leftJoinOneFile}
  ${sqlFragment.leftJoinTag}
  WHERE posts.id = ?
  `;
  const [data] = await connection.promise().query(statement, postId);  

  // 
  if (!data[0].id){
    throw new Error('NOT_FOUND'); 
  }

  return data[0]; 
}



