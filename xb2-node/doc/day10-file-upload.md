# 文件上传

## Multe 

使用 Multe 创建一个处理上传文件的中间件，定一个上传文件的接口。

上传文件的数据格式一般是 multipart/form-data 

添加一个文件表单子段，表单字段的名字是本地文件的名字。

## 文件信息的数据表

文件一般是由"文件信息"和“二进制数据”组成，一般需要一个单独的数据仓表。

## 地址查询符

在请求中可以添加条件(比如查询符limit和offset)，例如 

```
/posts?limit=10&offset=20
```

## 代码片段 Snippets 

在 VSCode 打开命令面板 (Command + Shift + P)

搜索 Snippets , 打开配置用户代码片段，可以在全局或者当前项目创建代码片段。

## 安装和导入 Jimp 

在 `tsconfig.json` 检查

```
"allowSyntheticDefaultImports": true, 
"esModuleInterop": true,
```

## 定义文件数据库

```
CREATE TABLE `file`(
    `id` INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY, 
    `originalname` VARCHAR(255) NOT NULL, 
    `minetype` VARCHAR(255) NOT NULL, 
    `filename` VARCHAR(255) NOT NULL, 
    `size` INT(11) NOT NULL, 
    `postId` INT(11) NOT NULL, 
    `userId` INT(11) NOT NULL, 
    FOREIGN KEY (`postId`) REFERENCES `posts`(`id`) 
        ON DELETE NO ACTION ON UPDATE NO ACTION, 
    FOREIGN KEY (`userId`) REFERENCES `user`(`id`)
        ON DELETE NO ACTION ON UPDATE NO ACTION
) DEFAULT CHARSET=utf8mb4 
  COLLATE=utf8mb4_unicode_ci;




```

