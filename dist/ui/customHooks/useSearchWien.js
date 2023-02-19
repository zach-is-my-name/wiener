import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import _asyncToGenerator from "@babel/runtime/helpers/asyncToGenerator";
import _regeneratorRuntime from "@babel/runtime/regenerator";
import cliTruncate from 'cli-truncate';
import chalk from 'chalk';
import stripAnsi from 'strip-ansi';
import Fuse from 'fuse.js';
import { loadNewsletterFromDb } from '../../db/db.js';
export function useSearchWien(_x, _x2, _x3, _x4, _x5) {
  return _useSearchWien.apply(this, arguments);
}
function _useSearchWien() {
  _useSearchWien = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(textBoxInput, setItems, setDateIndex, ctrDispatch, isMounted) {
    var _newsletters;
    var newsletters, options, index, fuse, searchResults;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          if (!(isMounted.current === false)) {
            _context.next = 2;
            break;
          }
          return _context.abrupt("return");
        case 2:
          _context.next = 4;
          return loadNewsletterFromDb("all");
        case 4:
          newsletters = _context.sent;
          options = {
            includeMatches: true,
            findAllMatches: true,
            minMatchCharLength: 3,
            threshold: 0.2,
            ignoreLocation: true,
            shouldSort: false,
            keys: ['text']
          };
          if (!((_newsletters = newsletters) !== null && _newsletters !== void 0 && _newsletters.length)) {
            newsletters = [];
            console.clear();
            ctrDispatch({
              type: "setPopUpMessage",
              payload: "Wait for newsletters to sync before searching"
            });
            ctrDispatch({
              type: "exitSearchPage"
            });
          }
          index = Fuse.createIndex(options.keys, newsletters);
          fuse = new Fuse(newsletters, options, index);
          searchResults = fuse.search(textBoxInput) || [];
          setItems(searchResults.map(function (resObj, index) {
            return hlQueryMatch(resObj, index);
          }));
          setDateIndex(searchResults.map(function (resObj, index) {
            return {
              index: index,
              date: resObj.item.date,
              line: resObj.matches[0].value
            };
          }));
        case 12:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return _useSearchWien.apply(this, arguments);
}
function hlQueryMatch(resObj, index) {
  var date = resObj.item.date;
  var value = resObj.matches[0].value;
  var indexStart, indexEnd, sliceEnd, fragment, hlFragment;
  value = cliTruncate(_stripAnsi(value).trim(), 70, {
    position: "end"
  });
  var _resObj$matches$0$ind = _slicedToArray(resObj.matches[0].indices[0], 2);
  indexStart = _resObj$matches$0$ind[0];
  indexEnd = _resObj$matches$0$ind[1];
  sliceEnd = indexEnd + 1;
  fragment = value.slice(indexStart, sliceEnd);
  hlFragment = chalk.bgAnsi256(103)(fragment);
  value = value.replace(fragment, hlFragment, value);
  return "".concat(date, ":  ").concat(value);
}
function _stripAnsi(string) {
  return stripAnsi(string);
}
function removeMdLinks(string, value, index) {
  return string.replace(/\[([^\[]+)\](\(.*\))/, '$1');
}
//# sourceMappingURL=useSearchWien.js.map