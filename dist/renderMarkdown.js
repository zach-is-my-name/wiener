import _asyncToGenerator from "@babel/runtime/helpers/asyncToGenerator";
import _regeneratorRuntime from "@babel/runtime/regenerator";

var marked = require('marked');

var TerminalRenderer = require('marked-terminal');

var _require = require('./getMarkdown.js'),
    getMarkdown = _require.getMarkdown;

var renderMarkdown = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
    var markdown;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return getMarkdown();

          case 2:
            markdown = _context.sent;
            marked.setOptions({
              renderer: new TerminalRenderer()
            });
            return _context.abrupt("return", marked(markdown));

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function renderMarkdown() {
    return _ref.apply(this, arguments);
  };
}();

exports.renderMarkdown = renderMarkdown;