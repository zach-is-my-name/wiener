const termkit = require('terminal-kit');
const term = termkit.terminal;
const {renderMarkdown} = require('../renderMarkdown.js'); 


const buffer = new termkit.ScreenBufferHD({
  dst: term,
  width: 120
})

//term.fullscreen();

term.grabInput();

term.on( 'key' , function( name , matches , data ) {
    console.log( "'key' event:" , name ) ;

  switch(name) {
		case 'CTRL_C' : term.processExit(0);
    case 'j' : term.down(1); break;
    case 'k' : term.up(1); break;
    case 'h' : term.left(1); break;
    case 'l' : term.right(1); break;
  }
});

const render = async ()  => {
  const renderedMarkdown = await renderMarkdown();
 console.log(renderedMarkdown) 
/*
  buffer.put({
    wrap: true,
    markup: 'false',
    //newLine: true,
  },
    //renderedMarkdown
    "taxi"
  );

  buffer.draw();
*/
}

exports.render = render;



































