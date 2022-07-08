import ansiEscapes from 'ansi-escapes';
import blessed from 'neo-blessed'
import {reduce} from 'ramda'; 
import fs from 'fs'
import https from 'https'
const pipe = (...fns) => x => fns.reduce((y, f) => f(y), x); 
import stripAnsi from 'strip-ansi';
import figures, {mainSymbols} from 'figures';
import {_logger} from '../../devLog/logger.js';
import chalk from 'chalk';
import minify from 'url-minify';
import axios from 'axios'
const cert = fs.readFileSync('./certs/gd.pem')
import replaceAsync from 'string-replace-async'
const agent = new https.Agent({
  rejectUnauthorized: false, // (NOTE: this will disable client verification)
  ca: [cert] 
});

var axiosInstance = axios.create({ httpsAgent: agent });

export const formatBody = async (string) => {
  const output_final = pipe(
    lineBreakTopLevelStars,
    lineBreaksIndentedStars,  
    topLevelStarToBullet, 
    indentedStarToBullet,
    horizontalRule,  
    justifyLeft,
    await terminalLinks
  )(string);

  // return `{left}${output_final}{/left}`
  return output_final
}

const _stripAnsi = (string) => {
  return stripAnsi(string)
}

const justifyLeft = (string) => {
  return `{left}${string}{/left}`
}


const trimHeader = (string) => {
  const re = /^\*\*[^]+/m
  const body = string.match(re)
  //_logger.info({body}) 
  return body[0]
}

const removeH1 =  (string) => {
  const re = /\#{1}\s+?\[(Week\sin\sEthereum\sNews)\]\(https:\/\/weekinethereumnews\.com\/\)/ 
  return string.replace(re, '') 
}

const titleCenter = (string) => {
  const re = /(Week\s[I|i]n\sEthereum\sNews)/  
  const title = '$1' 
  return string.replace(re, `` )
}

const h6Format = (string) => {
  const re = /(#{6}\s\*\*)(.+?)\*\*/gm 
  const h6 = `${chalk.bold.bgAnsi256(103).white('$2')}`
  return  string.replace(re, `${h6}`)
}



const centerH2 = (string) => {
  const re = /\#\#\s(\[Week\sin\sEthereum\sNews)[^]+?(\w{3,}\s\d+.+?\d{4}\])(\(https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b[-a-zA-Z0-9()@:%_\+.~#?&//=]*\))/gm
  return string.replace('{center}$1{/center}\n' + '{center}$2{/center} \n' + '$3' )
}

const terminalLinks = async (string) => {
  const re = /\[([^]+?)\]\((https?:\/\/.*?)\)(.*)(\n)/g
  //_logger.info(re.test(string))
  const replacerFunction = async (p1, p2, p3, p4, p5)  => {
    const linkText = p2
    const url = p3 
    const untilEol = p4
    const linkBreak = p5
    const response = await axiosInstance.get(`https://is.gd/create.php?format=simple&url=` + `${url}`).catch(e => _logger.info("error FormatBody", e))
    const miniUrl = response.data
    const linkBracketStyle = chalk.ansi256(103).bold
    const styledUrl = chalk.hex('#303030')(miniUrl)
    const styledLinkText = chalk.underline(linkText)
    const point = figures.pointerSmall
    const reset = chalk.reset("")
    return `${styledLinkText}${untilEol}${point}${styledUrl}${reset}${linkBreak}` 
  }
  //
  const stringWithLinks =  await replaceAsync(string, re, replacerFunction)
  return stringWithLinks
  }

const removeUnderlineFromBreakH2 = (string) => {
  const re = /\#\#\s\[Week\sin\sEthereum\sNews(\s{1,}.+?)\]/gm  
  return string.replace(re, stripAnsi("$1 + \n") )
}

const addUnderlineToDate = (string) => {
  const re = /(\#\#\s\[Week\sin\sEthereum\sNews[^]+?)(\w{3,}\s\d+.+?\d{4})\]/gm
  return string.replace(re, "$1" + chalk.underline('$2'))  
}

//add breaks before bullets

const lineBreakTopLevelStars = string => {
  const re =/(?!\*\s\*)^\*\s.*/gm  
  return string.replace(re, '$& \n')
}

const lineBreaksIndentedStars = string => {
  const re =/(?!\*\s\*)(?!\n)^\s+\*\s.*/gm 
  return string.replace(re, '$& \n') 
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



const horizontalRule = (string) => {
  const re = /(?<!\*)(\*\s\*\s\*)(?!\*)/gm  
  const hr = figures.line.repeat(process.stdout.columns)
  return string.replace(re, hr)
}
