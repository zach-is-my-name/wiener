import _asyncToGenerator from "@babel/runtime/helpers/asyncToGenerator";
import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import _regeneratorRuntime from "@babel/runtime/regenerator";
import React, { useEffect, useState } from 'react';
import isReachable from 'is-reachable';
export function useHasInternet() {
  var _useState = useState("loading"),
    _useState2 = _slicedToArray(_useState, 2),
    hasInternet = _useState2[0],
    setHasInternet = _useState2[1];
  useEffect(function () {
    _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.t0 = setHasInternet;
            _context.next = 3;
            return isReachable('https://weekinethereumnews.com');
          case 3:
            _context.t1 = _context.sent;
            (0, _context.t0)(_context.t1);
          case 5:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }))();
  }, [hasInternet]);
  return hasInternet;
}
//# sourceMappingURL=useHasInternet.js.map