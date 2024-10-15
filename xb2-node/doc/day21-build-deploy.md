# 部署应用

## 数据库

導出 create table 的 sql 文件

## 安裝 rimraf 

```bash 
npm install rimraf --save-dev 
```

創建文件`tsconfig.build.json`

```json
{
    "extends": "./tsconfig.json",
    "exclude": ["node_modules", "test", "dist", "**/*.spec.ts", "**/*.test.ts"]
}
```

在 `package.json` 加入腳本

```json
"scripts": {
    "prebuild": "rimraf dist", 
    "build": "tsc -p tsconfig.build.json"
}
```

## 遠端部署

登陸遠端服務器

```
ssh wanghao@47.111.228.140
```

利用 git 部署應用

```
cd /mnt
sudo dnf install git -y
git clone git@github.com:ninghao/xb2-node.git 
```

由於git有安全設置，可以打開 項目頁面 -> settings -> deploy keys -> 填入 `~/.ssh/id_rsa.pub` 公鑰。

然後安裝項目依賴

```
cd xb2-node
npm install 
```

編輯 `.env` 配置生產環境的參數

```yml 
# 应用配置
APP_PORT=3000

# 数据仓库配置
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=root
MYSQL_PASSWORD=1234
MYSQL_DATABASE=xb2_node

# 密鑰
PRIVATE_KEY= ??? 

# 内容分页
POSTS_PER_PAGE=2

# 评论分页
COMMENTS_PER_PAGE=2 

```

## 編譯應用

```
npm run build 

pm2 lits 

pm2 stop xb2-node
pm2 delete xb2-node
pm2 start dist/main.js --name xb2-node

pm2 logs xb2-node 
```

## Nginx 請求主體大小限制

Nginx 默認允許請求的主體數據不能超過1M 
(這意味著能上傳的最大文件大小為1M)

需要修改請求頭大小限制

```bash
sudo vi /etc/nginx/nginx.conf
```

只修改一個服務器

```
http {
    client_max_body_size 512m; 
}
```

```bash 
sudo systemctl reload nginx
```













