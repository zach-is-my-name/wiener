const TurndownService = require('turndown');
const {getLatestWien} = require('./getLatestWien.js');
//const {replacementFunction} = require('./replacementFunction')
//turndown 
const turndownOptions = {
  headingStyle: 'atx',
  bulletListMarker: '*',
	linkStyle: 'referenced',
}
const turndownFilter = ['script', 'footer', 'style', 'nav', 'center'];

const turndownService = new TurndownService(turndownOptions);
turndownService.remove(turndownFilter);
turndownService.addRule("linksToObjects", {
  filter: ["a"],
  replacement: function replacementFunction (content, node, options) {
    let linkRefCount = 0
    const linkText =   `[${content}]`;
    const url = `(${node.getAttribute('href')})`
    const buttonBoxOpen = `<ButtonBox url={${url}} refProp={link${linkRefCount++}}>`
    const linkButtonOpen = `<LinkButton>`
    const underlineOpen = "{underline}"

    const underlineClose = " {/underline}"
    const linkButtonClose ="</LinkButton>" 
    const buttonBoxClose = "</ButtonBox>"

    const openTags = buttonBoxOpen + linkButtonOpen 
    const closeTags =  linkButtonClose + buttonBoxClose  

    return  openTags + linkText +  closeTags 
  }
})

const getMarkdown = async () => {
  const html = await getLatestWien() 
  const markdown = await turndownService.turndown(html);
  //console.log('markdown', markdown)
  return markdown;
}

exports.getMarkdown = getMarkdown;

//<ButtonBox  url={${}}>













