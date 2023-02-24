import _asyncToGenerator from "@babel/runtime/helpers/asyncToGenerator";
import _regeneratorRuntime from "@babel/runtime/regenerator";
import cheerio from 'cheerio';
import TurndownService from 'turndown';
import chalk from 'chalk';
import figures, { mainSymbols } from 'figures';
import blessed from 'blessed';
import figlet from 'figlet';
import stripAnsi from 'strip-ansi';
var turndownOptions = {
  headingStyle: 'atx',
  bulletListMarker: '*'
};
var turndownFilter = ['script', 'footer', 'style', 'center', 'table'];
var turndownService = new TurndownService(turndownOptions);
turndownService.remove(turndownFilter);
export var applyMarkdown = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(sourceHtml) {
    var $, html, markdown;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          $ = cheerio.load(sourceHtml);
          $('h1').children('a').contents().unwrap(); //remove h1 anchor tag
          $('.menu-signup-container').remove();
          $('.site-header').children('center').remove();
          $('table').remove();
          $('title').remove();
          $('h1').remove();
          html = $.root().html();
          turndownService.addRule('center align h2: entry-title', {
            filter: function filter(node, content) {
              return /entry-title/.test(node.className);
            },
            replacement: function replacement(content, node) {
              var noBreakTag = content.replace(/\<br\>\s/g, "");
              var noLineBreak = noBreakTag.replace(/\r?\n|\r/, "");
              return "\n" + "{center}".concat(noLineBreak, "{/center}") + "\n" + "\n";
            }
          }).addRule('chalk <strong> (<b>)', {
            filter: "strong",
            replacement: function replacement(content) {
              return "{bold}".concat(content, "{/bold}");
            }
          }).addRule('replace <li> with unicode bullet', {
            filter: 'li',
            replacement: function replacement(content) {
              var bullet = figures.bullet;
              return "\n".concat(bullet, " ").concat(content);
            }
          }).addRule('left align \"body\"', {
            filter: function filter(node, content) {
              return /entry-content/.test(node.className);
            },
            replacement: function replacement(content) {
              return "{left}".concat(content, "{/left}");
            }
          }).addRule("sponsor", {
            filter: function filter(node, content) {
              return node.nodeType === 1 && node.localName === 'h3' && /[tT]hanks\s?[Tt]o(.+?$)/.test(node.textContent);
            },
            replacement: function replacement(content) {
              var match = blessed.stripTags(content).match(/[tT]hanks\s?[Tt]o(.+?$)/);
              match = match[1].trim();
              var orgLinkRegex = /(.*?)\s\[\d\d\]/;
              var orgFirstWordRegex = /^([\S]+)/;
              if (orgLinkRegex.test(match)) {
                match = match.match(orgLinkRegex)[1];
              } else if (orgFirstWordRegex.test(match)) {
                match = match.match(orgFirstWordRegex)[1];
              }
              return "{bold}".concat(chalk.whiteBright(content), "{/bold} \n\n\n").concat(figlet.textSync(match), "\n ");
            }
          }).addRule("jobs", {
            filter: function filter(node, content) {
              return node.nodeType === 1 && node.localName === 'h3' && /[jJ]ob/.test(node.textContent);
            },
            replacement: function replacement(content) {
              return "".concat(chalk.whiteBright(content));
            }
          }).addRule("chalk h6", {
            filter: 'h6',
            replacement: function replacement(content) {
              var text = chalk.bgAnsi256(103).bold(content);
              return chalk.bgAnsi256(103).bold(content);
            }
          }).addRule("advert image", {
            filter: 'img',
            replacement: function replacement(content, node) {
              return "";
            }
          }).addRule('remove subscribe link', {
            filter: function filter(node) {
              return /menu-1/.test(node.className);
            },
            replacement: function replacement(node) {
              return "";
            }
          }).addRule("link to terminalLink", {
            filter: 'a',
            replacement: function replacement(content, node) {
              var url = node.getAttribute('href');
              return "{underline}".concat(content, "{/underline} $$").concat(url, "$$");
            }
          });
          _context.next = 11;
          return turndownService.turndown(html);
        case 11:
          markdown = _context.sent;
          markdown = markdown.trim();
          markdown = "\n" + markdown;
          return _context.abrupt("return", {
            markdown: markdown
          });
        case 15:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function applyMarkdown(_x) {
    return _ref.apply(this, arguments);
  };
}();
//# sourceMappingURL=applyMarkdown.js.map