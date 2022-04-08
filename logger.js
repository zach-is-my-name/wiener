import { createRequire } from 'module';
const require = createRequire(import.meta.url);
import winston, {createLogger, transports}  from 'winston';

import pkg  from 'winston';
import winston from 'winston'
const { createLogger, transports} = pkg
export const _logger = winston.createLogger({
    transports: [
          new winston.transports.File({ filename: '/home/zmg/Tinker/wiener/logs/combined.log' })]
});


winston.add(new winston.transports.File({
  filename: '/home/zmg/Tinker/wiener/logs/errors.log',
  handleExceptions: true,
  handleRejections: true,
}));
 
export const logger = winston.createLogger({
  transports: [
    new winston.transports.File({ filename: '/home/zmg/Tinker/wiener/logs/utility.log' })
  ]
});

export const logger2 = winston.createLogger({
  transports: [
    new winston.transports.File({ filename: '/home/zmg/Tinker/wiener/logs/text.log' })
  ]
});





