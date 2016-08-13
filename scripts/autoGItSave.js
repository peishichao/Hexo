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