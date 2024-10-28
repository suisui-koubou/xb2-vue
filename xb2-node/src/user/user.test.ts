import request from 'supertest'; 
import bcrypt from 'bcrypt'; 
import app from '../app'; 
import { connection } from '../app/database/mysql';
import { signToken } from '../auth/auth.service';
import { deleteUser, getUserById } from './user.service';
import { UserModel } from './user.model';

/**
 * 准备测试
 */
const testUser: UserModel = {
    name: 'xb2-test-user-name', 
    password: '111111', 
}; 

const testUserUpdate: UserModel = {
    name: 'xb2-test-user-new-name', 
    password: '222222', 
}


let testUserCreated: UserModel; 

/**
 * 所有测试结束后的动作(清楚掉测试中产生的数据)
 */
afterAll(async () => {
    if (testUserCreated){
        await deleteUser(testUserCreated.id); 
    }
    connection.end(); 
}); 


/**
 * 创建用户
 */
describe('测试创建用户接口', () => {
    test('创建用户时必须提供用户名', async () => {
        // 请求接口
        const response = await request(app)
            .post('/users')
            .send({password: testUser.password}); 
        // 做出断言
        expect(response.status).toBe(400); 
        expect(response.body).toEqual({message: '请提供用户名'});

    }); 

    test('创建用户时必须提供密码', async () => {
        // 请求接口
        const response = await request(app)
            .post('/users')
            .send({name: testUser.name}); 
        // 做出断言
        expect(response.status).toBe(400); 
        expect(response.body).toEqual({message: '请提供用户密码'});
    }); 

    test('成功创建用户后，响应状态码是201', async () => {
        // 请求接口
        const response = await request(app)
            .post('/users')
            .send(testUser); 
        // 设置创建的测试用户
        testUserCreated = await getUserById(response.body.insertId, {
            password: true, 
        })
        // 做出断言
        expect(response.status).toBe(201); 
    }); 
}); 


describe('测试用户账户接口', () => {
    test('响应里应该包含指定的属性', async () => {
        const response = await request(app).get(`/users/${testUserCreated.id}`); 
        expect(response.status).toBe(200); 
        expect(response.body.name).toBe(testUser.name); 
        expect(response.body).toMatchObject({
            id: expect.any(Number), 
            name: expect.any(String), 
            avatar: null
        }); 
    }); 


    test('当用户不存在时, 响应的状态码是400', async () => {
        const response = await request(app).get('/users/NaN'); 
        expect(response.status).toBe(400); 
    }); 


}); 


/**
 * 更新用户
 */
describe('测试更新用户接口', () => {
    test('更新用户时需要验证用户身份', async () => {
        const response = await request(app).patch('/users'); 
        expect(response.status).toBe(401); 
    })


    test('更新用户数据', async () => {
        // 虚拟登陆获取token
        const token = signToken({
            payload: {
                id: testUserCreated.id, 
                name: testUserCreated.name
            }
        }); 
        // 发送请求
        const response = await request(app)
            .patch('/users')
            .set('Authorization', `Bearer ${token}`)
            .send({
                validate: {
                    password: testUser.password, 
                }, 
                update: {
                    name: testUserUpdate.name, 
                    password: testUserUpdate.password
                }
            }); 
        // 调取用户，进行更新后的比对。
        const user = await getUserById(testUserCreated.id, { password: true }); 
        // 对比密码
        const matched = await bcrypt.compare(testUserUpdate.password, user.password);
        // 做出断言
        expect(response.status).toBe(200); 
        expect(matched).toBeTruthy();
        expect(user.name).toBe(testUserUpdate.name);  
    }); 
}); 


