import cheerio from 'cheerio'
import TurndownService from 'turndown';
import chalk from 'chalk';
import figures, {mainSymbols} from 'figures';
import cfonts from 'cfonts'
import blessed from 'blessed'
import figlet from 'figlet'
import stripAnsi from 'strip-ansi'
const turndownOptions = {
  headingStyle: 'atx',
  bulletListMarker: '*',
}
const turndownFilter = ['script', 'footer', 'style', 'center', 'table'];

const turndownService = new TurndownService(turndownOptions);
turndownService.remove(turndownFilter);

export const applyMarkdown = async (sourceHtml) => {
const $ = cheerio.load(sourceHtml)

$('h1').children('a').contents().unwrap() //remove h1 anchor tag
$('.menu-signup-container').remove()
$('.site-header').children('center').remove()
$('table').remove()
$('title').remove()
$('h1').remove()
const html = $.root().html() 			

turndownService
    .addRule('center align h2: entry-title', {
      filter: (node, content) => /entry-title/.test(node.className),
      replacement: (content, node) => {
        const noBreakTag = content.replace(/\<br\>\s/g,"")
        const noLineBreak = noBreakTag.replace(/\r?\n|\r/, "")  
        return "\n" + `{center}${noLineBreak}{/center}` +"\n"+"\n"
      }
    })

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

    .addRule('left align \"body\"', {
      filter: (node, content) => /entry-content/.test(node.className),
      replacement: (content) => `{left}${content}{/left}`
    })

    .addRule( "sponsor", { 
      filter: (node, content) => node.nodeType === 1 && node.localName === 'h3' && /[tT]hanks\s?[Tt]o(.+?$)/.test(node.textContent),
      replacement: (content) => {
        let match = blessed.stripTags(content).match(/[tT]hanks\s?[Tt]o(.+?$)/)
        match = match[1].trim()
        const orgLinkRegex = /(.*?)\s\[\d\d\]/ 
        const orgFirstWordRegex = /^([\S]+)/

        if (orgLinkRegex.test(match)) {
          match = match.match(orgLinkRegex)[1]
        } else if (orgFirstWordRegex.test(match)) {
          match = match.match(orgFirstWordRegex)[1]
        } 
        return `{bold}${chalk.whiteBright(content)}{/bold} 


${figlet.textSync(match)}
 ` }})

    .addRule( "jobs", { 
filter: (node, content) => node.nodeType === 1 && node.localName === 'h3' && /[jJ]ob/.test(node.textContent),
      replacement: (content) => {
          return `${chalk.whiteBright(content)}`
      }})

    .addRule("chalk h6", {
      filter: 'h6',
      replacement: (content) => {
        let text = chalk.bgAnsi256(103).bold(content);
        return chalk.bgAnsi256(103).bold(content)
      }})


    .addRule("advert image", {
      filter: 'img',
      replacement: (content,node) => {
        return ""
      }})

    .addRule('remove subscribe link', 
      {filter:(node) => {return /menu-1/.test(node.className)},
        replacement: (node) => ""})

    .addRule("link to terminalLink", {
      filter: 'a',
      replacement: (content, node) => {
        const url =  node.getAttribute('href');
          return `{underline}${content}{/underline} $$${url}$$`
      }})

  let markdown = await turndownService.turndown(html);
  markdown = markdown.trim()
  markdown =  "\n" + markdown 
  return {markdown};
}
