# Linux 


## 系统包管理 System Package Manager

CentOS 是 

- yum
- dnf

软件仓库 repository. 


## 系统所有软件仓库

```
dnf repolist
```

可以先搜索需要安装的软件

```bash 
dnf search nodejs
dnf info nodejs
```

安装 

```bash
sudo dnf install nodejs
```

删除(`-y`是yes, 避免额外确认)

```bash 
sudo dnf remove nodejs -y 
```

## 安装 nginx 

```bash
sudo dnf install nginx -y
```

启动 nginx

```bash 
sudo systemctl start nginx 
```

确认状态

```bash
sudo systemctl status nginx 
```

停止服务

```bash
sudo systemctl stop nginx 
```

重载服务

```bash 
sudo systemctl reload nginx 
```

查看系统进程

```bash
ps aux | grep nginx 
```

编辑 nginx 配置文件, 将niginx以用户wanghao身份启动

```bash
sudo vi /etc/nginx/nginx.conf
```

```
user nginx; -> 改成 user wanghao 
```

## 文件与目录权限

三种角色

- 拥有者 Owner
- 用户组 Group 
- 其他人 Other

三种权限

- 读取 r 
- 写入 w
- 执行 x 

其他 
 
- 无权 `-`
- 目录 `d`


目录和文件的权限用10个字符表示

```
- rw- r-- r--
```

- 第一个字符表示**目录**或者**文件** 
  - (目录`d`, 文件`-`)
- Owner
  - `rw-` 读取和写入，不能执行
- Group
  - `r--` 只能读取
- Other 
  - `r--` 只能读取

还可以通过数字表示
- 读取权限是4
- 写入权限是2
- 执行权限是1

如上，`rw-` 是 4+2=6。所以也可以表示为 `644`。


可以查看当前用户的**用户组**: 

```bash
groups
```

也可以查询其他用户的用户组


```bash
groups randoruf
```


新建一个用户组


```
sudo groupadd friends
```

为用户添加一个用户组（`-a` append, `-G` groups）

```
sudo usermod -a -G friends zhangsan
``` 

查看系统里全部用户组(get entries)

```
getent group
```

修改资源的拥有权


```
sudo chown 拥有者:用户组 要修改的东西目录
```

设置用户组有读写权利

```
sudo chmod g=rw 文件名
```



