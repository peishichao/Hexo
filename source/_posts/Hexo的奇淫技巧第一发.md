---
title: Hexo的奇淫技巧第一发：添加文章时自动打开编辑器
date: 2016-08-13 11:49:17
categories: 技术分享
tags:
- Hexo
- 技巧
---
## 前言 ##
扯一扯，本来今天心想写一下感悟啥的，谁知道小件小事耽误了整个上午的青春、、简直要哭瞎有木有、、
<img src= "http://i1.piimg.com/567571/abe13cbe996fb11a.png" width="200" heght="200" class="img-center"/>
下面就来说一说心痛的事情，让各位看官笑一笑:-D
## 就想偷偷懒自动打开而已 ##
刚刚拥有属于自己的小站，当然炒鸡炒鸡鸡冻。所以想着多写点文章啥的。写的多了，想着可不可以在Hexo new 文章的时候使用markdownPad自动打开刚添加的文章那。。这样粑粑就可以少做几件事情了，就可以那剩下来的时间玩耍了（LOL啊。炉石啊。啊  我的大海啊）。本来想法很好，也很切合实际咯。我就开始动手了、、谁知道弄了半天都没弄好，最后，打开网易云静了静突发灵感才搞定。。大海啊全是我的泪水。
<img src= "http://i2.piimg.com/567571/5c90f6253a6beb6b.png" class= "img-center" />
下面给各位看官解决方案L

解决方案（使用`hexo new article` 自动打开刚添加的博文）

- 在Hexo目录下新建script目录
- 在script新建js脚本文件
- 脚本内容如下：
    `var exe = require('child_process');`
    `hexo.on('new', function(data){`
    `console.log(data);`
    `exe.execFile('C:/Program Files (x86)/MarkdownPad 2/MarkdownPad2.exe',[data.path]);`
    `});`
    
保存退出之后使用`hexo new article`命令后就可以用指定的app打开文章了，炒鸡方便。


<iframe frameborder="no" border="0" marginwidth="0" marginheight="0" width=330 height=86 src="http://music.163.com/outchain/player?type=2&id=16858400&auto=1&height=66"></iframe>


最后给大家分享一首自己很喜欢的歌、虽然是单身狗但是炒鸡想学会了唱给自己的女朋友听...


