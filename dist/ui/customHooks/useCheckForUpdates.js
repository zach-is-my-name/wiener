import _asyncToGenerator from "@babel/runtime/helpers/asyncToGenerator";
import _regeneratorRuntime from "@babel/runtime/regenerator";
export function useCheckForUpdates() {
  useEffect(function () {
    function checkForUpdates() {
      return _checkForUpdates.apply(this, arguments);
    }

    function _checkForUpdates() {
      _checkForUpdates = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));
      return _checkForUpdates.apply(this, arguments);
    }

    checkForUpdates();
  });
  return null;
}