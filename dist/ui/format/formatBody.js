import _asyncToGenerator from "@babel/runtime/helpers/asyncToGenerator";
import _regeneratorRuntime from "@babel/runtime/regenerator";
import ansiEscapes from 'ansi-escapes';
import blessed from 'neo-blessed';
import { reduce } from 'ramda';
import fs from 'fs';
import https from 'https';

var pipe = function pipe() {
  for (var _len = arguments.length, fns = new Array(_len), _key = 0; _key < _len; _key++) {
    fns[_key] = arguments[_key];
  }

  return function (x) {
    return fns.reduce(function (y, f) {
      return f(y);
    }, x);
  };
};

import stripAnsi from 'strip-ansi';
import figures, { mainSymbols } from 'figures';
import chalk from 'chalk';
import minify from 'url-minify';
import axios from 'axios';
import { _logger } from '../logger.js';
var cert = fs.readFileSync('./certs/gd.pem');
import replaceAsync from 'string-replace-async';
var agent = new https.Agent({
  rejectUnauthorized: false,
  // (NOTE: this will disable client verification)
  ca: [cert]
});
var axiosInstance = axios.create({
  httpsAgent: agent
});
export var formatBody = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(string) {
    var output_final;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.t0 = pipe;
            _context.t1 = _stripAnsi;
            _context.t2 = trimHeader;
            _context.t3 = h6Format;
            _context.t4 = lineBreakTopLevelStars;
            _context.t5 = lineBreaksIndentedStars;
            _context.t6 = topLevelStarToBullet;
            _context.t7 = indentedStarToBullet;
            _context.t8 = horizontalRule;
            _context.next = 11;
            return terminalLinks;

          case 11:
            _context.t9 = _context.sent;
            _context.t10 = (0, _context.t0)(_context.t1, _context.t2, _context.t3, _context.t4, _context.t5, _context.t6, _context.t7, _context.t8, _context.t9);
            output_final = (0, _context.t10)(string);
            return _context.abrupt("return", output_final);

          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function formatBody(_x) {
    return _ref.apply(this, arguments);
  };
}();

var _stripAnsi = function _stripAnsi(string) {
  return stripAnsi(string);
};

var trimHeader = function trimHeader(string) {
  var re = /^\*\*[^]+/m;
  var body = string.match(re); //_logger.info({body}) 

  return body[0];
};

var removeH1 = function removeH1(string) {
  var re = /\#{1}\s+?\[(Week\sin\sEthereum\sNews)\]\(https:\/\/weekinethereumnews\.com\/\)/;
  return string.replace(re, '');
};

var titleCenter = function titleCenter(string) {
  var re = /(Week\s[I|i]n\sEthereum\sNews)/;
  var title = '$1';
  return string.replace(re, "");
};

var h6Format = function h6Format(string) {
  var re = /(#{6}\s\*\*)(.+?)\*\*/gm;
  var h6 = "".concat(chalk.bold.bgAnsi256(103).white('$2'));
  return string.replace(re, "".concat(h6));
};

var centerH2 = function centerH2(string) {
  var re = /\#\#\s(\[Week\sin\sEthereum\sNews)[^]+?(\w{3,}\s\d+.+?\d{4}\])(\(https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b[-a-zA-Z0-9()@:%_\+.~#?&//=]*\))/gm;
  return string.replace('{center}$1{/center}\n' + '{center}$2{/center} \n' + '$3');
};

var terminalLinks = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3(string) {
    var re, replacerFunction, stringWithLinks;
    return _regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            re = /\[([^]+?)\]\((https?:\/\/.*?)\)(.*)(\n)/g; //_logger.info(re.test(string))

            replacerFunction = /*#__PURE__*/function () {
              var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(p1, p2, p3, p4, p5) {
                var linkText, url, untilEol, linkBreak, response, miniUrl, linkBracketStyle, styledUrl, styledLinkText, point, reset;
                return _regeneratorRuntime.wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        linkText = p2;
                        url = p3;
                        untilEol = p4;
                        linkBreak = p5;
                        _context2.next = 6;
                        return axiosInstance.get("https://is.gd/create.php?format=simple&url=" + "".concat(url))["catch"](function (e) {
                          return _logger.info(e);
                        });

                      case 6:
                        response = _context2.sent;
                        miniUrl = response.data;
                        linkBracketStyle = chalk.ansi256(103).bold;
                        styledUrl = chalk.hex('#303030')(miniUrl);
                        styledLinkText = chalk.underline(linkText);
                        point = figures.pointerSmall;
                        reset = chalk.reset("");
                        return _context2.abrupt("return", "".concat(styledLinkText).concat(untilEol).concat(point).concat(styledUrl).concat(reset).concat(linkBreak));

                      case 14:
                      case "end":
                        return _context2.stop();
                    }
                  }
                }, _callee2);
              }));

              return function replacerFunction(_x3, _x4, _x5, _x6, _x7) {
                return _ref3.apply(this, arguments);
              };
            }(); //


            _context3.next = 4;
            return replaceAsync(string, re, replacerFunction);

          case 4:
            stringWithLinks = _context3.sent;
            return _context3.abrupt("return", stringWithLinks);

          case 6:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function terminalLinks(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

var removeUnderlineFromBreakH2 = function removeUnderlineFromBreakH2(string) {
  var re = /\#\#\s\[Week\sin\sEthereum\sNews(\s{1,}.+?)\]/gm;
  return string.replace(re, stripAnsi("$1 + \n"));
};

var addUnderlineToDate = function addUnderlineToDate(string) {
  var re = /(\#\#\s\[Week\sin\sEthereum\sNews[^]+?)(\w{3,}\s\d+.+?\d{4})\]/gm;
  return string.replace(re, "$1" + chalk.underline('$2'));
}; //add breaks before bullets


var lineBreakTopLevelStars = function lineBreakTopLevelStars(string) {
  var re = /(?!\*\s\*)^\*\s.*/gm;
  return string.replace(re, '$& \n');
};

var lineBreaksIndentedStars = function lineBreaksIndentedStars(string) {
  var re = /(?!\*\s\*)(?!\n)^\s+\*\s.*/gm;
  return string.replace(re, '$& \n');
};

var topLevelStarToBullet = function topLevelStarToBullet(string) {
  var re = /(?!\*\s\*)^\*\s(.*)/gm;
  var bullet = figures.bullet;
  return string.replace(re, "".concat(bullet, " $1"));
};

var indentedStarToBullet = function indentedStarToBullet(string) {
  var re = /(?!\*\s\*)(?!\n)^(\s+)\*\s(.*)/gm;
  var bullet = figures.bullet;
  return string.replace(re, "$1".concat(bullet, " $2"));
};

var horizontalRule = function horizontalRule(string) {
  var re = /(?<!\*)(\*\s\*\s\*)(?!\*)/gm;
  var hr = figures.line.repeat(process.stdout.columns);
  return string.replace(re, hr);
};