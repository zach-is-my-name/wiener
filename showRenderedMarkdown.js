const stripAnsi = require('strip-ansi');
const {renderMarkdown} = require('./_renderMarkdown.js');

const show = async () => {
  const md = await renderMarkdown();
  console.log(md);
}

show()
