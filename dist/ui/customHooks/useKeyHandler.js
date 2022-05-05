import _asyncToGenerator from "@babel/runtime/helpers/asyncToGenerator";
import _regeneratorRuntime from "@babel/runtime/regenerator";
import open from "open";
export function useKeyHandler() {
  function keyHandler(_x, _x2, _x3) {
    return _keyHandler.apply(this, arguments);
  }

  function _keyHandler() {
    _keyHandler = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(e, ch, key) {
      var nextCursorPosition, nextTenXCursorPosition, nextTwentyYCursorPosition, updateCoordinate;
      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              updateCoordinate = function _updateCoordinate(input) {
                if (input === 'j' || input === 'k') {
                  var _mainBoxRef$current2, _mainBoxRef$current3;

                  setCursorTop(nextCursorPosition(cursorTop, input === 'j', (_mainBoxRef$current2 = mainBoxRef.current) === null || _mainBoxRef$current2 === void 0 ? void 0 : _mainBoxRef$current2.getScrollHeight(), 1));
                  (_mainBoxRef$current3 = mainBoxRef.current) === null || _mainBoxRef$current3 === void 0 ? void 0 : _mainBoxRef$current3.scrollTo(cursorTop);
                } else if (input === 'h' || input === 'l') {
                  var _mainBoxRef$current4;

                  setCursorLeft(nextCursorPosition(cursorLeft, input === 'l', (_mainBoxRef$current4 = mainBoxRef.current) === null || _mainBoxRef$current4 === void 0 ? void 0 : _mainBoxRef$current4.width, 3));
                } else if (input === 'w' || input === 'b') {
                  var _mainBoxRef$current5;

                  setCursorLeft(nextTenXCursorPosition(cursorLeft, input === 'w', (_mainBoxRef$current5 = mainBoxRef.current) === null || _mainBoxRef$current5 === void 0 ? void 0 : _mainBoxRef$current5.width, 9));
                } else if (input === '{' || input === '}') {
                  var _mainBoxRef$current6;

                  setCursorTop(nextTwentyYCursorPosition(cursorTop, input === '{', (_mainBoxRef$current6 = mainBoxRef.current) === null || _mainBoxRef$current6 === void 0 ? void 0 : _mainBoxRef$current6.getScrollHeight(), 9));
                } else if (input === 'g') {
                  setCursorTop(0);
                  setCursorLeft(0);
                  setStateCallbackFlag(true);
                } else if (input === 'S-g') {
                  var _mainBoxRef$current7;

                  setCursorTop(((_mainBoxRef$current7 = mainBoxRef.current) === null || _mainBoxRef$current7 === void 0 ? void 0 : _mainBoxRef$current7.getScreenLines().length) - 1);
                  setCursorLeft(0);
                  setStateCallbackFlag(true);
                } else if (input === '0') {
                  setCursorLeft(0);
                } else if (input === '$') {
                  var _mainBoxRef$current8;

                  setCursorLeft((_mainBoxRef$current8 = mainBoxRef.current) === null || _mainBoxRef$current8 === void 0 ? void 0 : _mainBoxRef$current8.width);
                } else if (input === "x") {
                  var _mainBoxRef$current9;

                  (_mainBoxRef$current9 = mainBoxRef.current) === null || _mainBoxRef$current9 === void 0 ? void 0 : _mainBoxRef$current9.setScrollPerc(100);
                } else if (input === 'C-d') {
                  var _mainBoxRef$current10, _mainBoxRef$current11;

                  setCursorTop(cursorTop + ((_mainBoxRef$current10 = mainBoxRef.current) === null || _mainBoxRef$current10 === void 0 ? void 0 : _mainBoxRef$current10.height) - 2);

                  if (cursorTop > ((_mainBoxRef$current11 = mainBoxRef.current) === null || _mainBoxRef$current11 === void 0 ? void 0 : _mainBoxRef$current11.getScrollHeight())) {
                    var _mainBoxRef$current12;

                    setCursorTop(((_mainBoxRef$current12 = mainBoxRef.current) === null || _mainBoxRef$current12 === void 0 ? void 0 : _mainBoxRef$current12.getScrollHeight()) - 1);
                  }

                  scrollToScrollHeightFlag.current = true;
                  setStateCallbackFlag(true);
                } else if (input === 'C-u') {
                  var _mainBoxRef$current13;

                  setCursorTop(cursorTop - ((_mainBoxRef$current13 = mainBoxRef.current) === null || _mainBoxRef$current13 === void 0 ? void 0 : _mainBoxRef$current13.height) - 2);

                  if (cursorTop < 0) {
                    setCursorTop(0);
                  }

                  scrollToZeroFlag.current = true;
                  setStateCallbackFlag(true);
                }
              };

              nextTwentyYCursorPosition = function _nextTwentyYCursorPos(current, forward, maxLength, adjustment) {
                var position = current + (forward ? 10 : -10);
                position = position < 0 ? 0 : position;
                position = position > maxLength - adjustment ? maxLength - adjustment : position;
                return position;
              };

              nextTenXCursorPosition = function _nextTenXCursorPositi(current, forward, maxLength, adjustment) {
                var position = current + (forward ? 10 : -10);
                position = position < 0 ? 0 : position;
                position = position > maxLength - adjustment ? maxLength - adjustment : position;
                return position;
              };

              nextCursorPosition = function _nextCursorPosition(current, forward, maxLength, adjustment) {
                var position = current + (forward ? 1 : -1);
                position = position < 0 ? 0 : position;
                position = position > maxLength - adjustment ? maxLength - adjustment : position;
                return position;
              };

              console.log("e", e);

              if (!(key.full === 'escape' || key.full === 'q' || key.full === 'C-c')) {
                _context.next = 9;
                break;
              }

              return _context.abrupt("return", process.exit(0));

            case 9:
              if (!(key.full === 'enter')) {
                _context.next = 14;
                break;
              }

              _context.next = 12;
              return followLinkUnderCursor();

            case 12:
              _context.next = 25;
              break;

            case 14:
              if (!(key.full === 'H')) {
                _context.next = 19;
                break;
              }

              _context.next = 17;
              return newsletterBack();

            case 17:
              _context.next = 25;
              break;

            case 19:
              if (!(key.full === 'L')) {
                _context.next = 24;
                break;
              }

              _context.next = 22;
              return newsletterForward();

            case 22:
              _context.next = 25;
              break;

            case 24:
              updateCoordinate(key.full);

            case 25:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));
    return _keyHandler.apply(this, arguments);
  }

  function followLinkUnderCursor(mainBoxRef) {
    var _mainBoxRef$current;

    // check if the chunk under the cursor is a markdown link
    var lines = (_mainBoxRef$current = mainBoxRef.current) === null || _mainBoxRef$current === void 0 ? void 0 : _mainBoxRef$current.getScreenLines();

    if (cursorTop >= lines.length) {
      return;
    }

    var before = lines.slice(0, cursorTop);
    var cursorIndex = blessed.stripTags(before.join('')).length + cursorLeft;
    var cursorLine = blessed.stripTags(lines[cursorTop]);

    if (cursorLeft <= cursorLine.length) {
      var text = blessed.stripTags(lines.join(''));
      var match = regexLink.exec(text);
      logger2.info({
        text: text
      });

      while (match) {
        var start = match.index;
        var end = start + match[0].length;

        if (start <= cursorIndex && cursorIndex < end) {
          // jump to the link destination
          open(match[1]);
          break;
        }

        match = regexLink.exec(text);
      }

      toggleWasMouseClicked(false);
    }
  }
}