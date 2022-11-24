const nodeCmd = require('node-cmd');
const cron = require('node-cron');
cron.schedule("*/10 * * * * *", function() {
    nodeCmd.run('node storegamesdb', (err, data, stderr) => {console.log(data)});
    console.log("ran");
});
