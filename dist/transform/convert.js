import _asyncToGenerator from "@babel/runtime/helpers/asyncToGenerator";
import _regeneratorRuntime from "@babel/runtime/regenerator";
import { addNewsletterToDb, loadNewsletterFromDb } from '../db/db.js';
import { applyMarkdown } from './applyMarkdown.js';
import { getDateFromNewsletter, validateInputDate } from '../utilities.js';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat.js';
dayjs.extend(customParseFormat);
export function convertAndStore(_x, _x2, _x3, _x4) {
  return _convertAndStore.apply(this, arguments);
}
function _convertAndStore() {
  _convertAndStore = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(htmlNewsletter, url, prevUrl, nextUrl) {
    var _yield$applyMarkdown, newsletter, date, res;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return applyMarkdown(htmlNewsletter);
        case 2:
          _yield$applyMarkdown = _context.sent;
          newsletter = _yield$applyMarkdown.markdown;
          _context.next = 6;
          return getDateFromNewsletter(newsletter);
        case 6:
          date = _context.sent;
          _context.next = 9;
          return validateInputDate(date);
        case 9:
          newsletter = newsletter.split(/\n/);
          debugger;
          _context.next = 13;
          return addNewsletterToDb(date, newsletter, url, prevUrl, nextUrl);
        case 13:
          res = _context.sent;
          return _context.abrupt("return", res);
        case 15:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return _convertAndStore.apply(this, arguments);
}
//# sourceMappingURL=convert.js.map