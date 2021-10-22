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
    return (`"`${underline}`"$${content}"`${/underline}`"<Button onPress={()=> linkButtonPress()} top:linkButtonTop left:linkButtonLeft height:3 width:'shrinkfocused:linkButtonFocused mouse:true hidden:linkButtonHidden><Button >"`${underline}`"${node.getAttribute('href')"`${/underline}`"</button></button>`)}
 })

const getMarkdown = async () => {
  const html = await getLatestWien() 
  const markdown = await turndownService.turndown(html);
  //console.log('markdown', markdown)
  return markdown;
}

exports.getMarkdown = getMarkdown;















