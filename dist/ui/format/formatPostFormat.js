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
export var formatPostFormat = function formatPostFormat(string) {
  var output_final = pipe(sectionBold // correctSectionError,     
  )(string);
  return output_final;
};

var sectionBold = function sectionBold(string) {
  var re = /^\*{2}(?!\*+)(.+?)\*{2}$/gm;
  var style = chalk.whiteBright.bold(stripAnsi('$1')); //const style = '$1'

  return string.replace(re, "\n    ".concat(style, "\n"));
};