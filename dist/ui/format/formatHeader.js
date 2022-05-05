import _asyncToGenerator from "@babel/runtime/helpers/asyncToGenerator";
import _regeneratorRuntime from "@babel/runtime/regenerator";
import ansiEscapes from 'ansi-escapes';
import blessed from 'neo-blessed';
import { reduce } from 'ramda';
import fs from 'fs';

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
import { _logger } from '../logger.js';
export var formatHeader = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(string) {
    var output_final;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            output_final = pipe(_stripAnsi, trimBody, removeH1, removeTopTitle, h2Format, h6Format, trimH2 // addUnderlineToDate, 
            )(string);
            return _context.abrupt("return", output_final);

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function formatHeader(_x) {
    return _ref.apply(this, arguments);
  };
}();

var trimBody = function trimBody(string) {
  var re = /(^[^]+?#{6}[^]+?\*\*[^]+?\*\*)/m;
  var header = string.match(re)[1];
  return header;
};

var _stripAnsi = function _stripAnsi(string) {
  return stripAnsi(string);
};

var removeH1 = function removeH1(string) {
  var re = /\#{1}\s+?\[(Week\sin\sEthereum\sNews)\]\(https:\/\/weekinethereumnews\.com\/\)/;
  return string.replace(re, '');
};

var removeTopTitle = function removeTopTitle(string) {
  var re = /\s+Week\s[i|I]n\sEthereum\sNews/m;
  return string.replace(re, '');
};

var h6Format = function h6Format(string) {
  var re = /(#{6}\s\*\*)(.+?)\*\*/gm;
  var h6 = "".concat(chalk.bold.bgAnsi256(103)(' $2 '));
  return string.replace(re, "".concat(h6, "\n\n"));
};

var h2Format = function h2Format(string) {
  var re = /\#\#\s\[(Week\sin\sEthereum\sNews)[^]+?(\w{3,}\s\d+.+?\d{4})\]\((https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b[-a-zA-Z0-9()@:%_\+.~#?&//=]*)\)/gm;

  _logger.info({
    h2FormatRE: re.test(string)
  });

  var group1 = chalk.bgWhite.black(' $1 ') + '\n';
  var group2 = chalk.bgWhite.black(' $2 ') + '\n' + '\n';
  var group3 = '$3 \n\n\n';
  return string.replace(re, group1 + group2 + group3);
};

var trimH2 = function trimH2(string) {
  var re = /\#\#\s\[Week\sin\sEthereum\sNews[^]+?(\w{3,}\s\d+.+?\d{4})\]/gm;

  _logger.info({
    match: string.match(re)
  });

  return string.replace('$1');
};

var removeUnderlineFromBreakH2 = function removeUnderlineFromBreakH2(string) {
  var re = /\#\#\s\[Week\sin\sEthereum\sNews(\s{1,}.+?)\]/gm;
  return string.replace(re, stripAnsi("$1 + \n"));
};

var addUnderlineToDate = function addUnderlineToDate(string) {
  var re = /(\#\#\s\[Week\sin\sEthereum\sNews[^]+?)(\w{3,}\s\d+.+?\d{4})\]/gm;
  return string.replace(re, "$1" + chalk.underline('$2'));
};