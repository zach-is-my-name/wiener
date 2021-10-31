const TurndownService = require('turndown');
const {getLatestWien} = require('./getLatestWien.js');

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

     
    const linkObj = JSON.stringify({linkText: `${content}`, url: `${node.getAttribute('href')}`})


    return linkObj 
  }
})

const getMarkdown = async () => {
  const html = await getLatestWien() 
  const markdown = await turndownService.turndown(html);
  //console.log('markdown', markdown)
  return markdown;
}

exports.getMarkdown = getMarkdown;

//`<ButtonBox ref={N}>Example<LinkButton>http://example.com</LinkButton></ButtonBox>`


//<ButtonBox  url={${}}>













