import ansiEscapes from 'ansi-escapes';
import blessed from 'neo-blessed'
import {reduce} from 'ramda'; 
import fs from 'fs'
const pipe = (...fns) => x => fns.reduce((y, f) => f(y), x); 
import stripAnsi from 'strip-ansi';
import figures, {mainSymbols} from 'figures';
import chalk from 'chalk';
import {_logger} from '../../devLog/logger.js';

export const formatPostFormat = (string) => {
  const output_final = pipe(
    sectionBold,
   // correctSectionError,     
  )(string);

  return output_final
}
const sectionBold = (string) => {
  const re =/^\*{2}(?!\*+)(.+?)\*{2}$/gm 
  const style = chalk.whiteBright.bold(stripAnsi('$1'))
  //const style = '$1'
  return string.replace(re, `\n    ${style}\n`)
}









