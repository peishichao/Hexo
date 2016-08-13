---
title: Hexo的奇淫技巧第二发：自动备份Hexo博客源文件
date: 2016-08-13 21:27:34
tags:
- Hexo
- 自动备份
- github
---
## 前言 ##
最近开始写博文的原因其实就是因为无聊..
写着写着感觉用Hexo写博文是一种享受~\(≧▽≦)/~啦啦啦。写多了就想万一换了电脑或者电脑硬盘出问题了该咋整/(ㄒoㄒ)/~~
那将会是哭尽长江水都无法挽回啊！！！所以想着要有个备份方案吧。

- 方案一：硬盘上复制一份咯。你是不是傻、硬盘坏了不也就木有了==

- 方案二：U盘咯。懒 pass

- 方案三：网盘吧。需要上传吧。懒 懒 懒 pass

- 方案四：github是个好东西，希望每个人都会用:-D

## 文件托管到github ##

- 新建repository，命名与本地项目文件夹相同（例如：我的为Hexo）

- 进入本地`Hexo`文件夹，执行以下命令创建仓库

    `git init`

- 设置远程仓库地址，并更新

    `git remote add origin https://github.com/peishichao/Hexo.git`

    `git pull origin master`
