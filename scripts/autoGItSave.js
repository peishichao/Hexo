var exe = require('child_process');
function run() {
       exe.execFile('D:/Hexo/GitUpdate.bat');
        }
     hexo.on('deployAfter', function() {
        run();
});