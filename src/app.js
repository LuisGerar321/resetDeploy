import ServerMonitoring from './services/cronScheduleService';
import kubectl from './services/kubectlCommandsService';
import logger from './services/logger';

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