const marked = require('marked');
const TerminalRenderer = require('marked-terminal');
const {getMarkdown} = require('./getMarkdown.js');


const renderMarkdown = async () => {

  const markdown = await getMarkdown(); 

  marked.setOptions({
    
    renderer: new TerminalRenderer()
  });
  return marked(markdown)
}

exports.renderMarkdown = renderMarkdown

