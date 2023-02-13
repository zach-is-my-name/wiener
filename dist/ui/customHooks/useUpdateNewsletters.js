import _asyncToGenerator from "@babel/runtime/helpers/asyncToGenerator";
import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import _regeneratorRuntime from "@babel/runtime/regenerator";
import { useEffect, useState } from 'react';
import { applyMarkdown } from '../../transform/applyMarkdown.js';
import { fetchBackFromLocalLatest } from '../../fetch/fetchBackFromLocalLatest.js';
import { replaceBlankNextUrl, checkContinuity } from '../../fetch/replaceBlankNextUrl.js';
export function useUpdateNewsletters(dateLatestPub, hasLatestInArchive, hasInternet, text, ctrDispatch) {
  var _useState = useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    replaceCycleInitd = _useState2[0],
    setReplaceCycleInitd = _useState2[1];
  useEffect(function () {
    _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
      var hasContinuity;
      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            if (!(hasLatestInArchive === true && hasInternet && text !== null && text !== void 0 && text.length && !replaceCycleInitd)) {
              _context.next = 10;
              break;
            }
            _context.next = 3;
            return checkContinuity();
          case 3:
            hasContinuity = _context.sent;
            if (!(hasContinuity && typeof dateLatestPub === 'string')) {
              _context.next = 9;
              break;
            }
            _context.next = 7;
            return replaceBlankNextUrl(dateLatestPub, setReplaceCycleInitd);
          case 7:
            _context.next = 10;
            break;
          case 9:
            if (!hasContinuity) {
              setReplaceCycleInitd(true);
            }
          case 10:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }))();
  }, [replaceCycleInitd, dateLatestPub, hasLatestInArchive, hasInternet, text]);
  useEffect(function () {
    if (hasLatestInArchive === true && hasInternet && text !== null && text !== void 0 && text.length, replaceCycleInitd) {
      _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2() {
        return _regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return fetchBackFromLocalLatest(dateLatestPub);
            case 2:
            case "end":
              return _context2.stop();
          }
        }, _callee2);
      }))();
    }
  }, [replaceCycleInitd]);
}
//# sourceMappingURL=useUpdateNewsletters.js.map