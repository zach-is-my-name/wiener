import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _asyncToGenerator from "@babel/runtime/helpers/asyncToGenerator";
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
import _regeneratorRuntime from "@babel/runtime/regenerator";
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
var __dirname = dirname(fileURLToPath(import.meta.url)); //production db file
var file = join(__dirname, 'db.json');
var adapter = new JSONFile(file);
var db = new Low(adapter);
export function addNewsletterToDb(_x, _x2, _x3, _x4, _x5) {
  return _addNewsletterToDb.apply(this, arguments);
}
function _addNewsletterToDb() {
  _addNewsletterToDb = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(date, text, url, prevUrl, nextUrl) {
    var addedNewsletter;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return db.read();
        case 2:
          db.data || (db.data = {
            newsletters: []
          });
          db.data.newsletters.unshift({
            date: date,
            text: text,
            url: url,
            prevUrl: prevUrl,
            nextUrl: nextUrl
          });
          _context.next = 6;
          return db.write();
        case 6:
          _context.next = 8;
          return db.read();
        case 8:
          db.data || (db.data = {
            newsletters: []
          }); // For Node >= 15.x
          _context.next = 11;
          return db.read();
        case 11:
          db.data.newsletters.sort(function (a, b) {
            return new Date(b.date) - new Date(a.date);
          });
          _context.next = 14;
          return db.write();
        case 14:
          _context.next = 16;
          return db.read();
        case 16:
          _context.next = 18;
          return loadNewsletterFromDb("date", date);
        case 18:
          addedNewsletter = _context.sent;
          return _context.abrupt("return", addedNewsletter);
        case 20:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return _addNewsletterToDb.apply(this, arguments);
}
export function loadNewsletterFromDb(_x6, _x7) {
  return _loadNewsletterFromDb.apply(this, arguments);
}
function _loadNewsletterFromDb() {
  _loadNewsletterFromDb = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(by, param) {
    var storedNewsletters;
    return _regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return db.read();
        case 2:
          db.data || (db.data = {
            newsletters: []
          });
          storedNewsletters = db.data.newsletters.sort(function (a, b) {
            return new Date(b.date) - new Date(a.date);
          });
          if (!(storedNewsletters.length === 0)) {
            _context2.next = 6;
            break;
          }
          return _context2.abrupt("return", storedNewsletters);
        case 6:
          _context2.t0 = by;
          _context2.next = _context2.t0 === "date" ? 9 : _context2.t0 === "first" ? 10 : _context2.t0 === "url" ? 11 : _context2.t0 === "all" ? 12 : 13;
          break;
        case 9:
          return _context2.abrupt("return", storedNewsletters.find(function (obj) {
            return obj.date === param;
          }));
        case 10:
          return _context2.abrupt("return", storedNewsletters.slice(0, 1).pop());
        case 11:
          return _context2.abrupt("return", storedNewsletters.find(function (obj) {
            return obj.url === param;
          }));
        case 12:
          return _context2.abrupt("return", storedNewsletters.slice());
        case 13:
          throw new Error();
        case 14:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return _loadNewsletterFromDb.apply(this, arguments);
}
export function getDateLatestInArchive() {
  return _getDateLatestInArchive.apply(this, arguments);
}
function _getDateLatestInArchive() {
  _getDateLatestInArchive = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3() {
    var result, attempts;
    return _regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          attempts = 0;
        case 1:
          if (!(attempts < 2)) {
            _context3.next = 18;
            break;
          }
          _context3.prev = 2;
          _context3.next = 5;
          return loadNewsletterFromDb("first");
        case 5:
          result = _context3.sent;
          if (!(result.length === 0)) {
            _context3.next = 10;
            break;
          }
          return _context3.abrupt("return", []);
        case 10:
          return _context3.abrupt("return", result.date);
        case 11:
          _context3.next = 16;
          break;
        case 13:
          _context3.prev = 13;
          _context3.t0 = _context3["catch"](2);
          attempts++;
        case 16:
          _context3.next = 1;
          break;
        case 18:
          throw new Error("failed to getDateLatestInArchive");
        case 19:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[2, 13]]);
  }));
  return _getDateLatestInArchive.apply(this, arguments);
}
export function getArchiveLength() {
  return _getArchiveLength.apply(this, arguments);
}
function _getArchiveLength() {
  _getArchiveLength = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee4() {
    return _regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return db.read();
        case 2:
          db.data || (db.data = {
            newsletters: []
          });
          return _context4.abrupt("return", db.data.newsletters.length);
        case 4:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return _getArchiveLength.apply(this, arguments);
}
export function replaceBlankNextUrl(_x8, _x9) {
  return _replaceBlankNextUrl.apply(this, arguments);
}
function _replaceBlankNextUrl() {
  _replaceBlankNextUrl = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee5(dateLatestPub, setReplaceCycleInitd) {
    var newsletters, nl, i;
    return _regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return loadNewsletterFromDb("all");
        case 2:
          newsletters = _context5.sent;
          if (!(newsletters.length > 1 && typeof dateLatestPub === 'string')) {
            _context5.next = 22;
            break;
          }
          nl = newsletters;
          i = 0;
        case 6:
          if (!(i < nl.length)) {
            _context5.next = 19;
            break;
          }
          _context5.prev = 7;
          if (!(nl[i].date !== dateLatestPub && !nl[i].nextUrl.length)) {
            _context5.next = 11;
            break;
          }
          _context5.next = 11;
          return addNextUrl(nl[i - 1].url, i, nl);
        case 11:
          _context5.next = 16;
          break;
        case 13:
          _context5.prev = 13;
          _context5.t0 = _context5["catch"](7);
          return _context5.abrupt("return");
        case 16:
          i++;
          _context5.next = 6;
          break;
        case 19:
          setReplaceCycleInitd(true);
          _context5.next = 23;
          break;
        case 22:
          if (newsletters.length <= 1) {
            setReplaceCycleInitd(true);
          }
        case 23:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[7, 13]]);
  }));
  return _replaceBlankNextUrl.apply(this, arguments);
}
function addNextUrl(_x10, _x11, _x12) {
  return _addNextUrl.apply(this, arguments);
}
function _addNextUrl() {
  _addNextUrl = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee6(nextUrl, i, nl) {
    var newObj;
    return _regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          newObj = _objectSpread(_objectSpread({}, nl[i]), {}, {
            nextUrl: nextUrl
          });
          nl = nl.splice(i, 1, newObj);
          _context6.next = 4;
          return db.write();
        case 4:
        case "end":
          return _context6.stop();
      }
    }, _callee6);
  }));
  return _addNextUrl.apply(this, arguments);
}
export function checkContinuity() {
  return _checkContinuity.apply(this, arguments);
}
function _checkContinuity() {
  _checkContinuity = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee7() {
    var newsletters, hasContinuity, i, _newsletters;
    return _regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.next = 2;
          return loadNewsletterFromDb("all");
        case 2:
          newsletters = _context7.sent;
          hasContinuity = [];
          for (i = 0; i < newsletters.length - 1; i++) {
            if (newsletters[i].prevUrl !== ((_newsletters = newsletters[i + 1]) === null || _newsletters === void 0 ? void 0 : _newsletters.url)) {
              hasContinuity.push(false);
            } else {
              hasContinuity.push(true);
            }
          }
          return _context7.abrupt("return", hasContinuity.every(function (item) {
            return item === true;
          }));
        case 6:
        case "end":
          return _context7.stop();
      }
    }, _callee7);
  }));
  return _checkContinuity.apply(this, arguments);
}
//# sourceMappingURL=db.js.map