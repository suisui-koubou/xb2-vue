import { connection } from "../app/database/mysql";

/**
 * 保存用户点赞内容
 */
export const createUserLikePost = async (
    userId: number, postId: number
) => {
    const statement = `
        INSERT INTO 
            user_like_post (userId, postId)
        VALUES (?, ?)
    `; // 两个主键
    
    const [data] = await connection.promise().query(statement, [userId, postId]);
    return data;  
}

/**
 * 取消用户点赞内容
 */
export const deleteUserLikePostImpl = async (userId: number, postId: number) => {
    // 准备查询
    const statement = `
        DELETE FROM user_like_post 
        WHERE userId = ? AND postId = ? 
    `; 
    // 执行
    const [data] = await connection.promise().query(statement, [userId, postId]);
    return data;  
}
