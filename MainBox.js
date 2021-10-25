import React from 'react';
const {useState, useEffect, useRef, useCallback} = require('react');
const {renderMarkdown} = require('./renderMarkdown')
import blessed from 'blessed'
//import Cursor from './Cursor'

const MainBox = () =>  {
  //const [isLoading, setIsLoading] = useState(false)
  const [renderedMarkdown, setRenderedMarkdown] = useState(null)
  const [cursorTop, setCursorTop] = useState(0) 
  const [cursorLeft, setCursorLeft] = useState(0)
  const mainBoxRef = useRef(); 

  useEffect( () => {
    async function getRenderedMarkdown() {
      const response = await renderMarkdown()
      setRenderedMarkdown(response);
    }
    getRenderedMarkdown()

  }, []) 

  useEffect(() => {
    mainBoxRef.current.focus()  
    }, []) 

  useEffect(() => {
    mainBoxRef.current.key(['escape', 'q', 'C-c','g','S-g','u', 'C-u','d','C-d','j','k','h','l','/'], async (ch, key) => {
    if (key.full === 'escape' || key.full === 'q' || key.full === 'C-c') {
      return process.exit(0);
   // } else if (key.full === '?') {
      //show help
   //   cbShowHelp();
    //} else if (key.full === '/') {
     // cbShowSearch(); 
    } else {
      //update cursor position
      updateCoordinate(key.full)
    }
  }) , []})

  const updateCoordinate = useCallback((input) => {
      if (input === 'j' || input === 'k') {
        setCursorTop(nextCursorPosition(
          cursorTop,
          input === 'j',
          mainBoxRef.current.getScrollHeight(),
          1,
        ))
        mainBoxRef.current.scrollTo(cursorTop)
      } else if (input === 'h' || input === 'l') {
        setCursorLeft(nextCursorPosition(
          cursorLeft,
          input === 'l',
          mainBoxRef.current.width,
          3,
        ))
      } else if (input === 'g') {
        setCursorTop(0)
        setCursorLeft(0)
        mainBoxRef.current.scrollTo(cursorTop)
      } else if (input === 'S-g') {
        setCursorTop(mainBoxRef.current.getScreenLines().length - 1)
        setCursorLeft(0)
        mainBoxRef.current.scrollTo(cursorTop)
      } else if (input === '0') {
        setCursorLeft(0)
      } else if (input === '$') {
        setCursorLeft((mainBoxRef.current.width) - 3)
      } else if (input === 'd' || input === 'C-d') {
        setCursorTop( (cursorTop + mainBoxRef.current.height) - 2)
        if (cursorTop > mainBoxRef.current.getScrollHeight()) {
          setCursorTop(mainBoxRef.current.getScrollHeight() - 1)
        }
        mainBoxRef.current.scrollTo(mainBoxRef.currrent.getScrollHeight())
        mainBoxRef.current.scrollTo(cursorTop)
      } else if (input === 'u' || input === 'C-u') {
        setCursorTop((cursorTop - (mainBoxRef.current.height)) - 1)
        if (cursorTop < 0) {
          setCursorTop(0)
        }
        mainBoxRef.current.scrollTo(0)
        mainBoxRef.current.scrollTo(cursorTop)
      }
    }, [])

  const linkButtonPress = useCallback( () => {
    //setLinkButtonRendered();
    //setLinkButtonFocused();
  }, [])

 const clickHandler = useCallback(async (mouse) => {
      // move the cursor
      //cursor.detach()
      const { x, y } = mouse
      setCursorTop((mainBoxRef.current.childBase + y) - 1)
      setCursorLeft(x - 1)
      //renderCursor()
      //screen.render()

      // check if the clicked chunk is a markdown link
      await followLinkUnderCursor()
 }, [])

  const followLinkUnderCursor = useCallback(async () => {
    // check if the chunk under the cursor is a markdown link
    const lines = mainBoxRef.current.getScreenLines()
    if (cursorTop >= lines.length) {
      return
    }
 }, [])

/*
  function renderCursor() {
    <box width={1}
         height={1}
         top={cursorTop}
         left={cursorLeft}
         style ={{fg: 'white', bg: 'white'}}>
    </box>
  }
*/

  const nextCursorPosition = useCallback(( current, forward, maxLength, adjustment ) =>  {
    let position = current + (forward ? 1 : -1)
    position = position < 0 ? 0 : position
    position =
      position > maxLength - adjustment ? maxLength - adjustment : position

    return position
  }, [])




  return (
    <box 
      top={"center"}
      left={"center"}
      width={"100%"}
      height={"100%"}  
      mouse 
      onClick={clickHandler}
      scrollable={true}
      ref={mainBoxRef}
    >
    {`text`}
    // <Cursor mainBoxRef={mainBoxRef} cursorTop={} cursorLeft={} />   
    </box>
  );
}

export default MainBox
























