const cron = require('node-cron');
const cronSchedule = require('./services/cronScheduleService');
const logger = require('./services/logger');

function main() {
  cronSchedule.init(async ()=> {
    const isHostConnection = pinLogginServe();
    if(!isHostConnection) {
      await resetKubeCtlDeployment();
    }
    logger.info("This is callback");
  });
};

main();