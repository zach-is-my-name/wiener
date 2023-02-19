import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import _asyncToGenerator from "@babel/runtime/helpers/asyncToGenerator";
import _regeneratorRuntime from "@babel/runtime/regenerator";
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat.js';
import duration from 'dayjs/plugin/duration.js';
dayjs.extend(duration);
dayjs.extend(customParseFormat);
import cheerio from 'cheerio';
import got from 'got';
import pThrottle from 'p-throttle';
export function fetchDateCurrent() {
  return _fetchDateCurrent.apply(this, arguments);
}
function _fetchDateCurrent() {
  _fetchDateCurrent = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2() {
    var data, _yield$getDate, dateNumberFormat, dateWordFormat;
    return _regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return got('https://weekinethereumnews.com').text();
        case 3:
          data = _context2.sent;
          _context2.next = 9;
          break;
        case 6:
          _context2.prev = 6;
          _context2.t0 = _context2["catch"](0);
          return _context2.abrupt("return");
        case 9:
          _context2.next = 11;
          return getDate(data);
        case 11:
          _yield$getDate = _context2.sent;
          dateNumberFormat = _yield$getDate.dateNumberFormat;
          dateWordFormat = _yield$getDate.dateWordFormat;
          return _context2.abrupt("return", {
            dateNumberFormat: dateNumberFormat,
            dateWordFormat: dateWordFormat
          });
        case 15:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 6]]);
  }));
  return _fetchDateCurrent.apply(this, arguments);
}
export function fetchPermaLinkCurrent() {
  return _fetchPermaLinkCurrent.apply(this, arguments);
}
function _fetchPermaLinkCurrent() {
  _fetchPermaLinkCurrent = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3() {
    var data, $;
    return _regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return got('https://weekinethereumnews.com').text();
        case 3:
          data = _context3.sent;
          _context3.next = 11;
          break;
        case 6:
          _context3.prev = 6;
          _context3.t0 = _context3["catch"](0);
          console.clear();
          console.trace();
          return _context3.abrupt("return");
        case 11:
          $ = cheerio.load(data);
          return _context3.abrupt("return", $('h2.entry-title').children('a').attr('href'));
        case 13:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 6]]);
  }));
  return _fetchPermaLinkCurrent.apply(this, arguments);
}
export function validateInputDate(_x) {
  return _validateInputDate.apply(this, arguments);
}
function _validateInputDate() {
  _validateInputDate = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee4(date) {
    return _regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          if (!(typeof date !== 'string')) {
            _context4.next = 4;
            break;
          }
          return _context4.abrupt("return");
        case 4:
          if (!(dayjs(date, 'M-D-YYYY').isValid() === false)) {
            _context4.next = 6;
            break;
          }
          return _context4.abrupt("return");
        case 6:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return _validateInputDate.apply(this, arguments);
}
export function getUrlOfNewsletter(markdownNewsletter) {
  validateInputDate(markdownNewsletter);
  var re = /(https\:\/\/weekinethereumnews.com\/(?:week-in-eth(?:ereum)?-news-)?.*\d)/igm;
  var execResult = re.exec(markdownNewsletter);
  return execResult[1] + '/';
}

//searches rendered text
function getDate(_x2) {
  return _getDate.apply(this, arguments);
}
function _getDate() {
  _getDate = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee5(document) {
    var re, execResult, _execResult, match, monthName, day, year, monthNum;
    return _regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          re = /(Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)\s+(\d{1,2}),\s+(\d{4})/i;
          _context5.prev = 1;
          execResult = re.exec(document);
          _execResult = _slicedToArray(execResult, 4), match = _execResult[0], monthName = _execResult[1], day = _execResult[2], year = _execResult[3];
          monthNum = monthNameToNumber(monthName);
          return _context5.abrupt("return", {
            dateWordFormat: "".concat(monthName.toLowerCase(), "-").concat(day, "-").concat(year, "/"),
            dateNumberFormat: monthNum + '-' + day + '-' + year
          });
        case 8:
          _context5.prev = 8;
          _context5.t0 = _context5["catch"](1);
        case 10:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[1, 8]]);
  }));
  return _getDate.apply(this, arguments);
}
export function getDateFromNewsletter(_x3) {
  return _getDateFromNewsletter.apply(this, arguments);
}
function _getDateFromNewsletter() {
  _getDateFromNewsletter = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee6(newsletter) {
    var _yield$getDate2, date;
    return _regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return getDate(newsletter);
        case 2:
          _yield$getDate2 = _context6.sent;
          date = _yield$getDate2.dateNumberFormat;
          validateInputDate(date);
          return _context6.abrupt("return", date);
        case 6:
        case "end":
          return _context6.stop();
      }
    }, _callee6);
  }));
  return _getDateFromNewsletter.apply(this, arguments);
}
export function monthNameToNumber(monthName) {
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
var throttle = pThrottle({
  limit: 2,
  interval: 5000
});
export var throttledGot = throttle( /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(url) {
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          return _context.abrupt("return", got(url).text());
        case 1:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function (_x4) {
    return _ref.apply(this, arguments);
  };
}());
export function parseDate(strDate) {
  if (strDate !== null && strDate !== void 0 && strDate.length && /(\d+)-(\d+)-(\d+)/.test(strDate)) {
    var _strDate = strDate.replace(/(\d+)-(\d+)-(\d+)/, "$1+$2+$3");
    return parseInt(_strDate);
  }
  return false;
}
//# sourceMappingURL=utilities.js.map