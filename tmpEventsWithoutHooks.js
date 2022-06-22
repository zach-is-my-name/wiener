import React from 'react';
import  {useState, useEffect, useRef, useCallback} from 'react';
import {useStateWithCallbackLazy} from './customHooks/useStateWithCallback.js';
import {useUpdateArchive} from './customHooks/useUpdateArchive.js';
import processString from 'react-process-string';
import {renderMarkdown} from './renderMarkdown';
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
import useGetWien from './useGetWien'

const MainBox = (props) =>  {
  const mainBoxRef = useRef(null)
  const cursorRef = useRef(null)
  const isFirstRender = useRef(true)
  const scrollToScrollHeightFlag = useRef(false)
  const scrollToZeroFlag = useRef(false)

  const [renderObj, setRenderObj] = useState(null)
  const [cursorTop, setCursorTop] = useState(0) 
  const [cursorLeft, setCursorLeft] = useState(0)
  const [wasMouseClicked, toggleWasMouseClicked] = useState(false) 
  const [stateCallbackFlag, setStateCallbackFlag] = useState(false)
  const [mode, setMode] = useState("latest"); 
  const [logo, setLogo] = useState(null)
  const openLink = async (link) => await open(`${link}`)     

  useUpdateArchive()

  //return render object 
  setRenderObj(useGetWien(props.argObj))

  useEffect(() => {
    (async () {
    if (wasMouseClicked) {
      await followLinkUnderCursor()
    } })()
  }, [wasMouseClicked, cursorLeft, cursorTop])

  const clickHandler = (mouse) => {
    // move the cursor
    const { x, y } = mouse
    setCursorLeft(x)
    setCursorTop((mainBoxRef.current?.childBase + y))
    toggleWasMouseClicked(state => !state)
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
    content={renderObj && renderObj.text} 
    > 
    <Cursor cursorRef={cursorRef} cursorTop={cursorTop} cursorLeft={cursorLeft} />   
    </box>
  )

}



export default MainBox

