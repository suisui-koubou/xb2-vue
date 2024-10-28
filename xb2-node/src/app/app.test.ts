import { greet } from "./playground/demo";
import { connection } from './database/mysql'; 
import request from 'supertest'; 
import app from '../app'; 


/**
 * 单元测试1 
 */
describe('演示单元测试', () => {
    // 测试
    test('测试 greet 函数', () => {
        const greeting = greet('王皓'); 
        expect(greeting).toBe("你好, 王皓"); 
    }); 
}); 

/**
 * 测试接口/路由 app
 */
describe('演示接口测试', () => {
    afterAll(async () => {
        // 断开数据库连接
        connection.end(); 
    }); 

    /* app 是 express 应用，有路由的地址，可通过 supertest 的 request 发送请求 */
    test('测试 GET /', async () => {
        // 请求接口
        const response = await request(app).get('/'); 
        // 验证效果
        expect(response.status).toBe(200); 
        expect(response.body).toEqual({title: '小白兔的开发之路'}); 
    });


    test('测试 POST /echo', async () => {
        // 请求接口
        const response = await request(app).post('/echo').send({messgae: '您好~'});
        // 验证效果
        expect(response.status).toBe(201); 
        expect(response.body).toEqual({messgae: '您好~'});  
    }); 
}); 


