const blessed = require('blessed');


const screen = blessed.screen({
  smartCSR: true
});

screen.render()

 let button = blessed.button() 
 //input = blessed.input
 console.log('BUTTON', button)
screen.destroy()

screen.key(['escape', 'q', 'C-c'], function(ch, key) {
  return process.exit(0);
});

