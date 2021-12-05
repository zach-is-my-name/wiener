import ansiEscapes from 'ansi-escapes';
import blessed from 'neo-blessed'
import {reduce} from 'ramda'; 
import fs from 'fs'
const pipe = (...fns) => x => fns.reduce((y, f) => f(y), x); 
import stripAnsi from 'strip-ansi';
import figures, {mainSymbols} from 'figures';
import chalk from 'chalk';
import {_logger} from './logger';

export const formatHeader = (string) => {
  const output_final = pipe(
    _stripAnsi,  
    trimBody,
    removeH1, 
    removeTopTitle,
    //trimH2,
    h2Format,
    h6Format, 
    trimH2,
   // addUnderlineToDate, 
  )(string);

  return output_final
}

const trimBody = (string) => {
  const re = /(^[^]+?#{6}[^]+?\*\*[^]+?\*\*)/m 
  const header = string.match(re)[1] 
  return header 
}

const _stripAnsi = (string) => {
  return stripAnsi(string)
}

const removeH1 =  (string) => {
  const re = /\#{1}\s+?\[(Week\sin\sEthereum\sNews)\]\(https:\/\/weekinethereumnews\.com\/\)/ 
  return string.replace(re, '') 
}
const removeTopTitle = (string) => {
 const re = /\s+Week\s[i|I]n\sEthereum\sNews/m
 return string.replace(re, '')
}

const h6Format = (string) => {
  const re = /(#{6}\s\*\*)(.+?)\*\*/gm 
  const h6 = `${chalk.bold.bgAnsi256(103)(' $2 ')}`
  return  string.replace(re, `${h6}\n\n`)
}
const h2Format = (string) => {
  const re = /\#\#\s\[(Week\sin\sEthereum\sNews)[^]+?(\w{3,}\s\d+.+?\d{4})\]\((https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b[-a-zA-Z0-9()@:%_\+.~#?&//=]*)\)/gm
  _logger.info({h2FormatRE: re.test(string)})
  const group1 = chalk.bgWhite.black(' $1 ')+'\n'
  const group2 = chalk.bgWhite.black(' $2 ')+'\n'+'\n'
  const group3 = '$3 \n\n\n'
  return string.replace(re, group1+group2+group3)
}

const trimH2 = (string) => {
  const re = /\#\#\s\[Week\sin\sEthereum\sNews[^]+?(\w{3,}\s\d+.+?\d{4})\]/gm  
  _logger.info({match:string.match(re)})
  return string.replace('$1')
}


const removeUnderlineFromBreakH2 = (string) => {
  const re = /\#\#\s\[Week\sin\sEthereum\sNews(\s{1,}.+?)\]/gm  
  return string.replace(re, stripAnsi("$1 + \n") )
}

const addUnderlineToDate = (string) => {
  const re = /(\#\#\s\[Week\sin\sEthereum\sNews[^]+?)(\w{3,}\s\d+.+?\d{4})\]/gm
  return string.replace(re, "$1" + chalk.underline('$2'))  
}








