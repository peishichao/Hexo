---
layout: '[psot]'
title: 谈谈Hexo搭建的个人博客
categories: 技术分享
date: 2016-08-12 21:20:02
tags:
- Hexo 
- NexT
- 搭建博客
- github
---
大学毕业之后回家断断续续将近2个月的时间了==本打算在家里把驾照考完，可是谁料到人实在是太多了！！导致现在还木有考科目四。马上就要开学了/(ㄒoㄒ)/~~。就在前天随意逛着逛着翻到了[iissnan](http://notes.iissnan.com/)的博客。感觉自己一直就想要这样一个简洁的博客。所以看了他的博客之后，当机立断就去买域名去了。
## 挑选域名
当然购买域名有很多的途径。我以前也木有听说过百度开放云。不知道我怎么就点进百度开放云里面去买域名去了。现在怎么想也回想不起来为啥（简直Ridiculous）。![](http://i4.piimg.com/567571/370154642b07446e.png)
大致域名注册都跟这个页面长得差不多。我选择百度的原因还有可能就是他长得好看呗。然后输入自己想注册的网址然后付款就可以了。百度最近在做活动。我注册了.top的顶级域名才花了4块大洋。这一点一定是这一点我选择了它（便宜是王道）。然后这个域名就是属于你的了。然后就会有属于你的控制台来管理该域名。![](http://i2.piimg.com/567571/2ff1a4b90e570b2e.png)
进入域名服务可以对域名进行管理，对域名进行解析、续费等操作。
![](http://i2.piimg.com/567571/7ab560ad26f26a3a.png)
的确现在有了属于自己的域名，然而我们还需要有自己的博客不是吗、意识到这个问题我们才要开始我们的正事:-D
## 使用[hexo](https://hexo.io/zh-cn/)搭建我们的博客
hexo是一种快速、简洁且高效的博客框架。使用node.js技术可以让上百个页面在几秒内瞬间完成渲染。等等。。（都是抄的，原谅我手懒==）
### 安装Hexo
温馨提示：下面的操作仅针对windows用户，其他用户请参照官网。
安装[Node.js](https://nodejs.org/en/)、[GIt](https://git-scm.com/).

安装上述程序之后，执行以下代码完成hexo安装。

    npm install -g hexo-cli

安装Hexo完成之后，在指定的文件夹内初始化Hexo。

    cd folder
	hexo init
	npm install

其实到此为止，你已经初步拥有了一个自己简洁（说实话是简陋）的博客了。想了解关于框架详细内容的请转至hexo官网了解详情。作为我们高端审美来说，这么丑的博客当然是不可以了...hexo提供多种主题可供选择。我选择的是NexT。接下来我就以NexT来说。

### 安装[NexT](http://theme-next.iissnan.com/getting-started.html)
官网提供了两种方式下载NexT。一种是git clone，另一种是下载压缩包。本文选择git clone的方式。

    cd your-hexo-site
    git clone https://github.com/iissnan/hexo-theme-next themes/next

#### 启用主题
打开Hexo位于站点根目录下的_config.yml文件，找到theme字段，并将其值更改为next。

    theme：next
这样，HexT主题安装成功。验证主题是否正确之前，最好使用hexo clean来清除hexo的缓存。
#### 验证主题 ####
生成静态文件，启动服务器并开启调试模式进行监控

    hexo generate
	hexo s --debug
在服务启动的过程中，注意观察命令行是否有异常信息。当命令行输出中提示
> INFO  Hexo is running at http://0.0.0.0:4000/. Press Ctrl+C to stop.

此时即可使用浏览器访问http://localhost:4000，检查站点是否正常运行。




 当你看到站点的外观与下面所示类似时说明你已经成功按照NexT主题。

![](http://theme-next.iissnan.com/uploads/five-minutes-setup/validation-default-scheme-mac.png)

主题设定等请参照官网文档进行个性化设置。

### 部署配置
我们已经完成了Hexo个性化配置中的基本信息和主题配置，还剩一项部署 - deploy。

    hexo deploy

通过上述命令可以将你的hexo博客提交到github上，从而刷新你的github page。

换句话说，如果执行了new、clean、generate,只是在你的电脑上生成了最新的博客，如果不执行deploy，新添加的内容是不会被推送到GitHub Pages上的。

既然我们已经决定将Hexo部署到GitHub，那么我们还是先看看需要在GitHub上做哪些前置准备。
### 连接到GitHub

如果还没有GItHub账号，在[这里](https://github.com/join)申请一个

如果拥有了账号，还没有GItHub Pages地址，在页面右上角你的头像旁边点击 + 号按钮，选择repository。在Repository name中填写
> [你的用户名].github.io

**注意，你的用户名必须与你实际的用户名一字不差。**

然后选Public。

去掉 Initialize this repository with a README 前的钩。

然后点击 Create repository。

成功后，就可以通过 http://[你的用户名].github.io 访问你的页面了。

也许它现在还空无一物，接下来我们就把Hexo的内容放进去。
### 配置Deploy ###
当你拥有了个人的GitHub Pages后，再回到Hexo的_config.yml文件，找到Deployment章节。

将type改为git，repository改为你的GitHub Pages地址。

然后执行下述代码就可以发布自己的博客了。

    hexo deploy

比如我的博客，地址应该是：

> http://peishichao.github.io

恭喜！！你已经使用Hexo完成了个人博客的搭建并将它发布在GitHub Pages可供公开访问啦！

### 日常维护 ###
当部署成功后，我们日常只需要：

新建文章(new)

找到生成的.md然后编辑并保存

生成博客(generate)

部署(deploy)

就可以完成新文章的发布。

### 将GitHub关联到域名上 ###

上面我们已经申请过域名了，我们接下来要做的就是讲自己申请过的域名与github page关联。
登录访问github
> 进入github中github page相应的项目中，在该项目中创建CNAME，其CNAME内容即是域名。

查询github page的服务器IP地址
> 可以使用国内的域名ip地址查询的[工具](http://ip.chinaz.com/),将你自己的github page的域名输进去得到ip地址。


![](http://i1.piimg.com/567571/49c21bc128e4ff90.png)
然后进入你购买的域名的域名服务中进行域名解析，点击域名解析，依次填写相应内容。

> 记录类型-A

> 主机记录-www

> 解析线路 默认

> 记录值填写github page的ip地址

最后点击保存。
验证域名和github page关联是否成功。
![](http://i1.piimg.com/567571/ad889e53a23882ee.png)
![](http://i1.piimg.com/567571/7714d0350e403d6e.png)

夜深了，洗洗睡，回头再念叨。