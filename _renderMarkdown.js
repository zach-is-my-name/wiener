const marked = require('marked');
const TerminalRenderer = require('marked-terminal');
const {getMarkdown} = require('./_getMarkdown.js');


const renderMarkdown = async () => {

  const markdown = await getMarkdown(); 

  marked.setOptions({
    // Define custom renderer
    renderer: new TerminalRenderer()
  });
  return marked(markdown)
}
//renderMarkdown(); 
exports.renderMarkdown = renderMarkdown;

