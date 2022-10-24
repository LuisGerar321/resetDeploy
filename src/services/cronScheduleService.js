const cron = require('node-cron');
const logger = require('./logger');

class ServerMonitoring {
  init (callback, minutes = 1) {
    cron.schedule(`*/${minutes} * * * *`, () => {
      callback();
    })
  }
}

module.exports = new ServerMonitoring();