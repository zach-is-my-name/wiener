import fs from "fs"
import {logger} from '../devLog/logger.js' 
logger.level = "debug"

import TurndownService from 'turndown';
import chalk from 'chalk';
import boxen from 'boxen'
import wrapAnsi from 'wrap-ansi';
import figures, {mainSymbols} from 'figures';
import cfonts from 'cfonts'
import figlet from 'figlet'
import terminalLink from 'terminal-link'
import {logo} from '../logo2.js'
import stripAnsi from 'strip-ansi'
import got from 'got'
const turndownOptions = {
  headingStyle: 'atx',
  bulletListMarker: '*',
}
const turndownFilter = ['script', 'footer', 'style', 'center', 'table'];

const turndownService = new TurndownService(turndownOptions);
turndownService.remove(turndownFilter);

let linkcount = -1
const linkObjArr = []

export const applyMarkdown = async (html) => {
  turndownService

    .addRule('center align h2: entry-title', {
      filter: (node, content) => /entry-title/.test(node.className),
      replacement: (content, node) => {
        const noBreakTag = content.replace(/\<br\>\s/g,"")
        const noLineBreak = noBreakTag.replace(/\r?\n|\r/, "")  
        return "\n" + `{center}{bold}${noLineBreak}{/bold}{/center}` +"\n"+"\n"
      }
    })

    .addRule("add box to title", { 
      filter: "title",
      replacement: (content) => {
        //giving the box a leading newline cures it
        const noAnsi = chalk.blue(stripAnsi(content))
        const box = boxen(noAnsi, {borderColor: 'grey', borderStyle: 'bold'})
        return ("\n" +  `{center}${box}` + "\n")
      }}
    ) 

    .addRule('chalk <strong> (<b>)', {
      filter: "strong",
      replacement: (content) => {
        return `{bold}${content}{/bold}`
      }
    })

    .addRule('replace <li> with unicode bullet' ,{
      filter: 'li',
      replacement: (content) => {
        const bullet = figures.bullet
        return `
${bullet} ${content}`
      }
    })

    .addRule('center align header', {
      filter: (node, content) => /site-header/.test(node.className),
      replacement: (content) => `{center}${content}{/center}`
    })

    .addRule('left align \"body\"', {
      filter: (node, content) => /entry-content/.test(node.className),
      replacement: (content) => `{left}${content}{/left}`
    })

    .addRule('remove h1; add logo', 
      {filter: (node) => /site-title/.test(node.className),
        replacement: (node) => `${logo}` })

    .addRule('remove subscribe link', 
      {filter:(node) => {return /menu-1/.test(node.className)},
        replacement: (node) => ""})

    .addRule( "sponsor", { 
      filter: (node, content) => node.nodeType === 1 && node.localName === 'h3' && /[tT]hanks\s?[Tt]o(.+?$)/.test(node.textContent),
      replacement: (content) => {
        let match = stripAnsi(content).match(/[tT]hanks\s?[Tt]o(.+?$)/)[1]
        const re2 = /(^[^\(]+)/
        match = match.match(/.*?[^!]+/)[0]
        match = match.match(re2)[1]
        return `{bold}${chalk.whiteBright(content)}{/bold} 


${figlet.textSync(match)}
 ` }})

    .addRule( "jobs", { 
filter: (node, content) => node.nodeType === 1 && node.localName === 'h3' && /[jJ]ob/.test(node.textContent),
      replacement: (content) => {
          return `{bold}${chalk.whiteBright(content)}{/bold}`
      }})

    .addRule("chalk h6", {
      filter: 'h6',
      replacement: (content) => {
        let text = chalk.bgAnsi256(103).bold(content);
        return chalk.bgAnsi256(103).bold(content)
      }})

    .addRule("link to terminalLink", {
      filter: 'a',
      replacement: (content, node) => {
        linkcount++
        const url =  node.getAttribute('href');
        linkObjArr.push({linkText: content, linkUrl: url})
        return `{underline}${content}{/underline}{invisible}${linkcount}{/invisible}`
      }})

    .addRule("advert image", {
      filter: 'img',
      replacement: (content,node) => {
        return ""
      }}
    )

  let markdown = await turndownService.turndown(html);
 
  fs.writeFileSync("/home/zmg/tmp/md2.md", markdown)
  return {markdown, linkObjArr};
  
}
