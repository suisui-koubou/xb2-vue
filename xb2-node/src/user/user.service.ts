import { connection } from '../app/database/mysql'; 
import { UserModel } from './user.model'; 

/**
 * 创建用户(直接操作数据库)
 */
export const newUserImp = async (user: UserModel) => {
    // 准备查询语句
    const statement = `
        INSERT INTO user 
        SET ? 
    `; 
    // 执行查询
    const [ data ] = await connection.promise().query(statement, user);     
    // 返回数据
    return data; 
}

interface GetUserOptions {
    password? : boolean
}; 


/**
 * 获取用户
 */
export const getUser = (condition: string) => {
    // get User by name(string) or by id(number). 
    return async (param: string | number, options: GetUserOptions = {}) => {
        const {password} = options; 
        const statement = `
            SELECT 
                user.id, 
                user.name, 
                IF (
                    COUNT(avatar.id), 1, NULL
                ) AS avatar
                ${password ? ', password' : ''} 
            FROM user
            LEFT JOIN avatar 
                ON avatar.userId = user.id 
            WHERE
                ${condition} = ?
        `; 
        const [data] = await connection.promise().query(statement, param); 
        return data[0].id ? data[0] : null; // There is only one item since name is unique. 
    }
}


/**
 * 按 用户名 获取用户
 */
export const getUserByName = getUser('user.name');


/**
 * 按 用户ID 获取用户
 */
export const getUserById = getUser('user.id'); 



/**
 * 更新用户
 */
export const updateUser = async (userId: number, userData: UserModel) => {
    // 
    const statement = `
        UPDATE user 
        SET ?
        WHERE user.id = ?
    `; 
    // SQL参数
    const params = [userData, userId];
    // 执行查询
    const [data] = await connection.promise().query(statement, params); 
    return data; 
}
 
/**
 * 注销用户
 */
export const deleteUser = async (userId: number) => {
    const statement = `
        DELETE FROM user 
        WHERE id = ?
    `; 
    const [data] = await connection.promise().query(statement, userId);
    return data;  
}; 


