# 云服务器

会分配两个IP地址: 

- 公网IP:
  - 远程登录管理服务器
  - 提供服务
- 内网IP:
  - 一般数据库、后端、前端都是分开服务器的，这时候用内网地址更安全，速度更快。


## 备案

针对有网站的域名。（没有域名的网站不需要备案）。

## 配置域名

DNS的A记录

配置完成之后，可以 ping 

## SSH

### 初始设置

这里暂时先写密码登录。

```bash
ssh root@47.111.228.140
```

添加一个用户

```bash
adduser wanghao
```

设置密码 

```bash
passwd wanghao
```

添加到 wheel 组(管理员权限。具体来说,如果用户属于wheel组,那么他们将被授权使用sudo命令来以root权限执行特定的命令。)

```bash
gpasswd -a wanghao wheel
```

查询当前用户组


```bash
groups
```


切换到 wanghao 

```
su wanghao 
```

查看当前用户

```bash
whoami
> wanghao
```

如果使用sudo

```bash 
sudo whoami
> root
```

退出

```
exit
```


### 密钥登录

最好是用 key-pair, 如果是密码登录容易被人**渗透攻击**。

```bash
ssh wanghao@47.111.228.140
```

生成密码

```
ssh-keygen
```

查看生成的密钥

```
ls -la ~/.ssh
```
 
文件

- `id_rsa` 密钥文件
- `id_rsa.pub` 公钥文件


创建一个文件, 把公钥的内容复制进去

```
vi ~/.ssh/authorized_keys
``` 

之后要改变一下密码，不然就 "too open" (好冷的笑话)。

```
chmod 600 ~/.ssh/authorized_keys
```


### 禁止密码登录、禁止root用户


```bash
sudo vi /etc/ssh/sshd_config
```

- 用斜线搜索 `PasswordAuthentication` 改成 `no`
- 用斜线搜索 `PermitRootLogin` 改成 `no`


修改后重载ssh 

```bash
sudo systemctl reload sshd 
```


## 系统盘、其他逻辑盘

我们知道电脑如果外接一个硬盘，就会出现一个新的逻辑盘。

用 Disk free 查看硬盘使用情况

```bash
df -h 
```

分区情况(一个硬盘可能有多个分区)

```bash
sudo fdisk -l
```

如果磁盘还没有分区，可以先分区(具体要看分区是啥，这里`vdb`只是演示)

```bash
sudo fdisk -u /dev/vdb
```

根据指示操作

- 分区类型: 主分区p
- 分区号: 1
- 第一个扇区: 默认值 2048
  - 还记得开发操作系统时的 MBR 吗? 要保留一点信息。
- 结束扇区: 默认值 41943039


查看分区情况

```bash
sudo fdisk -l /dev/vdb
```

分区之后要制造文件系统

```bash
sudo mkfs.ext4 /dev/vdb1
```

挂载分区到 mnt (这样存到 `/mnt` 的东西都存到了 `/dev/vdb1` 上了)。

注意，每次重启服务器都需要重新挂载分区。

```bash
sudo mount /dev/vdb1 /mnt
```

如果想自动挂载硬盘 

```bash
sudo vi /etc/fstab
```

空白地方输入


```
/dev/vdb1 /mnt ext4 defaults 0 0 
```



