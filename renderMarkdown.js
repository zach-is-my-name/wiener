const marked = require('marked');
const TerminalRenderer = require('marked-terminal');
const {getMarkdown} = require('./getMarkdown.js');


const renderMarkdown = async () => {

  const markdown = await getMarkdown(); 

  marked.setOptions({
    // Define custom renderer
    renderer: new TerminalRenderer()
  });
  //console.log(marked(markdown))
  return marked(markdown)
}
//renderMarkdown(); 
exports.renderMarkdown = renderMarkdown;

