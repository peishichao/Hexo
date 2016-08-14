---
title: 基于HexoNexT的SEO优化
date: 2016-08-14 15:31:39
categories: 技术分享
tags:
- Hexo
- SEO优化
---

### 前言

本来建站没多久，刚开始接触，一开始使用的是***[MarkdownPad 2](http://markdownpad.com/)***进行博文编写的。谁料就在今天[***hrwhisper***](https://www.hrwhisper.me/)在我的博文下面留言告诉我了[***Typora***](http://www.typora.io/)这个美妙的东西。感觉***Typora***和***markdown***更配哟。

### 正题

建站初期，当然是想让搜索引擎可以尽快的收录我咯。所以我这几天疯狂的发博文，其实就是这个道理:-D。

 聊一聊我最近做的一些SEO优化吧！

- 安装hexo的sitemap网站地图生成插件

```xml
npm install hexo-generator-sitemap --save
npm install hexo-generator-baidu-sitemap --save
```

- 在hexo站点根目录下的`_config.yml`中添加如下代码

  ```xml
  #sitemap网站地址
  sitemap:
  path: sitemap.xml
  ```

  此外，在`hexo`站点的`source`文件夹下创建`robots.txt`添加网络爬虫协议

  参考如下：

  ```
  # hexo robots.txt
  User-agent: *
  Allow: /
  Allow: /archives/

  Disallow: /vendors/
  Disallow: /js/
  Disallow: /css/
  Disallow: /fonts/
  Disallow: /vendors/
  Disallow: /fancybox/

  Sitemap: http://www.steven7.top/sitemap.xml
  Sitemap: http://www.steven7.top/baidusitemap.xml
  ```

  `sitemap`网址请自行替换。

- 添加`nofollow`标签

  `nofollow`标签即告诉搜索引擎不要追踪此网页上的链接，减少垃圾链接分散网站权重。

  所以我们要对非友情链接之外的出站链接添加`nofollow`标签，减少不必要的PR值输出。感兴趣的同学可以通过[chinaz站长工具友情链接检测进行查询](http://link.chinaz.com/)。

  下面以`Hexo NexT`主题为例，进行修改指导

  ```xml
  your-hexo-site\themes\next\layout\_partials\footer.swig

  line 12:add tag(rel="external nofollow")

  {{ __('footer.powered', '<a class="theme-link" href="http://hexo.io" rel="external nofollow">Hexo</a>') }}

  line 17:add tag(rel="external nofollow")

  <a class="theme-link" href="https://github.com/iissnan/hexo-theme-next" rel="external nofollow">
  --------------------------------------------------------------------------------------------
  your-hexo-site\themes\next\layout\_macro\sidebar.swig

  line 75:add tag(rel="external nofollow")

  <a href="{{ link }}" target="_blank" title="{{ name }}" rel="external nofollow">

  line 89:add tag(rel="external nofollow")

   <a href="https://creativecommons.org/{% if theme.creative_commons === 'zero' %}publicdomain/zero/1.0{% else %}licenses/{{ theme.creative_commons }}/4.0{% endif %}/" class="cc-opacity" target="_blank" rel="external nofollow">
  ```

- `title`优化

  ```xml
  your-hexo-site\themes\next\layout\index.swig

  line 5:add tag({{ theme.keywords }} {{ config.title }})

  {% block title %} {{ theme.keywords }} {{ config.title }} - {{ theme.description }} {% endblock %}
  ```
  提示：

  <u>整个标题不要超过80字符，不要堆砌关键字</u>

- 提交网站

  [百度入口](http://www.soshoulu.com/sousuotijiao/baidu/tijiao/)

  [360入口](http://info.so.360.cn/site_submit.html)

  网站提交成功之后，可以通过各站长平台进行站点管理。

- `NexT`主题内置的`SEO`优化工具

  ```xml
  your-hexo-site\themes\next\_config.yml

  line 22:
  cannoical: true

  line 333:
  baidu_push: ture
  ```

  `cannoical`标签适用于解决由于网址形式不同内容相同而造成的内容重复问题。

  `baidu_push`标签将`url`自动推送到百度

- 小技巧

  [为Hexo博客的每一篇文章自动追加版权信息](http://kuangqi.me/tricks/append-a-copyright-info-after-every-post/)

  简要概括如下：

  `your-hexo-site\scripts`中创建`AddDeclare.js`脚本文件（文件名随意）

  ```xml
  AddDeclare.js：
  var fs = require('fs');
  hexo.extend.filter.register('before_post_render', function(data){
      if(data.copyright == false) return data;
      var file_content = fs.readFileSync('tail.md');
      if(file_content && data.content.length > 50) 
      {
          data.content += file_content;
          var permalink = '\n本文永久链接：' + data.permalink;
          data.content += permalink;
      }
      return data;
  });

  ```

  `tail.md`为脚本信息文件，请诸君自己编写，将`tail.md`置于`Hexo`根目录下。

  ```
  tail.md:

  版权声明

  Steven`s Notes by Steven is licensed under a Creative Commons BY-NC-ND 4.0 International License.  

  由裴士超创作并维护的斯蒂芬博客采用创作共用保留署名-非商业-禁止演绎4.0国际许可证。

  本文首发于Steven`s Notes博客（ http://www.steven7.top ），版权所有，侵权必究。

  ```

最后聊一聊使用`Typora`的小感受吧：

感觉的确是要比`MarkdownPad`方便很多，但是还是有一些不足吧！

1. 每次编辑完代码之后，总是很难切换到下一行==这一点是让我最头痛的/(ㄒoㄒ)/~~最能先切换到源码模式再切换回来。

2. 每次使用完`list`工具之后，鼠标无法退出`list`模式，同样要进入源码模式切换/(ㄒoㄒ)/~~

3. 的确是炒鸡方便有木有，比`Markdownpad`的实时预览好很多==推荐大家使用:-D

   ​
