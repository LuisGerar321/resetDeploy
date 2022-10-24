const cron = require('node-cron');
const cronSchedule = require('./services/cronScheduleService');
const kubectl = require('./services/kubectlCommandsService');
const logger = require('./services/logger');



async function main() {
  await kubectl.init("../");
  // cronSchedule.init(async ()=> {
    const isHostConnection = null;
    if(!isHostConnection) {
      await kubectl.resetUserDeployment();
    }
    logger.info("This is callback");
  // });
};

main();