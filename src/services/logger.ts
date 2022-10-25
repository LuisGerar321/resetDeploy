import { createLogger, transports, format } from 'winston';
import { green } from 'chalk';

const customFormat = format.printf(({ level, message, timestamp }) => {
  return green(`${timestamp} ${level}: ${message}`);
});

const logger = createLogger({
  level: 'info',
  format: format.combine(
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

export default logger;