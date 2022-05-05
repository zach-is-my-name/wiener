#! /usr/bin/env/node
//import {dateSchedule} from './dateSchedule.js'
import _asyncToGenerator from "@babel/runtime/helpers/asyncToGenerator";
import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import _regeneratorRuntime from "@babel/runtime/regenerator";
import fs from 'fs';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat.js';
import duration from 'dayjs/plugin/duration.js';
dayjs.extend(duration);
dayjs.extend(customParseFormat);
import cheerio from 'cheerio';
import axios from 'axios';
import rateLimit from 'axios-rate-limit';
import { applyMarkdown } from './applyMarkdown.js';
import { convertAndStore, convertAndStoreCurrent } from './convert1.js';
var errorCount = 0;
var http = rateLimit(axios.create(), {
  maxRequests: 1,
  perMilliseconds: 2500
});

function validateInputDate(date) {
  if (typeof date !== 'string') {
    throw new Error("argument must be a string ".concat(date));
    return;
  } else if (dayjs(date, 'M-D-YYYY').isValid() === false) {
    throw new Error("date format invalid ".concat(date));
    return;
  }
}

export function subsequentDate(baseDate, debug) {
  validateInputDate(baseDate);
  var baseDateNewsletter = getNewsletterFromDate(baseDate);
  var re = /\[Next\sPost.*\(https:\/\/weekinethereumnews\.com\/(?:week-in-ethereum-news-)?(jan(?:uary)?|feb(?:ruary)?|mar(?:ch)?|apr(?:il)?|may|jun(?:e)?|jul(?:y)?|aug(?:ust)?|sep(?:tember)?|oct(?:ober)?|nov(?:ember)?|dec(?:ember)?)-(\d{1,2})-(\d{4})/i;

  if (!re.test(baseDateNewsletter)) {
    console.log({
      debug: JSON.stringify(debug)
    });
    console.log({
      baseDate: baseDate,
      basedateNewsletter: baseDateNewsletter.length > 20,
      test: re.test(baseDateNewsletter)
    });
  } //if (!re.test(baseDateNewsletter)) console.log(baseDateNewsletter) 


  var execResult = re.exec(baseDateNewsletter);

  var _execResult = _slicedToArray(execResult, 4),
      match = _execResult[0],
      monthName = _execResult[1],
      date = _execResult[2],
      year = _execResult[3];

  var month = monthNameToNumber(monthName);
  return "".concat(month, "-").concat(date, "-").concat(year);
}
export function getUrlOfNewsletter(markdownNewsletter) {
  validateInputDate(markdownNewsletter);
  var re = /(https\:\/\/weekinethereumnews.com\/(?:week-in-eth(?:ereum)?-news-)?.*\d)/igm; //console.log(re.test(markdownNewsletter))

  var execResult = re.exec(markdownNewsletter);
  return execResult[1];
}
export function getNewsletterFromDate(date) {
  validateInputDate(date);
  var archiveFileNames = fs.readdirSync('./archive/markdownNewsletters/freshTest/');
  var newsletterFileName = archiveFileNames.find(function (element) {
    return element === date;
  });
  archiveFileNames = fs.readdirSync('./archive/markdownNewsletters/freshTest/');
  newsletterFileName = archiveFileNames.find(function (element) {
    return element === date;
  });

  if (newsletterFileName) {
    var newsletter = fs.readFileSync('./archive/markdownNewsletters/freshTest/' + newsletterFileName, {
      encoding: 'utf8',
      flag: 'r'
    });
    return newsletter;
  } else {
    console.log("error");
  }
}
export function fetchNewsletterFromDate(_x, _x2) {
  return _fetchNewsletterFromDate.apply(this, arguments);
}

function _fetchNewsletterFromDate() {
  _fetchNewsletterFromDate = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(date, isCurrent) {
    var dateObj, day, month, year, urls, fetchedNewsletter;
    return _regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            dateObj = dayjs(date);
            validateInputDate(date);
            day = dateObj.format("D");
            month = dateObj.format("MMMM");
            year = dateObj.format("YYYY");
            urls = ["https://weekinethereumnews.com/week-in-ethereum-news-".concat(month, "-").concat(day, "-").concat(year), "https://weekinethereumnews.com/week-in-eth-news-".concat(month, "-").concat(day, "-").concat(year), "https://weekinethereumnews.com/".concat(month, "-").concat(day, "-").concat(year), "https://weekinethereumnews.com/week-in-ethereum-news-".concat(dateObj.format("MMM"), "-").concat(day, "-").concat(year), "https://weekinethereumnews.com/week-in-eth-news-".concat(dateObj.format("MMM"), "-").concat(day, "-").concat(year)];
            /*he always uses the month name (long or short)*/

            _context2.next = 8;
            return function () {
              var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(urls) {
                var i, url, _yield$http$get, response;

                return _regeneratorRuntime.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        i = 0;

                      case 1:
                        if (!(i < urls.length)) {
                          _context.next = 23;
                          break;
                        }

                        url = urls[i];
                        _context.prev = 3;
                        _context.next = 6;
                        return http.get(url);

                      case 6:
                        _yield$http$get = _context.sent;
                        response = _yield$http$get.data;
                        if (response) console.log("Success:", url);
                        _context.next = 11;
                        return response;

                      case 11:
                        return _context.abrupt("return", _context.sent);

                      case 14:
                        _context.prev = 14;
                        _context.t0 = _context["catch"](3);
                        //if (errorCount > 5) throw new Error(`error count passed threshold, analize`)
                        console.log('url' + ' Fail');
                        return _context.abrupt("continue", 1);

                      case 18:
                        _context.prev = 18;
                        i++;
                        return _context.finish(18);

                      case 21:
                        _context.next = 1;
                        break;

                      case 23:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee, null, [[3, 14, 18, 21]]);
              }));

              return function (_x6) {
                return _ref.apply(this, arguments);
              };
            }()(urls);

          case 8:
            fetchedNewsletter = _context2.sent;

            if (!isCurrent) {
              _context2.next = 21;
              break;
            }

            if (!(fetchedNewsletter && typeof fetchedNewsletter === 'string')) {
              _context2.next = 18;
              break;
            }

            _context2.next = 13;
            return convertAndStore(fetchedNewsletter);

          case 13:
            _context2.t0 = _context2.sent;

            if (!_context2.t0) {
              _context2.next = 16;
              break;
            }

            console.log("should write newsletter");

          case 16:
            _context2.next = 19;
            break;

          case 18:
            console.log("no write");

          case 19:
            _context2.next = 30;
            break;

          case 21:
            if (!(fetchedNewsletter && typeof fetchedNewsletter === 'string')) {
              _context2.next = 29;
              break;
            }

            _context2.next = 24;
            return convertAndStoreCurrent(fetchedNewsletter);

          case 24:
            _context2.t1 = _context2.sent;

            if (!_context2.t1) {
              _context2.next = 27;
              break;
            }

            console.log("should write newsletter");

          case 27:
            _context2.next = 30;
            break;

          case 29:
            console.log("no write");

          case 30:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _fetchNewsletterFromDate.apply(this, arguments);
}

