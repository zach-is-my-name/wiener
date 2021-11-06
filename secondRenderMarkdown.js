const marked = require('marked');
const TerminalRenderer = require('marked-terminal');

const secondRenderMarkdown = () => {

  marked.setOptions({
    
    renderer: new TerminalRenderer()
  });
  return marked(markdown)
}

export {renderMarkdown} 

