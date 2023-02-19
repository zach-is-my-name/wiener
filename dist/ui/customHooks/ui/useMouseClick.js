import _asyncToGenerator from "@babel/runtime/helpers/asyncToGenerator";
import _regeneratorRuntime from "@babel/runtime/regenerator";
import { useEffect } from 'react';
export function useMouseClick(_ref, _ref2, dispatch, followLinkUnderCursor) {
  var mainBoxRef = _ref.mainBoxRef;
  var wasMouseClicked = _ref2.wasMouseClicked,
    cursorLeft = _ref2.cursorLeft,
    cursorTop = _ref2.cursorTop;
  useEffect(function () {
    _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            if (!wasMouseClicked) {
              _context.next = 3;
              break;
            }
            _context.next = 3;
            return followLinkUnderCursor();
          case 3:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }))();
  }, [wasMouseClicked, cursorLeft, cursorTop]);
  var clickHandler = function clickHandler(mouse) {
    var _mainBoxRef$current;
    var x = mouse.x,
      y = mouse.y;
    dispatch({
      type: "setCursorLeft",
      payload: x
    });
    dispatch({
      type: "setCursorTop",
      payload: ((_mainBoxRef$current = mainBoxRef.current) === null || _mainBoxRef$current === void 0 ? void 0 : _mainBoxRef$current.childBase) + y
    });
    dispatch({
      type: "toggleWasMouseClicked"
    });
  };
  return [{
    clickHandler: clickHandler
  }];
}
//# sourceMappingURL=useMouseClick.js.map