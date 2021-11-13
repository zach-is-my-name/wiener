import ansiEscapes from 'ansi-escapes';
import {reduce} from 'ramda'; 
import stripAnsi from 'strip-ansi';
import figures, {mainSymbols} from 'figures';
import chalk from 'chalk';
//const blessedChalk = new chalk.Instance({level: 2});
const pipe = (...fns) => x => fns.reduce((y, f) => f(y), x); 

const log3 = require('simple-node-logger').createSimpleFileLogger('/home/zmg/Tinker/wiener/logs/log3.log');


export const formatText = (string) => {

  const output_final = pipe(_stripAnsi, removeH1, /*terminalLinks,*/ removeUnderlineFromBreakH2 , starToBullet, addUnderlines, h6Format)(string);

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
}

const starToBullet = (string) => {
  const re = /\*((?!\*)) /gm
  const bullet = figures.bullet
  return string.replace(re, `${bullet}$1`)
}


const h6Format = (string) => {
  const re = /#{6}\s\*\*(.+?)\*\*/gm 
  return string.replace(re, chalk.bgHex('#af87d7')('$1'))
}

