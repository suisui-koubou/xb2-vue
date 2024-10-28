/* 
Exception Handler Middleware 
(1) identify types of exceptions 
(2) choose how to handle the exception/error

In express.js, exception handler is a middleware. 
*/ 

import { Request, Response, NextFunction } from "express";

/**
 * default error handler
 */
export const defaultErrorHandler = (
    error: any, 
    request: Request, 
    response: Response, 
    next: NextFunction 
) => {
    let statusCode: number, message: string; 
    if (error.message){
        console.log(error.message); 
    }
    switch (error.message){
        case 'NAME_IS_REQUIRED':
            statusCode = 401; 
            message = '请提供用户名'; 
            break; 
        case 'PASSWORD_IS_REQUIRED':
            statusCode = 401; 
            message = '请提供用户密码'; 
            break; 
        case 'USER_ALREADY_EXIST':
            statusCode = 400;
            message = '用户名已存在'; 
            break; 
        case 'USER_DOES_NOT_EXIST': 
            statusCode = 400; 
            message = '用户不存在!';  
            break; 
        case 'PASSWORD_DOES_NOT_MATCH': 
            statusCode = 400;
            message = '用户密码不正确'; 
            break; 
        case 'UNAUTHORIZED':
            statusCode = 401; 
            message = '无效授权'; 
            break; 
        case 'USER_DOES_NOT_HAVE_RESOURCE':
            statusCode = 403; 
            message = '用户无权访问当前资源'; 
            break; 
        case 'QUERY_STRING_NAN':
            statusCode = 405; 
            message = '查询字符串(query string)解析为NaN'; 
            break; 
        case 'FILE_NOT_FOUND':
            statusCode = 403; 
            message = '文件不存在';
            break;  
        case 'TAG_ALREADY_EXISTS':
            statusCode = 400; 
            message = '标签已存在';
            break; 
        case 'POST_ALREADY_HAS_THIS_TAG': 
            statusCode = 400; 
            message = '文章已有此标签'; 
            break; 
        case 'UNABLE_TO_REPLY_THIS_COMMENT':
            statusCode = 403; 
            message = '回复不能被再次回复'; 
            break; 
        case 'POST_ID_NOT_FOUND':
            statusCode = 403; 
            message = '文章id不存在'; 
            break;  
        case 'FILE_TYPE_NOT_ACCEPT':
            statusCode = 403; 
            message = '文件类型不接受'; 
            break; 
        case 'NOT_FOUND': 
            statusCode = 404; 
            message = '无法找到资源~'; 
            break; 
        case 'USER_NOT_FOUND': 
            statusCode = 404; 
            message = '用户不存在~'; 
            break; 
        case 'PASSWORD_IS_SAME': 
            statusCode = 404; 
            message = '要修改的密码不能与原密码一致~'; 
            break; 
        case 'USER_ID_INVALID': 
            statusCode = 400; 
            message = '用户ID不可用'; 
            break; 
        default: 
            statusCode = 500; 
            message = "服务暂时出了未知问题..."; 
            break; 
    }
    response.status(statusCode)
            .send({message});    
}



