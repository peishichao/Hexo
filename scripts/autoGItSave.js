var exe = require('child_process');
function run() {
       if(exe.execFile('D:/Hexo/GitUpdate.bat').code == 0){
        console.log("恭喜你更新GIthub成功");
       }
        }
     hexo.on('deployAfter', function() {
        run();
});