# Day 17 - 测试


## 测试概念

- 单元测试 Unit Test
- 集成测试 Integration Test
- ERE类型测试 End to End (类手工测试，或半自动化测试)

## 测试框架 Jest 

创建一个**断言库**判断是否符合预期。

按照  Jest 

```
npm install jest --save-dev 
npm install @types/jest --save-dev 
npm install ts-jest --save-dev 
```

## 使用 Jest 

观察 `app.test.ts` 

## 手工测试 - 自动化测试


```
npm install supertest --save-dev 
npm install @types/supertest --save-dev
```

If you meet the error 

```
ReferenceError: You are trying to `import` a file after the Jest environment has been torn down. From app/app.test.ts.
```

create more tests then.


