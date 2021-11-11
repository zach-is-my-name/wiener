import ansiEscapes from 'ansi-escapes';
import {reduce} from 'ramda'; 
import stripAnsi from 'strip-ansi';
import chalk from 'chalk';
const pipe = (...fns) => x => fns.reduce((y, f) => f(y), x); 

const log3 = require('simple-node-logger').createSimpleFileLogger('/home/zmg/Tinker/wiener/logs/log3.log');


export const formatText = (string) => {

  const output_final = pipe(_stripAnsi, /*removeH1,*/ /*terminalLinks,*/ removeUnderlineFromBreakH2 , addUnderlines)(string);

  return output_final
}

const _stripAnsi = (string) => {
  return stripAnsi(string)
}

const removeH1 =  (string) => {
  const re = /\#{1}\s+?\[Week\sin\sEthereum\sNews\]\(https:\/\/weekinethereumnews\.com\/\)/ 

  return string.replace(re, "") 
}

const terminalLinks = (string) => {

  const re = /\[(.+?)\]\((https?:\/\/.*)\)/g

  log3.info(re.test(string))

  return string.replace(re, ansiEscapes.link('$1', '$2'))
}

const addUnderlines = (string) => {
  const re = /\[([^\][]*)]/g
  ///\[|\]/g
  return string.replace(re, chalk.underline('$1')) 
}

const removeUnderlineFromBreakH2 = (string) => {
  const re = /\#\#\s\[Week\sin\sEthereum\sNews(\s{1,}.+?)\]/gm  
  const group = re.exec(string)[1]
  //log3.info({match: string.match(re), capture: group})
  return string.replace(re, stripAnsi(group))
  return string
}
