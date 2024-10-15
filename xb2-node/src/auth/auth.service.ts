import jwt from 'jsonwebtoken'
import { PRIVATE_KEY } from '../app/app.config'
import { connection } from '../app/database/mysql';

/**
 * 签发令牌
 */
interface SignTokenOptions{
    payload?: any; 
}

export const signToken = (options: SignTokenOptions) => {
    // 准备选项(从SignTokenOptions中选取)
    const {payload} = options; 
    // 签发JWT
    const token = jwt.sign(payload, PRIVATE_KEY, {algorithm: 'RS256'}); 
    // 提供JWT
    return token; 
}; 

/**
 * 检查用户是否拥有资源
 */
interface PossessOptions{
    resourceId: number; 
    resourceType: string; 
    userId: number; 
}

export const possess = async (options: PossessOptions) => {
    // 准备选项
    const {resourceId, resourceType, userId} = options; 
    // 准备查询
    const statement = `
        SELECT COUNT(${resourceType}.id) as count 
        FROM ${resourceType}
        WHERE ${resourceType}.id = ? AND userId = ? 
    `; 
    // 检查拥有权
    const [data] = await connection
        .promise()
        .query(statement, [resourceId, userId]); 
    
    // 提供检查结构
    return data[0].count ? true : false; 
}