import chalk from 'chalk';
import  TurndownService from 'turndown';
import {getLatestWien} from './getLatestWien.js';
import terminalLink from 'terminal-link'

const turndownOptions = {
  headingStyle: 'atx',
  bulletListMarker: '*',
}
const turndownFilter = ['script', 'footer', 'style', 'nav', 'center'];

const turndownService = new TurndownService(turndownOptions);
turndownService.remove(turndownFilter);

 turndownService.addRule("linkStyles", {
  filter: ["a"],
  replacement: function replacementFunction (content, node, options) {
     const url =  `${node.getAttribute('href')}`; 
     //const underlinedLinkText = chalk.underline(content)
     return `\[${content}\]`+`\(${url}\)`
    }
  }) 
const getMarkdown = async () => {
  const html = await getLatestWien() 
  const markdown = await turndownService.turndown(html);
  return markdown;
}

exports.getMarkdown = getMarkdown;














