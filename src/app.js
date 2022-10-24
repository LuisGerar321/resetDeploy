const cron = require('node-cron');
const ServerMonitoring = require('./services/cronScheduleService');
const kubectl = require('./services/kubectlCommandsService');
const logger = require('./services/logger');



async function main() {
  await kubectl.init("../");
  ServerMonitoring.init(async ()=> {
    const isHostConnection = null;
    if(!isHostConnection) {
      logger.info("Serve Lost Connection, reseting back users deployment");
      await kubectl.resetUserDeployment();
    }
  }, 1);
};

main();