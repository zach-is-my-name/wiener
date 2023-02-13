import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _asyncToGenerator from "@babel/runtime/helpers/asyncToGenerator";
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
import _regeneratorRuntime from "@babel/runtime/regenerator";
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
var __dirname = dirname(fileURLToPath(import.meta.url));
var file = join(__dirname, 'db.json');
var adapter = new JSONFile(file);
var db = new Low(adapter);
export function replaceBlankNextUrl(_x, _x2) {
  return _replaceBlankNextUrl.apply(this, arguments);
}
function _replaceBlankNextUrl() {
  _replaceBlankNextUrl = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(dateLatestPub, setReplaceCycleInitd) {
    var newsletters, nl, i;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return db.read();
        case 2:
          db.data || (db.data = {
            newsletters: []
          });
          newsletters = db.data.newsletters;
          if (!(newsletters.length > 1 && typeof dateLatestPub === 'string')) {
            _context.next = 23;
            break;
          }
          nl = newsletters;
          i = 0;
        case 7:
          if (!(i < nl.length)) {
            _context.next = 20;
            break;
          }
          _context.prev = 8;
          if (!(nl[i].date !== dateLatestPub && !nl[i].nextUrl.length)) {
            _context.next = 12;
            break;
          }
          _context.next = 12;
          return addNextUrl(nl[i - 1].url, i, nl);
        case 12:
          _context.next = 17;
          break;
        case 14:
          _context.prev = 14;
          _context.t0 = _context["catch"](8);
          return _context.abrupt("return");
        case 17:
          i++;
          _context.next = 7;
          break;
        case 20:
          setReplaceCycleInitd(true);
          _context.next = 24;
          break;
        case 23:
          if (newsletters.length <= 1) {
            setReplaceCycleInitd(true);
          }
        case 24:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[8, 14]]);
  }));
  return _replaceBlankNextUrl.apply(this, arguments);
}
function addNextUrl(_x3, _x4, _x5) {
  return _addNextUrl.apply(this, arguments);
}
function _addNextUrl() {
  _addNextUrl = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(nextUrl, i, nl) {
    var newObj;
    return _regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          newObj = _objectSpread(_objectSpread({}, nl[i]), {}, {
            nextUrl: nextUrl
          });
          nl = nl.splice(i, 1, newObj);
          _context2.next = 4;
          return db.write();
        case 4:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return _addNextUrl.apply(this, arguments);
}
export function checkContinuity() {
  return _checkContinuity.apply(this, arguments);
}
function _checkContinuity() {
  _checkContinuity = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3() {
    var newsletters, hasContinuity, i, _newsletters;
    return _regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return db.read();
        case 2:
          db.data || (db.data = {
            newsletters: []
          });
          newsletters = db.data.newsletters;
          hasContinuity = [];
          i = 0;
        case 6:
          if (!(i < newsletters.length - 1)) {
            _context3.next = 16;
            break;
          }
          if (!(newsletters[i].prevUrl !== ((_newsletters = newsletters[i + 1]) === null || _newsletters === void 0 ? void 0 : _newsletters.url))) {
            _context3.next = 12;
            break;
          }
          hasContinuity.push(false);
          throw new Error();
        case 12:
          hasContinuity.push(true);
        case 13:
          i++;
          _context3.next = 6;
          break;
        case 16:
          return _context3.abrupt("return", hasContinuity.every(function (item) {
            return item === true;
          }));
        case 17:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return _checkContinuity.apply(this, arguments);
}
//# sourceMappingURL=replaceBlankNextUrl.js.map