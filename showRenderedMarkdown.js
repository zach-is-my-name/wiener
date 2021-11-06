const {renderMarkdown} = require('./renderMarkdown.js');

const show = async () => {
  const md = await renderMarkdown();
  
}

show()
