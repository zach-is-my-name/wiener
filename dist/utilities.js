#! /usr/bin/env/node
import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import _asyncToGenerator from "@babel/runtime/helpers/asyncToGenerator";
import _regeneratorRuntime from "@babel/runtime/regenerator";
import { _logger } from './devLog/logger.js'; //import {dateSchedule} from './dateSchedule.js'

import fs from 'fs';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat.js';
import duration from 'dayjs/plugin/duration.js';
dayjs.extend(duration);
dayjs.extend(customParseFormat);
import cheerio from 'cheerio';
import axios from 'axios';
import rateLimit from 'axios-rate-limit';
import { applyMarkdown } from './transform/applyMarkdown.js';
var errorCount = 0;
var http = rateLimit(axios.create(), {
  maxRequests: 1,
  perMilliseconds: 2500
});
export function fetchDateFromCurrentNewsletter(_x) {
  return _fetchDateFromCurrentNewsletter.apply(this, arguments);
}

function _fetchDateFromCurrentNewsletter() {
  _fetchDateFromCurrentNewsletter = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(withMonthName) {
    var _yield$http$get, data, date;

    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return http.get('http://weekinethereumnews.com');

          case 2:
            _yield$http$get = _context.sent;
            data = _yield$http$get.data;
            _context.next = 6;
            return getDate(data, withMonthName);

          case 6:
            date = _context.sent;
            return _context.abrupt("return", date);

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _fetchDateFromCurrentNewsletter.apply(this, arguments);
}

export function fetchDateFromHtml(_x2) {
  return _fetchDateFromHtml.apply(this, arguments);
}

function _fetchDateFromHtml() {
  _fetchDateFromHtml = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(htmlNewsletter) {
    var date;
    return _regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return getDate(data);

          case 2:
            date = _context2.sent;
            return _context2.abrupt("return", date);

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _fetchDateFromHtml.apply(this, arguments);
}

function validateInputDate(date) {
  if (typeof date !== 'string') {
    throw new Error("argument must be a string ".concat(date));
    return;
  } else if (dayjs(date, 'M-D-YYYY').isValid() === false) {
    throw new Error("date format invalid ".concat(date));
    return;
  }
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

function getDate(_x3, _x4) {
  return _getDate.apply(this, arguments);
}

function _getDate() {
  _getDate = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3(document, withMonthName) {
    var re, execResult, _execResult, match, monthName, day, year, monthNum;

    return _regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            re = /(Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)\s+(\d{1,2}),\s+(\d{4})/i;
            _context3.prev = 1;
            execResult = re.exec(document);
            _execResult = _slicedToArray(execResult, 4), match = _execResult[0], monthName = _execResult[1], day = _execResult[2], year = _execResult[3];
            monthNum = monthNameToNumber(monthName);

            if (!withMonthName) {
              _context3.next = 9;
              break;
            }

            return _context3.abrupt("return", monthName + '-' + day + '-' + year);

          case 9:
            return _context3.abrupt("return", monthNum + '-' + day + '-' + year);

          case 10:
            _context3.next = 18;
            break;

          case 12:
            _context3.prev = 12;
            _context3.t0 = _context3["catch"](1);
            console.log(_context3.t0);
            errorCount++;

            if (!(errorCount > 5)) {
              _context3.next = 18;
              break;
            }

            throw new Error("error count passed threshold, analize");

          case 18:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[1, 12]]);
  }));
  return _getDate.apply(this, arguments);
}

export function getDateFromNewsletter(_x5) {
  return _getDateFromNewsletter.apply(this, arguments);
}

function _getDateFromNewsletter() {
  _getDateFromNewsletter = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee4(newsletter) {
    var date;
    return _regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            validateInputDate(newsletter);
            _context4.next = 3;
            return getDate(newsletter);

          case 3:
            date = _context4.sent;
            return _context4.abrupt("return", date);

          case 5:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
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