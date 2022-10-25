import { schedule } from 'node-cron';

class ServerMonitoring {
  init (callback, minutes = 1) {
    schedule(`*/${minutes} * * * *`, () => {
      callback();
    });
  }
}

export default new ServerMonitoring();
