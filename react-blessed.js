const React = require('react');
const {useState, useEffect} = require('react');
const  blessed =  require('blessed');
const {render} = require('react-blessed');

function App()  {

   const [renderedMarkdown, setRenderedMarkdown] = useState(null)

  useEffect( () => {
    async function getRenderedMarkdown() {
      const response = await renderMarkdown()
      setRenderedMarkdown(response);
    }
    getRenderedMarkdown()

  }, []) 

  const mainBox =  (
    <box top="center"
         left="center"
         width="100%"
         height="100%"  
         mouse: true
         onClick={clickHandler}
         scrollable: true > 
    
    /*------ RenderedMarkDown ------*/    
    </box>
  )

  const clickHandler = ( async (mouse) => {
      // move the cursor
      cursor.detach()
      const { x, y } = mouse
      cursorTop = box.childBase + y - 1
      cursorLeft = x - 1
      renderCursor()
      screen.render()

      // check if the clicked chunk is a markdown link
      await followLinkUnderCursor()
    }
  )

  let cursorTop = 0;
  let cursorLeft = 0;
  let cursor = (
    <box parent: box
         width: 1
         height: 1
         top: cursorTop
         left: cursorLeft
         style ={{fg: 'white', bg: 'white'}}>
    </box>
  )                 

  let isLoading = false;
  const showHelp = () =>  null;
  const showSearch = () =>  null;

  // Quit on Escape, q, or Control-C.
  mainBox.key(['escape', 'q', 'C-c','g','S-g','u', 'C-u','d','C-d','j','k','h','l','/'], async function(ch, key) {
    //todo implement  --
    // Mark --  m `(mark)
    // Search -- / or c-f | pop-up box results
    // Go to next search result -- n
    // Go to prev search result -- N
    // Foward word -- b
    // Back word -- w
    // Bookmark newsletter -- s | pop-up box, location, etc.  
    // Open Bookmarks -- o |  pop-up box, select, rename
    // Copy Line -- Y
    // Copy selection -- y
    // Clip Line - X | pop-up box, select destination clips,
    // Clip Selection -- x | "
    // Search Global -- C-S-f | pop-up box results 
    //if (isLoading) {
     // return
    //}
    if (key.full === 'escape' || key.full === 'q' || key.full === 'C-c') {
      return process.exit(0);
    } else if (key.full === '?') {
      //show help
      cbShowHelp();
    } else if (key.full === '/') {
      cbShowSearch();
    } else {
      //update cursor position
      cursor.detach()
      updateCoordinate(key.full)
      renderCursor()
      screen.render()
    }
  });
  
const updateCoordinate = (input) => {
    if (input === 'j' || input === 'k') {
      cursorTop = nextCursorPosition(
        cursorTop,
        input === 'j',
        box.getScrollHeight(),
        1,
      )
      box.scrollTo(cursorTop)
    } else if (input === 'h' || input === 'l') {
      cursorLeft = nextCursorPosition(
        cursorLeft,
        input === 'l',
        box.width,
        3,
      )
    } else if (input === 'g') {
      cursorTop = 0
      cursorLeft = 0
      box.scrollTo(cursorTop)
    } else if (input === 'S-g') {
      cursorTop = box.getScreenLines().length - 1
      cursorLeft = 0
      box.scrollTo(cursorTop)
    } else if (input === '0') {
      cursorLeft = 0
    } else if (input === '$') {
      cursorLeft = (box.width) - 3
    } else if (input === 'd' || input === 'C-d') {
      cursorTop += (box.height) - 2
      if (cursorTop > box.getScrollHeight()) {
        cursorTop = box.getScrollHeight() - 1
      }
      box.scrollTo(box.getScrollHeight())
      box.scrollTo(cursorTop)
    } else if (input === 'u' || input === 'C-u') {
      cursorTop -= (box.height) - 1
      if (cursorTop < 0) {
        cursorTop = 0
      }
      box.scrollTo(0)
      box.scrollTo(cursorTop)
    }
  };

  const nextCursorPosition = ( current, forward, maxLength, adjustment ) => {
    let position = current + (forward ? 1 : -1)
    position = position < 0 ? 0 : position
    position =
      position > maxLength - adjustment ? maxLength - adjustment : position

    return position
  }

  const renderCursor = () => {
    <box parent: box
         width: 1
         height: 1
         top: cursorTop
         left: cursorLeft
         style ={{fg: 'white', bg: 'white'}}>
    </box>
  }
  
  // re-implement
  async function followLinkUnderCursor() {
    /*
    // check if the chunk under the cursor is a markdown link
    const lines = box.getScreenLines()
    if (cursorTop >= lines.length) {
      return
    }
    const before = lines.slice(0, cursorTop)
    const cursorIndex = stripAnsi(before.join('')).length + cursorLeft
    const cursorLine = stripAnsi(lines[cursorTop])
    if (cursorLeft <= cursorLine.length) {
      const text = stripAnsi(lines.join(''))
      let match = regexMarkdownLink.exec(text)
      while (match) {
        const start = match.index
        const end = start + match[0].length
        if (start <= cursorIndex && cursorIndex < end) {
          // jump to the link destination
          await cbFollow(match[2])
          break
        }
        match = regexMarkdownLink.exec(text)
      }
    }
    const stripAnsi = require('strip-ansi');
    const regexMarkdownHeading = /#{1,6} .+$/gm
    const regexMarkdownLink = /\[([^[]+)\]\(([^)]+)\)/gm
  */
  }

  /*
 //re-implement with state if necessary 
  function setLoadingState(isLoading) {
    isLoading = isLoading
  }
*/
  mainBox.focus();

  /* --------------------return (below)--------------------- */
    return (
    );
}

const screen = blessed.screen({
  autoPadding: true,
  smartCSR: true,
  title: 'wiener'
});


const component = render(<App />, screen);
*/
