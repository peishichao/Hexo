var exe = require('child_process');
function run() {
        console.log("恭喜同步成功");
        exe.exec('git add --all');
        exe.exec('git commit -am "Form auto backup script\'s commit"');
        exe.exec('git push origin master');
        console.log("恭喜同步成功");
        }
     hexo.on('deployAfter', function() {
        run();
});