export function fetchDateFromCurrentNewsletter() {
  return _fetchDateFromCurrentNewsletter.apply(this, arguments);
}

function _fetchDateFromCurrentNewsletter() {
  _fetchDateFromCurrentNewsletter = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3() {
    var _yield$http$get2, data, date;

    return _regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return http.get('http://weekinethereumnews.com');

          case 2:
            _yield$http$get2 = _context3.sent;
            data = _yield$http$get2.data;
            _context3.next = 6;
            return getDate(data);

          case 6:
            date = _context3.sent;
            return _context3.abrupt("return", date);

          case 8:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _fetchDateFromCurrentNewsletter.apply(this, arguments);
}

export function fetchPreceedingDateOfCurrentNewsletter(_x3) {
  return _fetchPreceedingDateOfCurrentNewsletter.apply(this, arguments);
}

function _fetchPreceedingDateOfCurrentNewsletter() {
  _fetchPreceedingDateOfCurrentNewsletter = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee4(currentNewsletterDate) {
    var _yield$http$get3, data, date;

    return _regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return http.get('http://weekinethereumnews.com/page/2/');

          case 2:
            _yield$http$get3 = _context4.sent;
            data = _yield$http$get3.data;
            _context4.next = 6;
            return getDate(data);

          case 6:
            date = _context4.sent;
            return _context4.abrupt("return", date);

          case 8:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _fetchPreceedingDateOfCurrentNewsletter.apply(this, arguments);
}

function getDate(_x4) {
  return _getDate.apply(this, arguments);
}

function _getDate() {
  _getDate = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee5(document) {
    var re, execResult, _execResult2, match, monthName, day, year, monthNum;

    return _regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            re = /(Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)\s+(\d{1,2}),\s+(\d{4})/i;
            _context5.prev = 1;
            execResult = re.exec(document);
            _execResult2 = _slicedToArray(execResult, 4), match = _execResult2[0], monthName = _execResult2[1], day = _execResult2[2], year = _execResult2[3];
            monthNum = monthNameToNumber(monthName);
            return _context5.abrupt("return", monthNum + '-' + day + '-' + year);

          case 8:
            _context5.prev = 8;
            _context5.t0 = _context5["catch"](1);
            console.log(_context5.t0);
            errorCount++;

            if (!(errorCount > 5)) {
              _context5.next = 14;
              break;
            }

            throw new Error("error count passed threshold, analize");

          case 14:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[1, 8]]);
  }));
  return _getDate.apply(this, arguments);
}

export function getDateFromNewsletter(_x5) {
  return _getDateFromNewsletter.apply(this, arguments);
}

function _getDateFromNewsletter() {
  _getDateFromNewsletter = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee6(newsletter) {
    var date;
    return _regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            validateInputDate(newsletter);
            _context6.next = 3;
            return getDate(newsletter);

          case 3:
            date = _context6.sent;
            return _context6.abrupt("return", date);

          case 5:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));
  return _getDateFromNewsletter.apply(this, arguments);
}

function monthNameToNumber(monthName) {
  if (typeof monthName === 'number') {
    return monthName;
  }

  switch (monthName) {
    case "January":
    case "january":
    case "Jan":
    case "jan":
      return "1";
      break;

    case "February":
    case "february":
    case "Feb":
    case "feb":
      return "2";
      break;

    case "March":
    case "march":
    case "Mar":
    case "mar":
      return "3";
      break;

    case "April":
    case "april":
    case "Apr":
    case "apr":
      return "4";
      break;

    case "May":
    case "may":
    case "may":
      return "5";
      break;

    case "June":
    case "june":
    case "Jun":
    case "jun":
      return "6";
      break;

    case "July":
    case "july":
    case "Jul":
    case "jul":
      return "7";
      break;

    case "August":
    case "august":
    case "Aug":
    case "aug":
      return "8";
      break;

    case "September":
    case "september":
    case "Sept":
    case "sept":
      return "9";
      break;

    case "October":
    case "october":
    case "Oct":
    case "oct":
      return "10";
      break;

    case "November":
    case "november":
    case "Nov":
    case "nov":
      return "11";
      break;

    case "December":
    case "december":
    case "Dec":
    case "dec":
      return "12";
      break;
  }
}

process.on('unhandledRejection', function (error) {
  // Will print "unhandledRejection err is not defined"
  console.log('unhandledRejection', error);
});