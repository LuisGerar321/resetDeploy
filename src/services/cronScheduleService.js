const cron = require('node-cron');

class ServerMonitoring {
  init (callback, minutes = 1) {
    cron.schedule(`*/${minutes} * * * *`, () => {
      callback();
    })
  }
}

module.exports = new ServerMonitoring();