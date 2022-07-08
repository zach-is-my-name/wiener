import log4js from "log4js";

log4js.configure({
  appenders: { app: { type: "file", filename: "/home/zmg/Tinker/wiener/logs/app.log" } },
  categories: { default: { appenders: ["app"], level: "error" } },
});

export const logger = log4js.getLogger();


import { createRequire } from 'module';
import winston, {format, createLogger, transports}  from 'winston';








export const logger2 = winston.createLogger({
  transports: [
    new winston.transports.File({ filename: '/home/zmg/Tinker/wiener/logs/text.log' })]
});


winston.add(new winston.transports.File({
  filename: '/home/zmg/Tinker/wiener/logs/errors.log',
  handleExceptions: true,
  handleRejections: true,
}));

// const prettyJson = format.printf(info => {
//   if (info.message.constructor === Object) {
//     info.message = JSON.stringify(info.message, null, 4)
//   }
//   return `${info.level}: ${info.message}`
// })

export const _logger = winston.createLogger({
  transports: [
    new winston.transports.File({ filename: '/home/zmg/Tinker/wiener/logs/combined.log' })
  ]
});


let _logger_info_old = _logger.info;

_logger.info = function(msg) {
  var fileAndLine = traceCaller(1);
  return _logger_info_old.call(this, fileAndLine + ":" + msg);
}

// let logger2_info_old = logger2.info;
// logger2.info = function(msg) {
//   var fileAndLine = traceCaller(1);
//   return logger2_info_old.call(this, fileAndLine + ":" + msg);
// }
/**
 * examines the call stack and returns a string indicating 
 * the file and line number of the n'th previous ancestor call.
 * this works in chrome, and should work in nodejs as well.  
 *
 * @param n : int (default: n=1) - the number of calls to trace up the
 *   stack from the current call.  `n=0` gives you your current file/line.
 *  `n=1` gives the file/line that called you.
 */
function traceCaller(n) {
  let b
  if( isNaN(n) || n<0) n=1;
  n+=1;
  var s = (new Error()).stack
    , a=s.indexOf('\n',5);
  while(n--) {
    a=s.indexOf('\n',a+1);
    if( a<0 ) { a=s.lastIndexOf('\n',s.length); break;}
  }
  b=s.indexOf('\n',a+1); if( b<0 ) b=s.length;
  a=Math.max(s.lastIndexOf(' ',b), s.lastIndexOf('/',b));
  b=s.lastIndexOf(':',b);
  s=s.substring(a+1,b);
  return s;
}

const enumerateErrorFormat = format(info => {
  if (info.message instanceof Error) {
    info.message = Object.assign({
      message: info.message.message,
      stack: info.message.stack
    }, info.message);
  }

  if (info instanceof Error) {
    return Object.assign({
      message: info.message,
      stack: info.stack
    }, info);
  }

  return info;
});

export const logger3 = winston.createLogger({
  level: 'debug',
  format: format.combine(
    enumerateErrorFormat(),
    format.json()
  ),
  transports: [
    new winston.transports.File({ filename: '/home/zmg/Tinker/wiener/logs/stackTrace.log' })]
});

