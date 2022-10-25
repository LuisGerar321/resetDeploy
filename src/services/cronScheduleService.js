import cron from "node-cron";

class cronSchedule {
  init(callback) {
    cron.schedule("*/1 * * * *", () => {
      callback();
    });
  }
}

export default new cronSchedule();
