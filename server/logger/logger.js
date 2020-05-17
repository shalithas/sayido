import 'express-async-errors';
import winston, { transports } from 'winston';
import 'winston-mongodb';

const logger = winston.createLogger({
  transports: [
    new transports.File({
      filename: '../logs/error.log',
      level: 'error',
      format: winston.format.json(),
    }),
    new transports.Http({
      level: 'warn',
      format: winston.format.json(),
    }),
    new transports.Console({
      level: 'info',
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.prettyPrint()
      ),
    }),
  ],
  exceptionHandlers: [
    new transports.File({ filename: '../logs/exceptions.log' }),
    new transports.Console({
      level: 'info',
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.prettyPrint()
      ),
    }),
  ],
});

process.on('unhandledRejection', (ex) => {
  throw ex;
});

logger.exitOnError = false;

export default logger;
