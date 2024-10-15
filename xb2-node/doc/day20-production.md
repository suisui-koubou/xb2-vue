# 生产环境

一般需要下面几台服务器。

- nodejs
- 数据仓库
- 反向代理

如果用docker可以在同一台机器上。


## 下载更新的 nodejs

```
curl -sL https://rpm.nodesource.com/setup_12.x | bash - 
```

下载东西之后，把东西传给管道，管道再给bash 执行。

这样的话， dnf 的 repolist 就会被更新(下载地址换掉了, 有点像 Ubuntu 的 `source.d` 文件)。

安装 

```
sudo dnf install nodejs -y
```

## NPM 镜像地址

nodejs 需要 npm, 当然也需要国内景象。

```
npm config set registry https://registry.npm.taobao.org
```

## 安装数据库

```
sudo dnf install mysql-server -y 
```

启动 MySQL (mysqld 的 d 代表 demon, 后台运行的东西)

```
sudo systemctl start mysqld 
sudo systemctl status mysqld 
```

开机自动启动

```
sudo systemctl enable mysqld
```

## MySQL 安全配置


```
mysql_secure_installation
```

- 验证密码强度验证组件
- 输入密码强度策略
- 设置 root 的密码
- 移除系统所有匿名用户
- 禁止root用户远程登录
- 删除test数据库
- 是否现在重载权限


如果需要一个随机密码可以生成一个随机字符

```
openssl rand -base64 32
```


### 创建 MySQL 用户

```

create user 'xb2_node_operator'@'%' identified by '密码'; 

create user 'xb2_node_operator'@'localhost' identified by '密码';    

```

- `%` 创建的用户可以在其他地方使用
- `localhost` 仅在本机生效


### 创建数据仓库

创建 数据库 并 允许用户 xb2_node_operaor管理。

```
create database xb2_node; 

grant all privileges on xb2_node.* to 'xb2_node_operator'@'%'; 

```

切换数据库

```
use xb_node; 
```

查看表格

```
show tables; 
```

查看表格形式

```
describe demo; 
```

删除数据

```
drop table demo; 
```

### 云服务器开放3306端口

1. 打开 “网络与安 全”
2. “安全组”
3. “配置规则”
4. 手动添加 新的规则
5. 允许, 优先级1, 自定义TCP, 端口范围3306, 授权对象(自己电脑的IP)



## 反向代理

nginx 更加擅长等待请求，然后反向代理。

```
dnf install nginx -y
```

开机自启动

```
sudo systemctl enable nginx 
sudo systemctl start nginx 
```


### 配置文件

```
vim /etc/nginx/nginx.conf
```

这部分要看视频 https://www.bilibili.com/video/BV1UM4m1m7hU/

真的很复杂，建议多看几次


## 容器

把应用封装起来。

安装docker

```
sudo dnf config-manager --add-repo=https://download.docker.com/linux/centos/docker-ce.repo

sudo dnf repolist 

sudo dnf isntall docker-ce -y 

# 如果有依赖问题就
sudo dnf install docker-ce --nobest -y 
```

重启

```
sudo systemctl start docker
sudo systemctl enable docker
```


## HTTPS证书

let's encrypt SSL证书

先停掉 nginx, 因为在申请证书时会创建一个虚拟服务器，占用80端口。

```bash
sudo systemctl stop nginx 
```

用 docker 运行 certbot 自动申请证书

```bash
sudo docker run -it --rm --name certbot -v "/etc/letsencrypt:/etc/letsencrypt" -v "/var/lib/letsencrypt:/var/lib/letsencrypt" -p 80:80 certbot/certbot certonly 
```

基于 certbot/certbot 的应用里面的 certonly 颁发证书。

注意证书三个月有效。

### Nginx & HTTPS证书


```
server {
    listen 80; 
    server_name xb2-node.ninghao.net; 
    return 301 https://$host$request_uri; 
}

server {
    listen 443 ssl http2; 
    server_name xb2-node.ninghao.net; 

    ssl_certificate /etc/letsencrypt/live/xb2-node.ninghao.net/fullchain.pem; 
    ssl_certificate_key /etc/letsencrypt/live/xb2-node.ninghao.net/privkey.pem; 
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssh-dhparams.pem;

    root /mnt/demo;
}
```

其中 `options-ssl-nginx.conf` 和 `ssh-dhparams.pem` 的生成方法可以看视频。


然后测试 nginx错误(nginx -test)

```
sudo nginx -t 
sudo systemctl reload nginx 
sudo systemctl start nginx 
```


### 反向代理

在宁浩网的 `github.com/ninghao/xb2-nginx/reverse-proxy.conf` 可以复制里面的内容。


然后输出一个conf文件。


## 后台运行 nodejs 


如果关掉了 Terminal, 就自动结束nodejs。

安装 pm2 专门在后台运行 nodejs 应用。

```
sudo npm install pm2 --global 
```

先来个小测试

```
cd /mnt/
mkdir node-app && cd node-app 
npm init -y 
npm install express  
touch index.js
```

在 index.js 写入

```js
const express = require('express'); 
const app = epxress(); 

app.get('/', (request, response) => {
    response.send('小白的开发之路');
}); 

app.listen(3000); 
```


执行刚刚的应用


```bash
pm2 start index.js --name node-app 
```



