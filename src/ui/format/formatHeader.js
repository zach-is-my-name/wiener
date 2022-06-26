import ansiEscapes from 'ansi-escapes';
import blessed from 'neo-blessed'
import {reduce} from 'ramda'; 
import fs from 'fs'
const pipe = (...fns) => x => fns.reduce((y, f) => f(y), x); 
import stripAnsi from 'strip-ansi';
import figures, {mainSymbols} from 'figures';
import chalk from 'chalk';
import {_logger} from '../../devLog/logger.js';

export const formatHeader = (string) => {
  const output_final = pipe(
    _stripAnsi,  
    removeDateTitleAndSubscribe,
    trimBody,
    removeH1, 
    //h6Format, 
    h2Format,
    trimH2,
    removeTopTitle,
    formatMainTitle1,
  )(string);
  // _logger.info(string)
  return `{center}${output_final}\n{/}{/}\n\n`
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
  _logger.info(h6)
   return  string.replace(re, `${h6}\n\n`)
}

const h2Format = (string) => {
  const re = /\#\#\s\[(Week\sin\sEthereum\sNews)[^]+?(\w{3,}\s\d+.+?\d{4})\]\((https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b[-a-zA-Z0-9()@:%_\+.~#?&//=]*)\)/gm
  // _logger.info({h2FormatRE: re.test(string)})
  const group1 = chalk.bgWhite.black(' $1 ')+'\n'
  const group2 = chalk.bgWhite.black(' $2 ')+'\n'+'\n'
  const group3 = '$3 \n\n\n'
  return string.replace(re, group1+group2+group3)
}

const trimH2 = (string) => {
  const re = /\#\#\s\[Week\sin\sEthereum\sNews[^]+?(\w{3,}\s\d+.+?\d{4})\]/gm  
  //_logger.info({match:string.match(re)})
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

const removeDateTitleAndSubscribe = (string) => {
  const re = /[\s\S]+?##/
  return string.replace(re, "")
}

const formatMainTitle1 = (string) => {
  const re = /\[(Week in Ethereum News[^]+?)\]/m
  const removedBrackets = string.match(re)
  _logger.info(removedBrackets[1])
   // return string
  return (`${removedBrackets[1]}


${chalk.bold.bgAnsi256(103)('Eth News and Links ')}


`)
}
