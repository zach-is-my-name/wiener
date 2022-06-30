import {parse, stringify, toJSON, fromJSON} from 'flatted';

import TurndownService from 'turndown';

import chalk from 'chalk';
import boxen from 'boxen'
import {logo} from '../eth_logo.js'
import stripAnsi from 'strip-ansi'
const turndownOptions = {
  headingStyle: 'atx',
  bulletListMarker: '*',
}
const turndownFilter = ['script', 'footer', 'style', 'center', 'table'];

const turndownService = new TurndownService(turndownOptions);
turndownService.remove(turndownFilter);

turndownService
  .addRule('remove h1', 
   {filter: (node) => /site-title/.test(node.className),
    replacement: () => `${logo}`
   
   }
  )
  .remove( 
    (node) => {
      return /menu-1/.test(node.className)
    }
  )

  .addRule( 
    "box-title", 
    { 
      filter: "title",
      replacement: (content,node) => {
        const fmtText = chalk.blue(content) 
        return `\n${boxen(fmtText, {borderColor: 'gray', borderStyle: 'bold'})}`
        }
      }) 
  


.addRule(
  "style-h3",
  {
    filter: 'h3',
    replacement: (content) => {
      return chalk.bgCyan.whiteBright.bold(content) 
    }
  }
)
// .addRule(
  // {
  // filter: "a",
  // replacement: function replacementFunction (content, node, options) {
  //    const url =  `${node.getAttribute('href')}`; 
  //    return `\[${content}\]`+`\(${url}\)`
  // }
// }
  // )
export const applyMarkdown = async (html) => {
  const markdown = await turndownService.turndown(html);
  return markdown;
}

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















