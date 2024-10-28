import { connection } from "../app/database/mysql";
import { TagModel } from "./tag.model";


/**
 * 创建标签
 */
export const createTag = async (
    tag: TagModel
) => {
    const statement = `
        INSERT INTO tag 
        SET ? 
    `; 

    const [data] = await connection.promise().query(statement, tag); 
    return data as any; 
}

/**
 * 按标签名字查找
 */
export const getTagByName = async (
    tagName: string
) => {
    // 准备查询
    const statement = `
        SELECT id, name FROM tag 
        WHERE name = ? 
    `;
    
    const [data] = await connection.promise().query(statement, tagName); 
    // 数据库返回多个结果
    return data[0]; 
}


/**
 * 保存博文标签
 */
export const createPostTag = async (postId: number, tagId: number) => {
    // 准备查询
    const statement = `
        INSERT INTO post_tag (postId, tagId)
        VALUES(?, ?) 
    `; 
    // 执行查询
    const [data] = await connection.promise().query(statement, [postId, tagId]); 
    // 提供数据
    return data; 
}


/**
 * 检查内容标签
 */
export const postHasTag = async (postId: number, tagId: number) => {
    const statement = `
        SELECT * FROM post_tag 
        WHERE postId=? AND tagId=?
    `; 
    
    const [data] = await connection.promise().query(statement, [postId, tagId]); 
    return data[0] ? true : false ; 
}

/**
 * 删除内容标签
 */
export const deletePostTagImp = async (
    postId: number, tagId: number
) => {
    const statement = `
        DELETE FROM post_tag 
        WHERE postId = ? AND tagId = ? 
    `; 

    const [ data ] = await connection.promise().query(statement, [postId, tagId]);
    return data;  
}