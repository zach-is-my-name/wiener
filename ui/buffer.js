
const blessed = require('blessed');
const stripAnsi = require('strip-ansi');
const { boxOptions, cursorOptions, inputFieldOptions } = require('./blessedOptions')
const regexMarkdownHeading = /#{1,6} .+$/gm
const regexMarkdownLink = /\[([^[]+)\]\(([^)]+)\)/gm

const {renderMarkdown} = require('../renderMarkdown.js');

const render = async () => {
  const renderedMarkdown = await renderMarkdown(); 
  
  // Create a screen object.
  const screen = blessed.screen({
    smartCSR: true,
  });

  screen.title = 'wiener';

  // Create a box perfectly centered horizontally and vertically.
  const box = blessed.box(
    Object.assign({}, boxOptions, {
    top: 'center',
    left: 'center',
    width: '100%',
    height: '100%',
    tags: true,
    scrollable: true,
    content: "http://example.com",
   content: renderedMarkdown,
    })
  );

  // Append our box to the screen.
  screen.append(box);

  let cursorTop = 0;
  let cursorLeft = 0;
  let cursor = blessed.box(
      Object.assign({}, cursorOptions, {
        parent: box,
        top: cursorTop,
        left: cursorLeft,
      }),
  );
  let isLoading = false;
  const showHelp = () =>  null;
  const showSearch = () =>  null;
  
  // Quit on Escape, q, or Control-C.
  box.key(['escape', 'q', 'C-c','g','S-g','u', 'C-u','d','C-d','j','k','h','l','/'], async function(ch, key) {
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
    box.on('click', async (mouse) => {
      // move the cursor
      cursor.detach()
      const { x, y } = mouse
      cursorTop = box.childBase + y - 1
      cursorLeft = x - 1
      renderCursor()
      screen.render()

      // check if the clicked chunk is a markdown link
      await followLinkUnderCursor()
    })

  function updateCoordinate(input) {
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
  }

  function nextCursorPosition( current, forward, maxLength, adjustment ) {
    let position = current + (forward ? 1 : -1)
    position = position < 0 ? 0 : position
    position =
      position > maxLength - adjustment ? maxLength - adjustment : position

    return position
  }

  function renderCursor() {
    cursor = blessed.box(
      Object.assign({}, cursorOptions, {
        parent: box,
        top: cursorTop,
        left: cursorLeft,
      })
    )
  }
 
/*
  async function followInput() Promise<void> {
    const input = blessed.textbox(inputFieldOptions)
    this.screen.append(input)
    this.screen.render()
    input.focus()
    input.readInput(async (err, value) => {
      input.destroy()
      if (!err && value?.length) {
        await this.cbFollow(value as string)
      }
      this.screen.render()
    })
  }
*/
  async function followLinkUnderCursor() {
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
  }

  function setLoadingState(isLoading) {
    isLoading = isLoading
  }


  // Focus our element.
  box.focus();

  // Render the screen.
  screen.render();

}

exports.render = render;



































