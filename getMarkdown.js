const TurndownService = require('turndown');
const {getLatestWien} = require('./getLatestWien.js');

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
  replacement: function (content, node, options) {
    let linkRefCount = 0
    const linkText = "${underline}" + `${content}` + "${/underline}"
    const ref = "ref="
    const linkRef = `${linkRefCount}`
    const openTags = "<OutterButton><InnerButton>${underline}"
    const urlText = `${node.getAttribute('href')}`
    const closeTags = " ${/underline}</InnerButton></OutterButtonn>"
    linkRefCount++

    return linkText + ref + linkRef + openTags + urlText + closeTags 
  }
})

const getMarkdown = async () => {
  const html = await getLatestWien() 
  const markdown = await turndownService.turndown(html);
  //console.log('markdown', markdown)
  return markdown;
}

exports.getMarkdown = getMarkdown;















