import _asyncToGenerator from "@babel/runtime/helpers/asyncToGenerator";
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
export function addNextUrl(_x8, _x9, _x10) {
  return _addNextUrl.apply(this, arguments);
}
function _addNextUrl() {
  _addNextUrl = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3(obj, i, nl) {
    return _regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          nl = nl.splice(i, 1, obj);
          _context3.next = 3;
          return db.write();
        case 3:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return _addNextUrl.apply(this, arguments);
}
export function getDateLatestInArchive() {
  return _getDateLatestInArchive.apply(this, arguments);
}
function _getDateLatestInArchive() {
  _getDateLatestInArchive = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee4() {
    var result, attempts;
    return _regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          attempts = 0;
        case 1:
          if (!(attempts < 2)) {
            _context4.next = 18;
            break;
          }
          _context4.prev = 2;
          _context4.next = 5;
          return loadNewsletterFromDb("first");
        case 5:
          result = _context4.sent;
          if (!(result.length === 0)) {
            _context4.next = 10;
            break;
          }
          return _context4.abrupt("return", []);
        case 10:
          return _context4.abrupt("return", result.date);
        case 11:
          _context4.next = 16;
          break;
        case 13:
          _context4.prev = 13;
          _context4.t0 = _context4["catch"](2);
          attempts++;
        case 16:
          _context4.next = 1;
          break;
        case 18:
          throw new Error("failed to getDateLatestInArchive");
        case 19:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[2, 13]]);
  }));
  return _getDateLatestInArchive.apply(this, arguments);
}
export function getArchiveLength() {
  return _getArchiveLength.apply(this, arguments);
}
function _getArchiveLength() {
  _getArchiveLength = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee5() {
    return _regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return db.read();
        case 2:
          db.data || (db.data = {
            newsletters: []
          });
          return _context5.abrupt("return", db.data.newsletters.length);
        case 4:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  }));
  return _getArchiveLength.apply(this, arguments);
}
//# sourceMappingURL=db.js.map