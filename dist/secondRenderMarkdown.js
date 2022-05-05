var marked = require('marked');

var TerminalRenderer = require('marked-terminal');

var secondRenderMarkdown = function secondRenderMarkdown() {
  marked.setOptions({
    renderer: new TerminalRenderer()
  });
  return marked(markdown);
};

export { secondRenderMarkdown };