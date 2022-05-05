import { createRequire } from 'module';
import winston, { createLogger, transports } from 'winston';
export var _logger = winston.createLogger({
  transports: [new winston.transports.File({
    filename: '/home/zmg/Tinker/wiener/logs/combined.log'
  })]
});
winston.add(new winston.transports.File({
  filename: '/home/zmg/Tinker/wiener/logs/errors.log',
  handleExceptions: true,
  handleRejections: true
}));
export var logger = winston.createLogger({
  transports: [new winston.transports.File({
    filename: '/home/zmg/Tinker/wiener/logs/utility.log'
  })]
});
export var logger2 = winston.createLogger({
  transports: [new winston.transports.File({
    filename: '/home/zmg/Tinker/wiener/logs/text.log'
  })]
});