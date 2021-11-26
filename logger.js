import winston, {createLogger, transports}  from 'winston';
const _logger = winston.createLogger({
    transports: [
          new winston.transports.File({ filename: '/home/zmg/Tinker/wiener/logs/combined.log' })]
});
export {_logger}
