var exe = require('child_process');
hexo.on('new', function(data){
    console.log(data);
    exe.execFile('C:/Program Files (x86)/MarkdownPad 2/MarkdownPad2.exe',[data.path]);
});