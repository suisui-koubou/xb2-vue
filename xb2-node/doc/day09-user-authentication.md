# Day 09 - 用户身份验证

- 对称加密
- 非对称加密

在网络应用中, 一般有多个服务器。

如果使用对称加密，所有服务器都知道了密钥，也就是所有服务器都有签发令牌的能力。

而我们期望仅有一台服务器拥有签发令牌的能力，可以让其中一个服务器持有密钥，然后把所有公钥发给其他需要验证的服务器。

## 生成 Private Key 和 Public Key 

创建文件夹

```shell
mkdir config
cd config
```

生成 RSA 密钥

```shell
openssl genrsa -out private.key 4096
```

生成对应的公钥文件

```shell
openssl rsa -in private.key -pubout -out public.key 
```

## 将 RSA 转换为 Base64 

保存文件 `reader.key.ts`

```ts
const fs = require('fs'); 
const path = require('path'); 

/**
 * 读取密钥和公内容
 */
const privateKey = fs.readFileSync(path.join('private.key'));
const publicKey = fs.readFileSync(path.join('public.key')); 

/**
 * 转换为Base64 
 */
const privateKeyBase64 = Buffer.from(privateKey).toString('base64'); 
const pulicKeyBase64 = Buffer.from(publicKey).toString('base64'); 
```

运行 

```bash
node reader.key.ts
```

把获取的信息写入到 `src/app/app.config.ts`

```ts
/**
 * 密钥配置
 */
export let {PRIVATE_KEY, PUBLIC_KEY} = process.env; 
PRIVATE_KEY = Buffer.from(PRIVATE_KEY, 'base64').toString(); 
PUBLIC_KEY = Buffer.from(PUBLIC_KEY, 'base64').toString(); 
```

## JWT 

- Signature, 保证JWT是不被修改的
- Paylod, 令牌的签发时间、有效期、用户名字等信息
- Header, 加密的算法

(基于 Base64 编码)。


## 签发JWT

签发JWT是非常复杂的流程，但可以用包。

```shell
npm install jsonwebtoken
npm install @types/jsonwebtoken --save-dev 
```

## 验证令牌

浏览器、小程序、移动端(浏览器内核)都提供了本地储存数据的地方, 

可以在请求添加 authorization 的令牌，头部数据对应的值是 bearer 空格 这个令牌的值。

为什么是 authorization 呢？

下载 Insomnia, 新建一个 Post Request, 可以看到有 "Auth" 一栏，上面有非常多的验证标准。

此时类型要选择 'Bearer Token' (估计是 express 的框架???)

此时观察我们的 router, 中间件 authGuard 负责验证 token (token是否有效)。

而 `authController.authorize` 负责分辨是哪一位用户(例如**鉴权**)

```ts
/**
 * 定义验证登陆的接口
 */
router.post('/auth/validate', authGuard, authController.authorize); 
```

 