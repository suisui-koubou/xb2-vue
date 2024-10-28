import { Request, Response, NextFunction} from "express";
import { signToken } from "./auth.service";

/**
 * 用户登陆
 */

export const login = async (
    request: Request, 
    response: Response, 
    next: NextFunction
) => {
    // 准备数据(从 middleware 来的)
    const { user: {id, name}, } = request.body; 
    const payload = {id, name}; 

    try{
        // 签发数据
        const token = signToken({payload});   
        // 做出响应(可以在 jwt.io 测试验证, 观察 header, payload, signature, 并用 Public Key 验证). 
        response.send({id, name, token});     
    }catch(error){  
        next(error); 
    }
}


/**
 * 验证登陆
 */
export const authorize = (
    request: Request, 
    response: Response, 
    next: NextFunction
) => {
    console.log(request.user); 
    response.sendStatus(200);
}