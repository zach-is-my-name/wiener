import _asyncToGenerator from "@babel/runtime/helpers/asyncToGenerator";
import _regeneratorRuntime from "@babel/runtime/regenerator";
import TurndownService from 'turndown';
var turndownOptions = {
  headingStyle: 'atx',
  bulletListMarker: '*'
};
var turndownFilter = ['script', 'footer', 'style', 'center'];
var turndownService = new TurndownService(turndownOptions);
turndownService.remove(turndownFilter);
turndownService.addRule("linkStyles", {
  filter: ["a"],
  replacement: function replacementFunction(content, node, options) {
    var url = "".concat(node.getAttribute('href'));
    return "[".concat(content, "]") + "(".concat(url, ")");
  }
});
export var applyMarkdown = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(html) {
    var markdown;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return turndownService.turndown(html);

          case 2:
            markdown = _context.sent;
            return _context.abrupt("return", markdown);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function applyMarkdown(_x) {
    return _ref.apply(this, arguments);
  };
}();