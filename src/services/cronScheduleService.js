const cron = require('node-cron');
const logger = require('./logger');

class cronSchedule {
  init (callback) {
    cron.schedule('*/1 * * * *', () => {
      callback();
    })
  }
}

module.exports = new cronSchedule();