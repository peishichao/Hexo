---
title: Hexo博客页面留白太多,代码看起来不方便
date: 2016-08-15 08:02:15
categories: 技术分享
tags:
- 页面留白
- Hexo
---

其实关于浏览器留白这个问题，每个人都有没个人的看法，有人感觉这块多了，那块少了..很难迎合大众。

关于设置浏览器留白这一部分，[Hexo NexT主题官方文档](http://theme-next.iissnan.com/faqs.html)给出以下解决方案：

![](http://i2.piimg.com/567571/e4a3d80261be3ae4.png)

但是该方法不适用于`Pisces`这不就尴尬了../(ㄒoㄒ)/~~

本来用适用`pisces`不就是为了美观嘛---

然后我就顺藤摸瓜，找到了上面所提到的`Issue`

里面刷刷刷列出了很多解决方法：

![](http://i2.piimg.com/567571/9c0b05e12200d525.png)

好了，重点来了，最关键的被窝发现咯：

对于 `Pisces Scheme`，需要同时修改 `header` 的宽度、`.main-inner` 的宽度以及 `.content-wrap` 的宽度。例如，使用百分比（`Pisces` 的布局定义在 `source/css/_schemes/Picses/_layout.styl` 中）：

```
header{ width: 90%; }
.container .main-inner { width: 90%; }
.content-wrap { width: calc(100% - 260px); }
```

`iissnan`表示：

------

我并未对这个布局进行测试，自定义修改需要自己进行测试。另外，我觉得超过一定宽度后（一行内文字太多导致换行跨度太大），阅读体验都不怎么样。

------

博主，自己设置的是`60%`的百分比，自我感觉观感体验最好:-D

当然，什么是最好，自己感受才知道不是嘛@-@

各位看官就自行调整吧==

我去吃早饭了︿(￣︶￣)︿