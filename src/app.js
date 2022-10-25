import cronSchedule from "./services/cronScheduleService";
import logger from "./services/logger";

function main() {
  cronSchedule.init(async () => {
    const isHostConnection = pinLogginServe();

    if (!isHostConnection) {
      await resetKubeCtlDeployment();
    }

    logger.info("This is callback");
  });
}

main()
