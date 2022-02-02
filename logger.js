import { createRequire } from 'module';
const require = createRequire(import.meta.url);

import pkg  from 'winston';
import winston from 'winston'
const { createLogger, transports} = pkg
const _logger = winston.createLogger({
    transports: [
          new winston.transports.File({ filename: '/home/zmg/Tinker/wiener/logs/combined.log' })]
});
export {_logger}
