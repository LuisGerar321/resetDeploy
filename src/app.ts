import ServerMonitoring from "./services/cronScheduleService";
import kubectl from "./services/kubectlCommandsService";
import logger from "./services/logger";
import { checkZaamnaServerStatus } from "./services/checkZaamnaServerStatus";

async function main() {
  await kubectl.init();

  ServerMonitoring.init(async () => {
    const isZaamnaServiceUp = await checkZaamnaServerStatus();

    if (!isZaamnaServiceUp) {
      logger.error("Server connection lost... Resetting back users deployment");
      await kubectl.resetUserDeployment();
      logger.info("Users deployment resetting completed");
    }
  }, 1);
}

main();
