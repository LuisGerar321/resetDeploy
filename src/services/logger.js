const { createLogger, transports, format } = require('winston');
const chalk = require('chalk');

const customFormat = format.printf(({ level, message, label, timestamp }) => {
  return chalk.green(`${timestamp} ${level}: ${message}`);
});

const logger = createLogger({
  level: 'info',
  format: format.combine(
    // format.label({ label: 'Message!' }),
    format.timestamp(),
    customFormat
  ),
  transports: [
      new transports.Console(),
      new transports.File({
          maxFiles: 1,
          maxsize: Infinity,
          filename: './loggerFiles/info.log'
      }),
      new transports.File({
        level: 'error',
        maxFiles: 24,
        maxsize: 3000,
        filename: './loggerFiles/error.log'
    }),
  ]
});

module.exports = logger;