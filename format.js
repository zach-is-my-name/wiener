import ansiEscapes from 'ansi-escapes';
import {reduce} from 'ramda'; 
import fs from 'fs'
import https from 'https'
const pipe = (...fns) => x => fns.reduce((y, f) => f(y), x); 
import stripAnsi from 'strip-ansi';
import figures, {mainSymbols} from 'figures';
import chalk from 'chalk';
import minify from 'url-minify';
import axios from 'axios'
import {_logger} from './logger';
const cert = fs.readFileSync('./certs/gd.pem')
import replaceAsync from 'string-replace-async'
const agent = new https.Agent({
  rejectUnauthorized: false, // (NOTE: this will disable client verification)
  ca: [cert] 
});

var axiosInstance = axios.create({ httpsAgent: agent });

export const formatText = async (string) => {
  const output_final = pipe(_stripAnsi, removeH1, addUnderlineToDate, topLevelStarToBullet, indentedStarToBullet, /*addUnderlines,*/ h6Format, sectionBold, horizontalRule, await terminalLinks)(string);

  return output_final
}

const _stripAnsi = (string) => {
  return stripAnsi(string)
}

const removeH1 =  (string) => {
  const re = /\#{1}\s+?\[Week\sin\sEthereum\sNews\]\(https:\/\/weekinethereumnews\.com\/\)/ 

  return string.replace(re, "") 
}

const terminalLinks = async (string) => {
  const re = /\[(.+?)\]\((https?:\/\/.*?)\)(.*)(\n)/g

  const replacerFunction = async (p1, p2, p3, p4, p5)  => {
    const linkText = p2
    const url = p3 
    const untilEol = p4
    const linkBreak = p5
    const response = await axiosInstance.get(`https://is.gd/create.php?format=simple&url=` + `${url}`).catch(e => _logger.info(e))
    const miniUrl = response.data
    const linkBracketStyle = chalk.ansi256(103).bold
    const styledUrl = chalk.hex('#303030')(miniUrl)
    const point = figures.pointerSmall
    return `${chalk.underline(linkText)}${untilEol}${point}${styledUrl}${linkBreak}` 
  }
  const stringWithLinks =  await replaceAsync(string, re, replacerFunction)
   return stringWithLinks
  //   return string
}

const addUnderlines = (string) => {
  const re = /\[([^\][]*)]/g
  ///\[|\]/g
  return string.replace(re, chalk.underline('$1')) 
}

const removeUnderlineFromBreakH2 = (string) => {
  const re = /\#\#\s\[Week\sin\sEthereum\sNews(\s{1,}.+?)\]/gm  
  const group = re.exec(string)[1]
  return string.replace(re, stripAnsi(group))
}

const addUnderlineToDate = (string) => {
  const re = /\#\#\s\[Week\sin\sEthereum\sNews[^]+?(\w{3,}\s\d+.+?\d{4})\]/gm
  return string.replace(re, chalk.underline('$1'))  
}

const topLevelStarToBullet = (string) => {
  const re = /(?!\*\s\*)^\*\s(.*)/gm
  const bullet = figures.bullet
  return string.replace(re, `${bullet} $1`)
}

const indentedStarToBullet = (string) => {
  const re =/(?!\*\s\*)(?!\n)^(\s+)\*\s(.*)/gm 
  const bullet = figures.bullet
  return string.replace(re, `$1${bullet} $2`)
}

const h6Format = (string) => {
  const re = /#{6}\s\*\*(.+?)\*\*/gm 
  return string.replace(re, chalk.bold.white.bgAnsi256(103)('$1'))
}

const sectionBold = (string) => {
  const re =/^\*{2}(?!\*+)(.+?)\*\*/gm 
  return string.replace(re, chalk.whiteBright.bold('$1'))
}

const horizontalRule = (string) => {
  const re = /(?<!\*)(\*\s\*\s\*)(?!\*)/gm  
  const hr = figures.line.repeat(process.stdout.columns)
  return string.replace(re, hr)
}
