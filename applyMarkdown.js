import  TurndownService from 'turndown';
import {useGetWien} from './useGetWien.js';

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
     return `\[${content}\]`+`\(${url}\)`
  }
}) 

export const applyMarkdown = async (html) => {
  const markdown = await turndownService.turndown(html);
  return markdown;
}















