var exe = require('child_process');
hexo.on('new', function(data){
    console.log(data);
    exe.execFile('C:/Program Files (x86)/Typora/Typora.exe',[data.path]);
});