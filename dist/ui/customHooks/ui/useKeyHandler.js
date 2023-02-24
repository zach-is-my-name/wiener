import _asyncToGenerator from "@babel/runtime/helpers/asyncToGenerator";
import _regeneratorRuntime from "@babel/runtime/regenerator";
import blessed from 'blessed';
import ansiRegex from 'ansi-regex';
import stripAnsi from 'strip-ansi';
import open from 'open';
export function useKeyHandler(refs, state, dispatch, ctrDispatch) {
  var mainBoxRef = refs.mainBoxRef,
    scrollToScrollHeightFlagRef = refs.scrollToScrollHeightFlagRef;
  var cursorTop = state.cursorTop,
    cursorLeft = state.cursorLeft;
  function keyHandler(_x, _x2) {
    return _keyHandler.apply(this, arguments);
  }
  function _keyHandler() {
    _keyHandler = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(ch, key) {
      var nextCursorPosition, nextTenXCursorPosition, nextTwentyYCursorPosition, updateCoordinate;
      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            updateCoordinate = function _updateCoordinate(input) {
              if (input === 'j' || input === 'k' || input === 'down' || input === 'up') {
                var _mainBoxRef$current, _mainBoxRef$current2;
                dispatch({
                  type: "setCursorTop",
                  payload: nextCursorPosition(cursorTop, input === 'j' || input === 'down', mainBoxRef === null || mainBoxRef === void 0 ? void 0 : (_mainBoxRef$current = mainBoxRef.current) === null || _mainBoxRef$current === void 0 ? void 0 : _mainBoxRef$current.getScrollHeight(), 1)
                });
                (_mainBoxRef$current2 = mainBoxRef.current) === null || _mainBoxRef$current2 === void 0 ? void 0 : _mainBoxRef$current2.scrollTo(cursorTop);
              } else if (input === 'h' || input === 'l' || input === 'left' || input === 'right') {
                var _mainBoxRef$current3;
                dispatch({
                  type: "setCursorLeft",
                  payload: nextCursorPosition(cursorLeft, input === 'l' || input === 'right', (_mainBoxRef$current3 = mainBoxRef.current) === null || _mainBoxRef$current3 === void 0 ? void 0 : _mainBoxRef$current3.width, 3)
                });
              } else if (input === 'escape') {
                ctrDispatch({
                  type: "exitHelpPage"
                });
              } else if (input === 'S-h') {
                ctrDispatch({
                  type: "loadPrevHook"
                });
              } else if (input === 'S-l') {
                ctrDispatch({
                  type: "loadNextHook"
                });
              } else if (input === 'w' || input === 'b') {
                var _mainBoxRef$current4;
                dispatch({
                  type: "setCursorLeft",
                  payload: nextTenXCursorPosition(cursorLeft, input === 'w', (_mainBoxRef$current4 = mainBoxRef.current) === null || _mainBoxRef$current4 === void 0 ? void 0 : _mainBoxRef$current4.width, 9)
                });
              } else if (input === 'S-s') {
                ctrDispatch({
                  type: "toggleRenderSearch"
                });
              } else if (input === '{' || input === '}') {
                var _mainBoxRef$current5;
                dispatch({
                  type: "setCursorTop",
                  payload: nextTwentyYCursorPosition(cursorTop, input === '}', (_mainBoxRef$current5 = mainBoxRef.current) === null || _mainBoxRef$current5 === void 0 ? void 0 : _mainBoxRef$current5.getScrollHeight(), 9)
                });
              } else if (input === 'g' || input === 'home') {
                var _mainBoxRef$current6;
                dispatch({
                  type: "setCursorTop",
                  payload: 0
                });
                (_mainBoxRef$current6 = mainBoxRef.current) === null || _mainBoxRef$current6 === void 0 ? void 0 : _mainBoxRef$current6.scrollTo(cursorTop);
                if (cursorTop > mainBoxRef.current.getScrollHeight()) {
                  scrollToScrollHeightFlag.current = true;
                }
              } else if (input === 'S-g' || input === 'end') {
                var _mainBoxRef$current7;
                dispatch({
                  type: "setCursorTop",
                  payload: mainBoxRef.current.getScreenLines().length - 1
                });
                (_mainBoxRef$current7 = mainBoxRef.current) === null || _mainBoxRef$current7 === void 0 ? void 0 : _mainBoxRef$current7.scrollTo(cursorTop);
              } else if (input === '0') {
                dispatch({
                  type: "setCursorLeft",
                  payload: 0
                });
              } else if (input === '$') {
                var _mainBoxRef$current8;
                dispatch({
                  type: "setCursorLeft",
                  payload: ((_mainBoxRef$current8 = mainBoxRef.current) === null || _mainBoxRef$current8 === void 0 ? void 0 : _mainBoxRef$current8.width) - 1
                });
              } else if (input === "x") {
                var _mainBoxRef$current9;
                (_mainBoxRef$current9 = mainBoxRef.current) === null || _mainBoxRef$current9 === void 0 ? void 0 : _mainBoxRef$current9.setScrollPerc(100);
              } else if (input === 'backspace') {
                ctrDispatch({
                  type: "gotoLatestInArchive"
                });
              } else if (input === 'C-d' || input === 'd' || input === 'D' || input === 'pagedown' || input === 'S-d') {
                var _mainBoxRef$current10, _mainBoxRef$current11, _mainBoxRef$current12;
                var position = cursorTop + (mainBoxRef === null || mainBoxRef === void 0 ? void 0 : (_mainBoxRef$current10 = mainBoxRef.current) === null || _mainBoxRef$current10 === void 0 ? void 0 : _mainBoxRef$current10.height);
                position = position >= (mainBoxRef === null || mainBoxRef === void 0 ? void 0 : (_mainBoxRef$current11 = mainBoxRef.current) === null || _mainBoxRef$current11 === void 0 ? void 0 : _mainBoxRef$current11.getScrollHeight()) ? (mainBoxRef === null || mainBoxRef === void 0 ? void 0 : (_mainBoxRef$current12 = mainBoxRef.current) === null || _mainBoxRef$current12 === void 0 ? void 0 : _mainBoxRef$current12.getScrollHeight()) - 1 : position;
                dispatch({
                  type: "setCursorTop",
                  payload: position
                });
              } else if (input === 'C-u' || input === 'u' || input === 'U' || input === 'pageup' || input === 'S-u') {
                var _mainBoxRef$current13;
                var _position = cursorTop - (mainBoxRef === null || mainBoxRef === void 0 ? void 0 : (_mainBoxRef$current13 = mainBoxRef.current) === null || _mainBoxRef$current13 === void 0 ? void 0 : _mainBoxRef$current13.height) - 2;
                _position = _position < 0 ? 0 : _position;
                dispatch({
                  type: "setCursorTop",
                  payload: _position
                });
              } else if (input === 'S-g') {
                var _mainBoxRef$current14, _mainBoxRef$current15;
                setCursorTop(((_mainBoxRef$current14 = mainBoxRef.current) === null || _mainBoxRef$current14 === void 0 ? void 0 : _mainBoxRef$current14.getScreenLines().length) - 1);
                (_mainBoxRef$current15 = mainBoxRef.current) === null || _mainBoxRef$current15 === void 0 ? void 0 : _mainBoxRef$current15.scrollTo(cursorTop);
                setCursorLeft(0);
              } else if (input === '?') {
                ctrDispatch({
                  type: "toggleHelpPage"
                });
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
            if (!(key.full === 'q' || key.full === 'C-c')) {
              _context.next = 8;
              break;
            }
            return _context.abrupt("return", process.exit(0));
          case 8:
            if (!(key.full === 'enter')) {
              _context.next = 13;
              break;
            }
            _context.next = 11;
            return activateLinkBox();
          case 11:
            _context.next = 19;
            break;
          case 13:
            if (!["1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(key.full)) {
              _context.next = 18;
              break;
            }
            _context.next = 16;
            return activateRefBox(key.full);
          case 16:
            _context.next = 19;
            break;
          case 18:
            updateCoordinate(key.full);
          case 19:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    return _keyHandler.apply(this, arguments);
  }
  function activateRefBox(initialRefNum) {
    dispatch({
      type: "openRefBox",
      payload: initialRefNum
    });
  }
  function activateLinkBox() {
    return _activateLinkBox.apply(this, arguments);
  }
  function _activateLinkBox() {
    _activateLinkBox = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2() {
      var _mainBoxRef$current16;
      var lines, before, cursorIndex, cursorLine, text, re, match, start, end, openLinkIndex;
      return _regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            lines = (_mainBoxRef$current16 = mainBoxRef.current) === null || _mainBoxRef$current16 === void 0 ? void 0 : _mainBoxRef$current16.getScreenLines();
            before = lines === null || lines === void 0 ? void 0 : lines.slice(0, cursorTop);
            cursorIndex = blessed.stripTags(before === null || before === void 0 ? void 0 : before.join('')).length + cursorLeft;
            cursorLine = lines[cursorTop];
            if (!(cursorLeft <= cursorLine.length)) {
              _context2.next = 20;
              break;
            }
            text = blessed.stripTags(lines.join(''));
            re = /\[(\d+)\]/g;
            match = re.exec(text);
          case 8:
            if (!match) {
              _context2.next = 20;
              break;
            }
            start = match.index;
            end = start + match[0].length;
            if (!(start <= cursorIndex && cursorIndex < end)) {
              _context2.next = 17;
              break;
            }
            openLinkIndex = match[1];
            openLinkIndex = stripAnsi(openLinkIndex);
            openLinkIndex = parseInt(openLinkIndex, 10);
            dispatch({
              type: "openLinkBox",
              payload: {
                openLinkIndex: openLinkIndex,
                line: cursorTop
              }
            });
            return _context2.abrupt("break", 20);
          case 17:
            match = re.exec(text);
            _context2.next = 8;
            break;
          case 20:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    }));
    return _activateLinkBox.apply(this, arguments);
  }
  function followLinkUnderCursor() {
    var regexLink = /(https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b[-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gm;
    // check if the chunk under the cursor is a markdown link
    var lines = mainBoxRef === null || mainBoxRef === void 0 ? void 0 : mainBoxRef.current.getScreenLines();
    if (cursorTop > (lines === null || lines === void 0 ? void 0 : lines.length)) {
      return;
    }
    var before = lines === null || lines === void 0 ? void 0 : lines.slice(0, cursorTop);
    var cursorIndex = blessed.stripTags(before === null || before === void 0 ? void 0 : before.join('')).length + cursorLeft;
    var cursorLine = blessed.stripTags(lines[cursorTop]);
    if (cursorLeft <= cursorLine.length) {
      var text = blessed.stripTags(lines.join(''));
      var match = regexLink.exec(text);
      while (match) {
        var start = match.index;
        var end = start + match[0].length;
        if (start <= cursorIndex && cursorIndex < end) {
          open(match[1]);
          break;
        }
        match = regexLink.exec(text);
      }
      dispatch({
        type: "toggleWasMouseClicked"
      });
    }
  }
  return [{
    followLinkUnderCursor: followLinkUnderCursor,
    keyHandler: keyHandler
  }];
}
//# sourceMappingURL=useKeyHandler.js.map