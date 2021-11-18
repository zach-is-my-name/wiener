import React from 'react';
import  {useState, useEffect, useRef, useCallback} from 'react';
import ansiRegex from 'ansi-regex'
import processString from 'react-process-string'
import {renderMarkdown} from './renderMarkdown'
import blessed from 'neo-blessed';
import Cursor from './Cursor'
import ButtonBox from './ButtonBox'
import LinkButton from './LinkButton'
import  stripAnsi from 'strip-ansi';
const marked = require('marked');
const TerminalRenderer = require('marked-terminal');
const {getMarkdown} = require('./getMarkdown.js');
import {formatText} from './format'
import winston, {createLogger, transports}  from 'winston';
import fs from 'fs'

winston.add(new winston.transports.File({
  filename: '/home/zmg/Tinker/wiener/logs/errors.log',
  handleExceptions: true,
  handleRejections: true,
}));

const MainBox = () =>  {
  const [markdown, setMarkdown] = useState(null)
  const [jsx, setJsx] = useState(null)
  const [cursorTop, setCursorTop] = useState(0) 
  const [cursorLeft, setCursorLeft] = useState(0)
  const [linkButtonRendered, setLinkButtonRendered] = useState(null)
  const [linkButtonFocused, setLinkButtonFocused] = useState(null)
  const mainBoxRef = useRef(null)
  
  useEffect( () => {
    async function _getMarkdown() {
      const response = await getMarkdown()
      fs.writeFileSync('/home/zmg/Tinker/wiener/logs/markdown',response)
      setMarkdown(await formatText(response));
      
    }
    _getMarkdown()
    

  }, []) 

  const clickHandler = async (mouse) => {
    // move the cursor
    //cursor.detach()
    const { x, y } = mouse
    setCursorTop((mainBoxRef.current.childBase + y) - 1)
    setCursorLeft(x - 1)
    //renderCursor()
    //screen.render()

    // check if the clicked chunk is a markdown link
    await followLinkUnderCursor()
  }

  const linkButtonPress = useCallback( () => {
  }, [])

  const keyHandler = async (ch, key) => {
    if (key.full === 'escape' || key.full === 'q' || key.full === 'C-c') {
      return process.exit(0);

    } else {
      updateCoordinate(key.full)
    }

    function nextCursorPosition( current, forward, maxLength, adjustment )  {
      let position = current + (forward ? 1 : -1)
      position = position < 0 ? 0 : position
      position =
        position > maxLength - adjustment ? maxLength - adjustment : position

      return position
    }

    function updateCoordinate (input)  {
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
    }
  }
// 
  return(
    <box 
    top={"center"}
    left={"center"}
    width={"100%"}
    height={"100%"}  
    align={"center"}
    focused={true}
    keyable={true}
    input={true}
    onKeypress={keyHandler}
    mouse 
    onClick={clickHandler}
    scrollable={true}
    ref={mainBoxRef}
    >
    {markdown && markdown}
    <Cursor cursorTop={cursorTop} cursorLeft={cursorLeft} />   
    </box>
    
  )

}
 

export default MainBox

