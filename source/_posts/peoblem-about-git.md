---
title: GitHubHelp-SSH相关问题Error:Permission-denied(publickey)
date: 2016-08-19 15:14:20
categories: 技术分享
tags: 
- GitHub
- SSH
- Permission-denied
---

![](http://i2.buimg.com/567571/b06ebb799f1e90bc.png)

<!-- more -->

#### 前言

我相信很多人都会和我一样，使用`github`的时候，总是会被各种各样的问题所困扰，实在是让人头痛不已啊 ╮(╯_╰)╭

下述内容翻译于`GItHub Help`[官网](https://help.github.com/articles/error-permission-denied-publickey/)，各位看官可以选择自行查看，或选择继续阅读。（下述内容仅适用于`windows`用户，其他用户请转至官网）

#### `SSH`相关问题

##### 错误：权限被拒绝（公钥）-`Error: Permission denied (publickey)`

该错误表示***服务器拒绝连接***，可能的情况有很多种，其中常见的例子说明如下：

- 应该使用管理员权限使用`git`

  `sudo git push`

- 确保您连接到正确的服务器地址

   打字很辛苦，我们众所周知。请耐心书写。无论如何，你都没有办法连接到"`githib.com`"或者“`guthub.com`”的。在某些情况下，企业网络可能因为`DNS`解析记录等造成相关问题。

   为了确保你正在连接正确的`domain`，你可以尝试输入一下内容:

      $ ssh -vT git@github.com
      OpenSSH_5.6p1, OpenSSL 0.9.8r 8 Feb 2011
      debug1: Reading configuration data /Users/you/.ssh/config
      debug1: Reading configuration data /etc/ssh_config
      debug1: Applying options for *
      debug1: Connecting to github.com [192.30.252.131] port 22.

   确保`IP`地址`192.30.252.131`以及端口`22`。除非你使用[`SSH over HTTPS`](https://help.github.com/articles/using-ssh-over-the-https-port/)的方式覆盖了该设置。倘若如此：

   ------

   有时候，防火墙拒绝`SSH`连接。你可以尝试使用`HTTPS`端口连接作为`SSH`连接的`clone`。大多数的防火墙允许这样，但是代理服务器可能会干扰。

   测试是否是`SSH over HTTPS`尝试一下输入：

      $ ssh -T -p 443 git@ssh.github.com
      Hi username! You've successfully authenticated, but GitHub does not
      provide shell access.


   如果测试成功，那太棒了。

   如果你能够通过`SSH`连接到`git@ssh.github.com`通过端口`443`，那么你可以强制所有`GitHub`连接通过该端口和服务器。

   更改`~/.ssh/config`文件：

      Host github.com
        Hostname ssh.github.com
        Port 443

  再次尝试：

      $ ssh -T git@github.com
      Hi username! You've successfully authenticated, but GitHub does not
      provide shell access.


- 总是使用`git`用户	

   任何连接，包括`remote URLs`，必须使用`git`用户，如果你尝试连接到你的`GitHub` 用户名，它将会失败。

      $ ssh -T billy.anyteen@github.com
      Permission denied (publickey).

   如果你的连接失败，并且你正在使用你的`github` 用户名作为`remote URL`，你可以修改`remote URL`去使用`git`用户。

   `git remote set-url`命令可以改变已经存在的远程资源库`URL`。

   `git remote set-url`包括两个参数：

   现有的远程名：`origin/upstream`

   `URL`:`https://github.com/USERNAME/OTHERREPOSITORY.git/git@github.com:USERNAME/OTHERREPOSITORY.git`

   转换`remote URLs`从`SSH`到`HTTPS`：

      $ git remote -v
      origin  git@github.com:USERNAME/REPOSITORY.git (fetch)
      origin  git@github.com:USERNAME/REPOSITORY.git (push)
      $ git remote set-url origin https://github.com/USERNAME/OTHERREPOSITORY.git
      $ git remote -v
      # Verify new remote URL
      origin  https://github.com/USERNAME/OTHERREPOSITORY.git (fetch)
      origin  https://github.com/USERNAME/OTHERREPOSITORY.git (push)

   下一次你使用`git push`等操作时，会被询问到`GitHub`的用户名和密码。		   	

   如果你不想被询问密码，你可以执行以下命令：

      `git config --global credential.helper store`

   转换`remote URLs`从`HTTPS`到`SSH`：


      $ git remote -v
      origin  https://github.com/USERNAME/REPOSITORY.git (fetch)
      origin  https://github.com/USERNAME/REPOSITORY.git (push)
      $ git remote set-url origin git@github.com:USERNAME/OTHERREPOSITORY.git
      $ git remote -v
      # Verify new remote URL
      origin  git@github.com:USERNAME/OTHERREPOSITORY.git (fetch)
      origin  git@github.com:USERNAME/OTHERREPOSITORY.git (push)


- 确保你有密钥

   [`GitHub for Windows`](https://desktop.github.com/)是最好的选择。你可以用于`clone`资源库而不需要密钥。并且它可以使用`GIt Bash`工具。（`github`实力推广一波，不是我的锅啊）

  如果你使用的是`Git Bash`工具，验证如下：

      # start the ssh-agent in the background
      eval "$(ssh-agent -s)"
      Agent pid 59566

​	如果你使用的是`git for windows`工具，验证如下：

      # start the ssh-agent in the background
      eval $(ssh-agent -s)
      Agent pid 59566
​	确保你拥有私钥并且已经加载到`SSH`中，验证如下：(`OpenSSH 6.7 or older`)

      $ ssh-add -l
      2048 a0:dd:42:3c:5a:9d:e4:2a:21:52:4e:78:07:6e:c8:4d /Users/you/.ssh/id_rsa (RSA)

​	`OpenSSH 6.8 or newer`

      $ ssh-add -l -E md5
      2048 MD5:a0:dd:42:3c:5a:9d:e4:2a:21:52:4e:78:07:6e:c8:4d /Users/you/.ssh/id_rsa (RSA)

​	如果没有打印出相关信息，你需要去生成新的`SSH`钥匙。[请戳我](https://help.github.com/articles/generating-an-ssh-key/)

​	检查是否存在已经存在的`SSH`密钥。[戳我](https://help.github.com/articles/checking-for-existing-ssh-keys/)

​	生成`SSH`密钥并添加至`ssh-agent`。 [戳我戳我](https://help.github.com/articles/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent/)

​	添加新的密钥到你的`GitHub`账户。 [戳我戳我戳我](https://help.github.com/articles/adding-a-new-ssh-key-to-your-github-account/)

​	上述情况翻译于`GitHub` 官网翻译文档

#### `Hexo`主题相关问题解答：

`Hexo deploy`相关问题基本都可以从上面找到答案。如果上述方案无法解决，以下方案实在是无奈之举--纯属看各位看官的运气。

`Hexo`主题配置：

	deploy:
	  type: git 
	  repo: git@github.com:peishichao/peishichao.github.io.git
	  #repo: https://github.com/peishichao/peishichao.github.io.git
	  branch: master


#### `hexo deploy`时重复输入用户名密码的问题

将资源库修改为`git@github.com:username/username.repository .git`

#### `hexo deploy`突然执行失败，找不到原因

尝试更改`git`版本，卸载高版本安装低版本

#### `hexo deploy`偶尔失常

请过段时间尝试，我就是一个赤裸裸的例子，`hexo d`一直好好的，突然无法使用，各种报错，查询无数资料，才编写了这边文章，一直熬夜到凌晨2点都没有搞定，结果早晨一觉醒来一起变得那么的美好--:-D

==纠结原因可能是电脑，网络，vpn等各方面不知道的因素--与其纠结不如睡觉(～﹃～)~zZ

学会使用控制变量法找寻问题的关键，重启机器是最无奈也是最好的抉择==