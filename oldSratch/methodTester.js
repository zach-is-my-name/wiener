const blessed = require('blessed');

const screen = blessed.screen({
  smartCSR: true
}); 

const box = blessed.box({
  top: 'center',
  left: 'center',
  width: '50%',
  height: '50%',
  content: 'Hello {bold}world{/bold}!',
  tags: true,
  border: {
    type: 'line'
  },
  style: {
    fg: 'white',
    bg: 'magenta',
    border: {
      fg: '#f0f0f0'
    },
    hover: {
      bg: 'green'
    }
  }
});


screen.key(['escape', 'q', 'C-c'], async function(ch, key) {
    if (key.full === 'escape' || key.full === 'q' || key.full === 'C-c') {
      return process.exit(0);
    }
})
//screen.focus()
//screen.append(box)
screen.render()
console.log(blessed.input.prototype)
