import {parse, stringify, toJSON, fromJSON} from 'flatted';
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

export const applyMarkdown = async (html) => {

  turndownService
    .addRule('center align h2: entry-title', {
      filter: (node, content) => /entry-title/.test(node.className),
      replacement: (content, node) => {
        const noBreakText = content.replace(/\<br\>\s/,"")
        return "\n" + `{center}${chalk.bold(noBreakText)}{/center}` +"\n"+"\n"
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
        return chalk.bold(content)
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

    .addRule('left aligh \"body\"', {
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
        return `${chalk.whiteBright.bold(content)} 


${figlet.textSync(match)}
 ` }})

    .addRule( "jobs", { 
filter: (node, content) => node.nodeType === 1 && node.localName === 'h3' && /[jJ]ob/.test(node.textContent),
      replacement: (content) => {
          return `${chalk.whiteBright.bold(content)}`
      }})

    .addRule("chalk h6", {
      filter: 'h6',
      replacement: (content) => {
        return chalk.bgAnsi256(103).bold(content)
      }})

      }})
    // .addRule("link to terminalLink", {
    //   filter: 'a',
    //   replacement: (content, node) => {
    //     const url =  node.getAttribute('href');
    //     return `\u001b]8;;${url},\u0007${content}\u001b]8;;\u0007` 
    //   }})

    .addRule("advert image", {
      filter: 'img',
      replacement: (content,node) => {
        return ""
      }}
    )


  function inHtmlContext(node, selector) {
    let currentNode = node;
    // start at the closest element
    while (currentNode != null && currentNode.nodeType !== 1) {
      currentNode = currentNode.parentElement || currentNode.parentNode;
    }
    return (
      currentNode !== null
      && currentNode.nodeType === 1
      && currentNode.closest(selector) !== null
    );
  }

  let markdown = await turndownService.turndown(html);

  const markdownLinkRe = /\[([^]+?)\]\((https?:\/\/.*?)\)/g
 
  let linkcount = -1
  const linkObjArr = []
  function replacer(match, p1, p2) {
    linkcount++
    linkObjArr.push({linkText: p1, linkUrl: p2})
    return `{underline}${p1}{/underline}{invisible}${linkcount}{/invisible}`
  }

  markdown = markdown.replace(markdownLinkRe, replacer)

  return {markdown, linkObjArr};
}
