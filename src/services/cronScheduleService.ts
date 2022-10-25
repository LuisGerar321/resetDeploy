import cron from "node-cron";

interface CallbackType {
  (argument?: string | number): void;
}

class ServerMonitoring {
  init(callback: CallbackType, minutes = 1) {
    cron.schedule(`*/${minutes} * * * *`, () => {
      callback();
    });
  }
}

export default new ServerMonitoring();
