const stripAnsi = require('strip-ansi');
const {renderMarkdown} = require('./renderMarkdown.js');

const show = async () => {
  const md = await renderMarkdown();
  console.log(typeof md);
}

show()
