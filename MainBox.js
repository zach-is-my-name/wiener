import React from 'react';
import  {useState, useEffect, useRef, useCallback} from 'react';
import {useStateWithCallbackLazy} from './customHooks';
import ansiRegex from 'ansi-regex'
import processString from 'react-process-string'
import {renderMarkdown} from './renderMarkdown'
import blessed from 'neo-blessed';
import Cursor from './Cursor'
import ButtonBox from './ButtonBox'
import LinkButton from './LinkButton'
import stripAnsi from 'strip-ansi';
import open from 'open';
const marked = require('marked');
const TerminalRenderer = require('marked-terminal');
const {getMarkdown} = require('./getMarkdown.js');
import {formatBody} from './formatBody'
import {formatHeader} from './formatHeader'
import {formatPostFormat} from './formatPostFormat'
import winston, {createLogger, transports}  from 'winston';
import fs from 'fs'
const regexLink = /(https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b[-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gm

const logger = winston.createLogger({
  transports: [
    new winston.transports.File({ filename: '/home/zmg/Tinker/wiener/logs/utility.log' })
  ]
});

const logger2 = winston.createLogger({
  transports: [
    new winston.transports.File({ filename: '/home/zmg/Tinker/wiener/logs/text.log' })
  ]
});

winston.add(new winston.transports.File({
  filename: '/home/zmg/Tinker/wiener/logs/errors.log',
  handleExceptions: true,
  handleRejections: true,
}));

const MainBox = () =>  {
  const [markdownHeader, setMarkdownHeader] = useState(null)
  const [markdownBody, setMarkdownBody] = useState(null)
  const mainBoxRef = useRef(null)
  const cursorRef = useRef(null)
  const isFirstRender = useRef(true)
  const scrollToScrollHeightFlag = useRef(false)
  const scrollToZeroFlag = useRef(false)
  const [cursorTop, setCursorTop] = useState(0) 
  const [cursorLeft, setCursorLeft] = useState(0)
  const [wasMouseClicked, toggleWasMouseClicked] = useState(false) 
  const [stateCallbackFlag, setStateCallbackFlag] = useState(false)

  useEffect(() => {

    markdownHeader && logger2.info({theContent: mainBoxRef.current.getContent()})
  }) 
  useEffect( () => {
    async function _getMarkdown() {
      //const response = await getMarkdown()
      //fs.writeFileSync('/home/zmg/Tinker/wiener/archive/markdown',response)
      //fs.writeFileSync('/home/zmg/Tinker/wiener/archive/11-27-21', await formatText(response))
     // fs.writeFileSync('/home/zmg/Tinker/wiener/logs/raw', await formatText(response))
      //logger2.info(await formatText(response))
      //setMarkdown(await formatText(response));
      setMarkdownHeader(await formatHeader(fs.readFileSync('/home/zmg/Tinker/wiener/archive/markdown', {encoding:'utf8', flag:'r'})))
      setMarkdownBody(formatPostFormat((await formatBody(fs.readFileSync('/home/zmg/Tinker/wiener/archive/markdown', {encoding:'utf8', flag:'r'})))));
      //setMarkdown(fs.readFileSync('/home/zmg/Tinker/wiener/archive/11-27-21', {encoding:'utf8', flag:'r'}));
    }
    _getMarkdown()
  }, []) 

  useEffect(() => {
    //logger.info("click handler called; now in useEffect; state wasMouseClicked = ", {wasMouseClicked})
    if (wasMouseClicked) {
      //logger.info("followLinkUnderCursor called in effect hook ")
    // check if the clicked chunk is a markdown link
      followLinkUnderCursor()
    }
  }, [wasMouseClicked, cursorLeft, cursorTop])

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
    }
      mainBoxRef.current?.scrollTo(cursorTop);
    if (scrollToScrollHeightFlag.current) {
      mainBoxRef.current?.scrollTo(mainBoxRef.currrent?.getScrollHeight())
    } else if (scrollToZeroFlag.current) {
        mainBoxRef.current?.scrollTo(0)
    }
      return () => {
        setStateCallbackFlag(false)
        scrollToScrollHeightFlag.current = false 
        scrollToZeroFlag.current = false
      }
  }, [cursorLeft, cursorTop, stateCallbackFlag])

  const clickHandler = (mouse) => {
    // move the cursor
    const { x, y } = mouse
    setCursorLeft(x)
    setCursorTop((mainBoxRef.current?.childBase + y))
    toggleWasMouseClicked(state => !state)
  }

  const followLinkUnderCursor = () => {
    // check if the chunk under the cursor is a markdown link
            
    const lines = mainBoxRef.current?.getScreenLines()
    if (cursorTop >= lines.length) {
      return
    }
    const before = lines.slice(0, cursorTop)
    const cursorIndex = blessed.stripTags(before.join('')).length + cursorLeft
    const cursorLine = blessed.stripTags(lines[cursorTop])
    //logger.info({cursorLineLength:cursorLine.length, cursorLeft, cursorTop, wasMouseClicked})
    if (cursorLeft <= cursorLine.length) {
      const text = blessed.stripTags(lines.join(''))
      let match = regexLink.exec(text)
      //logger.info({match})
      logger2.info({text}) 
      while (match) {
        const start = match.index
        const end = start + match[0].length
        //logger.info({start, end, cursorIndex, match1: match[1]}) 

        if (start <= cursorIndex && cursorIndex < end) {
          // jump to the link destination
          openLink(match[1])
          break
        }

        match = regexLink.exec(text)
      }
      toggleWasMouseClicked(false)}
    }

  const openLink = async (link) => await open(`${link}`)     

  const keyHandler = async (ch, key) => {
    logger2.info({scrollPerc:mainBoxRef.current?.getScrollPerc(), scrollIndex:mainBoxRef.current?.getScroll() })
    if (key.full === 'escape' || key.full === 'q' || key.full === 'C-c') {
      return process.exit(0);

    } else if (key.full === 'enter') {
        await followLinkUnderCursor()
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
    function nextTenXCursorPosition( current, forward, maxLength, adjustment )  {
      let position = current + (forward ? 10 : -10)
      position = position < 0 ? 0 : position
      position =
        position > maxLength - adjustment ? maxLength - adjustment : position

      return position
    }

    function nextTwentyYCursorPosition( current, forward, maxLength, adjustment )  { 
      let position = current + (forward ? 10 : -10)
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
          mainBoxRef.current?.getScrollHeight(),
          1,
        ))
        mainBoxRef.current?.scrollTo(cursorTop)
      } else if (input === 'h' || input === 'l') {
        setCursorLeft(nextCursorPosition(
          cursorLeft,
          input === 'l',
          mainBoxRef.current?.width,
          3,
        ))
      } else if  (input === 'w' || input === 'b') {
        setCursorLeft(nextTenXCursorPosition(
          cursorLeft,
          input === 'w',
          mainBoxRef.current?.width,
          9,
        ))
      } else if (input === '{' || input === '}') {
        setCursorTop(nextTwentyYCursorPosition(
          cursorTop,
          input === '{',
          mainBoxRef.current?.getScrollHeight(),
          9,
        ))
      }  else if (input === 'g') {
        setCursorTop(0)
        setCursorLeft(0)
        setStateCallbackFlag(true)
      } else if (input === 'S-g') {
        setCursorTop(mainBoxRef.current?.getScreenLines().length - 1)
        setCursorLeft(0)
        setStateCallbackFlag(true)
      } else if (input === '0') {
        setCursorLeft(0)
      } else if (input === '$') {
        setCursorLeft((mainBoxRef.current?.width))
        
      } else if (input === "x") {
        mainBoxRef.current?.setScrollPerc(100)
      } else if (input === 'C-d') {
        setCursorTop((cursorTop + mainBoxRef.current?.height) - 2)
        if (cursorTop > mainBoxRef.current?.getScrollHeight()) {
          setCursorTop(mainBoxRef.current?.getScrollHeight() - 1)
        }
        scrollToScrollHeightFlag.current = true;
        setStateCallbackFlag(true)
      } else if (input === 'C-u') {
        setCursorTop(cursorTop - (mainBoxRef.current?.height)-2)
        if (cursorTop < 0) {
          setCursorTop(0)
        }
        scrollToZeroFlag.current = true
        setStateCallbackFlag(true)
      }
    }
  }

  const centeredHeader =`{center}${markdownHeader}`
  const clean = `\n{/}{/}\n\n`
  const leftBody = `{left}${markdownBody}{/left}` 
  return(
    <box 
    top={"top"}
    left={"left"}
    width={"100%"}
    height={"100%"}  
    focused={true}
    keyable={true}
    input={true}
    onKeypress={keyHandler}
    mouse 
    onClick={clickHandler}
    scrollable={true}
    ref={mainBoxRef}
    tags={true}
    content={markdownBody && markdownHeader && centeredHeader + clean + leftBody} 
    > 
    <Cursor cursorRef={cursorRef} cursorTop={cursorTop} cursorLeft={cursorLeft} />   
    </box>
  )
/*
 <box ref={markdownBoxRef}>
</box>
      hidden: cursorRef.current.hidden, 
      visable: cursorRef.current.visable,
      detached: cursorRef.current.detached,
      index: cursorRef.current.index
*/

}
 

export default MainBox

