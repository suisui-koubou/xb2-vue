import { GetPostsOptionsFilter, GetPostsOptionsPagination } from "src/post/post.service";
import { connection } from "../app/database/mysql";
import { CommentModel } from "./comment.model";
import { sqlFragment } from "./comment.sql.statement";


/**
 * 创建评论
 */
export const createComment = async (
    comment: CommentModel
) => {
    // 准备数据
    const statement = `
        INSERT INTO comment 
        SET ? 
    `; 
    const [ data ] = await connection.promise().query(statement, comment); 
    return data; 
}

/**
 * 检查评论是否为回复评论
 */
export const getCommentById = async (
    commentId: number
) => {
    const statement = `
        SELECT * FROM comment
        WHERE id = ?
    `;
    const [data] = await connection.promise().query(statement, commentId); 
    return data[0] as CommentModel; 
}



/**
 * 修改评论
 */
export const updateCommentImpl = async (
    comment: CommentModel
) => {
    const {id, content} = comment; 
    const statement = `
        UPDATE comment 
        SET content = ? 
        WHERE id = ? 
    `; 

    const [ data ] = await connection.promise().query(statement, [content, id]); 
    return data; 
}


/**
 * 删除评论
 */
export const deleteCommentImpl = async (
    commentId: number
) => {
    const statement = `
        DELETE FROM comment 
        WHERE id = ?
    `; 

    const [data] = await connection.promise().query(statement, commentId);
    return data;  
}


interface GetCommentOptions {
    filter?: GetPostsOptionsFilter; 
    pagination? : GetPostsOptionsPagination; 
}

/**
 * 获取评论列表
 */
export const getComments = async (options: GetCommentOptions) => {
    // 解构选择
    const {filter, pagination: {limit, offset}} = options;

    // SQL参数
    let params: Array<any> = [limit, offset]; 
    // 设置过滤器
    if (filter.param){
        params = [filter.param, ...params]; 
    }


    const statement = `
        SELECT 
            comment.id,
            comment.content, 
            ${sqlFragment.user}, 
            ${sqlFragment.post}
            ${filter.name == 'userReplied' ? `, ${sqlFragment.repliedComment}` : ''}
            ${filter.name !== 'useReplied' ? `, ${sqlFragment.totalReplies}` : ''}
        FROM 
            comment 
        ${sqlFragment.leftJoinUser}
        ${sqlFragment.leftJoinPost}
        WHERE 
            ${filter.sql}
        GROUP BY 
            comment.id 
        ORDER BY 
            comment.id DESC
        LIMIT ? 
        OFFSET ? 
    `; 

    const [data] = await connection.promise().query(statement, params); 

    return data; 
}



/**
 * 统计评论数量
 */
export const getCommentsTotalCount = async (
    options: GetCommentOptions
) => {
    // 解构选项
    const { filter } = options; 

    // SQL参数
    let params: Array<any> = []; 
    // 设置SQL参数
    if (filter.param){
        params = [filter.param, ...params]; 
    }
    // 准备查询
    const statement = `
        SELECT 
            COUNT(
                DISTINCT comment.id
            ) as total
        FROM 
            comment 
        ${sqlFragment.leftJoinUser}
        ${sqlFragment.leftJoinPost}
        WHERE 
            ${filter.sql}
    `; 

    const [data] = await connection.promise().query(statement, params); 

    return data[0].total; 
}; 


/**
 * 评论回复列表
 */
interface GetCommentRepliesOptions {
    commentId: number; 
}

export const getCommentReplies = async (
    options: GetCommentRepliesOptions
) => {
    // 解构选项
    const {commentId} = options; 

    const statement = `
        SELECT 
            comment.id, 
            comment.content, 
            ${sqlFragment.user}
        FROM 
            comment
        ${sqlFragment.leftJoinUser}
        WHERE 
            comment.parentId = ?
        GROUP BY 
            comment.id 
    `; 


    const [data] = await connection.promise().query(statement, commentId);
    
    return data; 
}