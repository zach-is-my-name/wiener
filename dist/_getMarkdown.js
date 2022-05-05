import _asyncToGenerator from "@babel/runtime/helpers/asyncToGenerator";
import _regeneratorRuntime from "@babel/runtime/regenerator";

var TurndownService = require('turndown');

var _require = require('./getLatestWien.js'),
    getLatestWien = _require.getLatestWien;

var turndownOptions = {
  headingStyle: 'atx',
  bulletListMarker: '*',
  linkStyle: 'referenced'
};
var turndownFilter = ['script', 'footer', 'style', 'nav', 'center'];
var turndownService = new TurndownService(turndownOptions);
turndownService.remove(turndownFilter);
turndownService.addRule("linksToObjects", {
  filter: ["a"],
  replacement: function replacementFunction(content, node, options) {
    var linkObj = JSON.stringify({
      linkText: "".concat(content),
      url: "".concat(node.getAttribute('href'))
    });
    return linkObj;
  }
});

var getMarkdown = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
    var html, markdown;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return getLatestWien();

          case 2:
            html = _context.sent;
            _context.next = 5;
            return turndownService.turndown(html);

          case 5:
            markdown = _context.sent;
            return _context.abrupt("return", markdown);

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getMarkdown() {
    return _ref.apply(this, arguments);
  };
}();

exports.getMarkdown = getMarkdown;