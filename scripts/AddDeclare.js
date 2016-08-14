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