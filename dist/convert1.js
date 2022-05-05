import _asyncToGenerator from "@babel/runtime/helpers/asyncToGenerator";
import _regeneratorRuntime from "@babel/runtime/regenerator";
import { addNewsletterToDb } from './db/db.js';
import { applyMarkdown } from './applyMarkdown.js';
import { getDateFromNewsletter } from './utilities.js';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat.js';
dayjs.extend(customParseFormat);
import chalk from 'chalk';
import fs from 'fs';
export function convertAndStoreAll() {
  return _convertAndStoreAll.apply(this, arguments);
}

function _convertAndStoreAll() {
  _convertAndStoreAll = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
    var htmlNewsletterFileNames, i, data, markdownNewsletter, date;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            htmlNewsletterFileNames = fs.readdirSync('/home/zmg/Tinker/wiener/archive/htmlNewsletters');
            i = 0;

          case 2:
            if (!(i < htmlNewsletterFileNames.length)) {
              _context.next = 14;
              break;
            }

            data = fs.readFileSync('/home/zmg/Tinker/wiener/archive/htmlNewsletters/' + htmlNewsletterFileNames[i], {
              encoding: 'utf8',
              flag: 'r'
            });
            _context.next = 6;
            return applyMarkdown(data);

          case 6:
            markdownNewsletter = _context.sent;
            date = getDateFromNewsletter(markdownNewsletter);
            console.log('writing ' + date);
            fs.writeFileSync('./markdownNewsletters/freshTest' + date, markdownNewsletter);
            addNewsletterToDb(date, markdownNewsletter);

          case 11:
            i++;
            _context.next = 2;
            break;

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _convertAndStoreAll.apply(this, arguments);
}

function writeFile(_x, _x2, _x3) {
  return _writeFile.apply(this, arguments);
}

function _writeFile() {
  _writeFile = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(date, markdownNewsletter, isCurrent) {
    var filename, _filename;

    return _regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (!isCurrent) {
              filename = './archive/markdownNewsletters/freshTest/' + date;
              fs.writeFile(filename, markdownNewsletter, {
                flag: "wx"
              }, function (err) {
                if (err) {
                  console.log("file " + filename + " already exists, testing next"); //filename = filename + "0";
                  //writeFile();
                } else {
                  console.log("Succesfully written " + filename);
                }
              });
            } else {
              _filename = './archive/markdownNewsletters/freshTest/currentNewsletters/' + date;
              fs.writeFile(_filename, markdownNewsletter, {
                flag: "wx"
              }, function (err) {
                if (err) {
                  console.log("file " + _filename + " already exists, testing next"); //filename = filename + "0";
                  //writeFile();
                } else {
                  console.log("Succesfully written " + _filename);
                }
              });
            }

          case 1:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _writeFile.apply(this, arguments);
}

export function convertAndStore(_x4) {
  return _convertAndStore.apply(this, arguments);
}

function _convertAndStore() {
  _convertAndStore = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3(newsletter) {
    var markdownNewsletter, date;
    return _regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return applyMarkdown(newsletter);

          case 2:
            markdownNewsletter = _context3.sent;
            _context3.next = 5;
            return getDateFromNewsletter(markdownNewsletter);

          case 5:
            date = _context3.sent;

            if (dayjs(date, 'M-D-YYYY').isValid() === true) {
              //fs.writeFileSync('./archive/markdownNewsletters/freshTest/'+ date, markdownNewsletter)
              writeFile(date, markdownNewsletter, false); //console.log(chalk.green('written %s'), date)
              //addNewsletterToDb(date, markdownNewsletter) 
            } else {
              console.log("invalid date format", markdownNewsletter);
            }

          case 7:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _convertAndStore.apply(this, arguments);
}

export function convertAndStoreCurrent(_x5) {
  return _convertAndStoreCurrent.apply(this, arguments);
}

function _convertAndStoreCurrent() {
  _convertAndStoreCurrent = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee4(newsletter) {
    var markdownNewsletter, date;
    return _regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            console.trace();
            _context4.next = 3;
            return applyMarkdown(newsletter);

          case 3:
            markdownNewsletter = _context4.sent;
            _context4.next = 6;
            return getDateFromNewsletter(markdownNewsletter);

          case 6:
            date = _context4.sent;
            //fs.writeFileSync('./archive/markdownNewsletters/freshTest/'+ date, markdownNewsletter)
            writeFile(date, markdownNewsletter, true); //console.log(chalk.green('written %s'), date)
            //addNewsletterToDb(date, markdownNewsletter) 

          case 8:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _convertAndStoreCurrent.apply(this, arguments);
}