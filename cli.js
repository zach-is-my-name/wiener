"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _readOnlyError(name) { throw new TypeError("\"" + name + "\" is read-only"); }

require('@babel/register')({
  presets: [['@babel/preset-env'], ['@babel/preset-react']]
});

var React = require('react');

var _require = require('react'),
    useState = _require.useState,
    useEffect = _require.useEffect;

var importJsx = require('import-jsx');

var blessed = require('blessed');

var _require2 = require('react-blessed'),
    render = _require2.render;

var _require3 = require('./renderMarkdown'),
    renderMarkdown = _require3.renderMarkdown;

function App(props) {
  var _useState = useState(null),
      _useState2 = _slicedToArray(_useState, 2),
      renderedMarkdown = _useState2[0],
      setRenderedMarkdown = _useState2[1];

  var _useState3 = useState(false),
      _useState4 = _slicedToArray(_useState3, 2),
      linkButtonRendered = _useState4[0],
      setLinkButtonRendered = _useState4[1];

  var _useState5 = useState(false),
      _useState6 = _slicedToArray(_useState5, 2),
      linkButtonFocused = _useState6[0],
      setLinkButtonFocus = _useState6[1];

  var _useState7 = useState(0),
      _useState8 = _slicedToArray(_useState7, 2),
      cursorTop = _useState8[0],
      setCursorTop = _useState8[1];

  var _useState9 = useState(0),
      _useState10 = _slicedToArray(_useState9, 2),
      cursorLeft = _useState10[0],
      setCursorLeft = _useState10[1];

  useEffect(function () {
    function getRenderedMarkdown() {
      return _getRenderedMarkdown.apply(this, arguments);
    }

    function _getRenderedMarkdown() {
      _getRenderedMarkdown = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var response;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return renderMarkdown();

              case 2:
                response = _context.sent;
                setRenderedMarkdown(response);

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));
      return _getRenderedMarkdown.apply(this, arguments);
    }

    getRenderedMarkdown();
  }, []);
  var MainBox = /*#__PURE__*/React.createElement("box", {
    top: "center",
    left: "center",
    width: "100%",
    height: "100%",
    mouse: true,
    onClick: clickHandler,
    scrollable: true
  }, /*#__PURE__*/React.createElement(Cursor, null), "renderedMarkdown >", props.children);
  var OutterButton = /*#__PURE__*/React.createElement("button", {
    top: linkButtonTop,
    left: linkButtonLeft,
    onPress: function onPress() {
      return linkButtonPress();
    },
    height: 3,
    width: "shrink",
    focused: linkButtonFocused,
    mouse: true,
    tags: true,
    hidden: linkButtonHide
  }, props.children);
  var InnerButton = /*#__PURE__*/React.createElement("button", null, props.children);

  var linkButtonPress = function linkButtonPress() {
    setLinkButtonRendered();
    setLinkButtonFocused();
  };
  /*  async function followLinkUnderCursor() {
      
      // check if the chunk under the cursor is a markdown link
      const lines = box.getScreenLines()
      if (cursorTop >= lines.length) {
        return
      }
   */


  var clickHandler = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(mouse) {
      var x, y;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              // move the cursor
              cursor.detach();
              x = mouse.x, y = mouse.y;
              setCursorTop(box.childBase + y - 1);
              setCursorLeft(x - 1);
              renderCursor();
              screen.render(); // check if the clicked chunk is a markdown link

              _context2.next = 8;
              return followLinkUnderCursor();

            case 8:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function clickHandler(_x) {
      return _ref.apply(this, arguments);
    };
  }();

  var Cursor = /*#__PURE__*/React.createElement("box", {
    width: 1,
    height: 1,
    top: cursorTop,
    left: cursorLeft,
    style: {
      fg: 'white',
      bg: 'white'
    }
  });

  var renderCursor = function renderCursor() {
    /*#__PURE__*/
    React.createElement("box", {
      width: 1,
      height: 1,
      top: cursorTop,
      left: cursorLeft,
      style: {
        fg: 'white',
        bg: 'white'
      }
    });
  };

  var isLoading = false;

  var showHelp = function showHelp() {
    return null;
  };

  var showSearch = function showSearch() {
    return null;
  }; // Quit on Escape, q, or Control-C.


  mainBox.key(['escape', 'q', 'C-c', 'g', 'S-g', 'u', 'C-u', 'd', 'C-d', 'j', 'k', 'h', 'l', '/'], /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(ch, key) {
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              if (!(key.full === 'escape' || key.full === 'q' || key.full === 'C-c')) {
                _context3.next = 4;
                break;
              }

              return _context3.abrupt("return", process.exit(0));

            case 4:
              if (key.full === '?') {
                //show help
                cbShowHelp();
              } else if (key.full === '/') {
                cbShowSearch();
              } else {
                //update cursor position
                updateCoordinate(key.full);
                renderCursor();
                screen.render();
              }

            case 5:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    return function (_x2, _x3) {
      return _ref2.apply(this, arguments);
    };
  }());

  var updateCoordinate = function updateCoordinate(input) {
    if (input === 'j' || input === 'k') {
      setCursorTop(nextCursorPosition(cursorTop, input === 'j', box.getScrollHeight(), 1));
      box.scrollTo(cursorTop);
    } else if (input === 'h' || input === 'l') {
      setCursorLeft(nextCursorPosition(cursorLeft, input === 'l', box.width, 3));
    } else if (input === 'g') {
      setCursorTop(0);
      setCursorLeft(0);
      box.scrollTo(cursorTop);
    } else if (input === 'S-g') {
      setCursorTop(box.getScreenLines().length - 1);
      setCursorLeft(0);
      box.scrollTo(cursorTop);
    } else if (input === '0') {
      setCursorLeft(0);
    } else if (input === '$') {
      setCursorLeft(box.width - 3);
    } else if (input === 'd' || input === 'C-d') {
      cursorTop + (box.height - 2), _readOnlyError("cursorTop");

      if (cursorTop > box.getScrollHeight()) {
        setCursorTop(box.getScrollHeight() - 1);
      }

      box.scrollTo(box.getScrollHeight());
      box.scrollTo(cursorTop);
    } else if (input === 'u' || input === 'C-u') {
      setCursorTop(cursorTop - box.height - 1);

      if (cursorTop < 0) {
        setCursorTop(0);
      }

      box.scrollTo(0);
      box.scrollTo(cursorTop);
    }
  };

  var nextCursorPosition = function nextCursorPosition(current, forward, maxLength, adjustment) {
    var position = current + (forward ? 1 : -1);
    position = position < 0 ? 0 : position;
    position = position > maxLength - adjustment ? maxLength - adjustment : position;
    return position;
  }; // re-implement


  function followLinkUnderCursor() {
    return _followLinkUnderCursor.apply(this, arguments);
  }
  /*
  //re-implement with state if necessary 
  function setLoadingState(isLoading) {
    isLoading = isLoading
  }
  }
  */


  function _followLinkUnderCursor() {
    _followLinkUnderCursor = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
      var lines, before, cursorIndex, cursorLine, text, match, start, end, stripAnsi, regexMarkdownHeading, regexMarkdownLink;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              // check if the chunk under the cursor is a markdown link
              lines = box.getScreenLines();

              if (!(cursorTop >= lines.length)) {
                _context4.next = 3;
                break;
              }

              return _context4.abrupt("return");

            case 3:
              before = lines.slice(0, cursorTop);
              cursorIndex = stripAnsi(before.join('')).length + cursorLeft;
              cursorLine = stripAnsi(lines[cursorTop]);

              if (!(cursorLeft <= cursorLine.length)) {
                _context4.next = 19;
                break;
              }

              text = stripAnsi(lines.join(''));
              match = regexMarkdownLink.exec(text);

            case 9:
              if (!match) {
                _context4.next = 19;
                break;
              }

              start = match.index;
              end = start + match[0].length;

              if (!(start <= cursorIndex && cursorIndex < end)) {
                _context4.next = 16;
                break;
              }

              _context4.next = 15;
              return cbFollow(match[2]);

            case 15:
              return _context4.abrupt("break", 19);

            case 16:
              match = regexMarkdownLink.exec(text);
              _context4.next = 9;
              break;

            case 19:
              stripAnsi = require('strip-ansi');
              regexMarkdownHeading = /#{1,6} .+$/gm;
              regexMarkdownLink = /\[([^[]+)\]\(([^)]+)\)/gm;

            case 22:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }));
    return _followLinkUnderCursor.apply(this, arguments);
  }

  mainBox.focus();
  /* --------------------return (below)--------------------- */

  return /*#__PURE__*/React.createElement(MainBox, null);
}

var screen = blessed.screen({
  autoPadding: true,
  smartCSR: true,
  title: 'wiener'
});
var component = render( /*#__PURE__*/React.createElement(App, null), screen);
