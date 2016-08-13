---
title: Hexo的奇淫技巧第二发：自动备份Hexo博客源文件
date: 2016-08-13 21:27:34
categories: 技术分享
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

- 设置远程仓库地址

    `git remote add origin https://github.com/peishichao/Hexo.git`

如果报错：`fatal: remote origin already exists.`

解决办法如下：`git remote rm origin`

- Hexo源码提交

		git add .
			
		git commit -m "添加hexo源码文件作为备份"
			
		git push origin master

如果报错：`Permission denied (publickey).`

解决方法如下：

	ssh-agent

    ssh-add ~/.ssh/id_key

如果报错	`error:failed to push som refs to .......`

解决方式如下：

	git pull origin master
	git push origin master

- 完成

经过上面的操作之后，本地的Hexo源码就已经上传到github服务器上进行备份了，就再也不用担心代码丢失找不到了(*^__^*) 嘻嘻……

当远程仓库有更新的时候，执行下面代码就可将hexo源码放到本地了。

	git pull origin master
### 实现自动化操作 ###

我说过我很懒..上面的操作远远不能达到我的心里预期，所以我还要实现自动化操作才可以咯。

[Hexo的奇淫技巧第一发](http://www.steven7.top/2016/08/13/Hexo%E7%9A%84%E5%A5%87%E6%B7%AB%E6%8A%80%E5%B7%A7%E7%AC%AC%E4%B8%80%E5%8F%91/#more)中我们已经提到了怎么在`Hexo`添加文章时自动打开编辑器了。原理是利用`nodeJs`的事件监听机制来实现监听Hexo的new事件来启动编辑器，完成自动启动编辑器的操作。

那么可不可以通过通过监听Hexo的其它事件来完成自动执行Git命令完成自动备份呢？通过查阅Hexo文档，找到了Hexo的主要事件，见下表：

| 事件名|    事件发生时间| 
| :-------- | --------:| 
| deployBefore| 在部署完成前发布| 
| deployAfter|   在部署成功后发布 |  
| exit|   在 Hexo 结束前发布 | 
| generateBefore| 在静态文件生成前发布 | 
| generateAfter|   在静态文件生成后发布 |  
| new|    在文章文件建立后发布 | 

所以我们就可以通过监听Hexo的deployAfter事件，待上传完成之后自动运行Git备份命令打到自动备份的目的。

要实现这个自动备份功能，需要依赖`NodeJs`的一个`shelljs`模块,该模块重新包装了`child_process`,调用系统命令更加的方便。该模块需要安装后使用。

	npm install --save shelljs

操作步骤：

1. 编写脚本，在`Hexo`根目录下的`scripts`（如果没有请新建）创建autoGItSave.js文件,文件名随意。
2. 脚本内容如下：


				var exe = require('child_process');
		function run() {
		        console.log("开始上传源代码");
		       if(exe.execFile('D:/Hexo/GitUpdate.bat').code !== 0){
		        console.log("恭喜你更新Github成功");
		       }
		       if(exe.execFile('D:/Hexo/GitUpdate.bat').code == 0){
		        console.log("更新Github失败");
		       }
		        }
		     hexo.on('deployAfter', function() {
		        run();
		});

其中`D:/Hexo/GitUpdate.bat`内容如下：

		git add --all
		git commit -am "Form auto backup script\'s commit"
		git push origin master

请确保`GitUpdate.bat`文件位于Hexo的根目录下。

保存脚本并退出，然后执行`hexo deploy`命令，可以得到如下的类似结果：

	
		[master 4ae3ace] Site updated: 2016-08-14 00:05:25
		 4 files changed, 44 insertions(+), 76 deletions(-)
		Branch master set up to track remote branch master from https://github.com/peishichao/peishichao.github.io.git.
		To https://github.com/peishichao/peishichao.github.io.git
		   d781e56..4ae3ace  HEAD -> master
		INFO  Deploy done: git
		开始上传源代码
		恭喜你更新Github成功


这样子，每次更新博文并`deploy`到服务器上之后，备份就自动启动并完成备份啦~是不是很方便呢？麻麻再也不用担心我们的博文找不到啦:-D

Enjoy it！

have a nice day!!

蟹蟹O(∩_∩)O