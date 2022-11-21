import {parse, stringify, toJSON, fromJSON} from 'flatted';
import {_logger, logger2} from '../../devLog/logger.js' 
import React from 'react';
import fs from 'fs'
import Cursor from "./Cursor.js"  
import LinkBox from "./LinkBox.js"
import terminalLink from 'terminal-link'
import  {useLayoutEffect, useEffect, useState, useMemo} from 'react';
import {useUiHooks} from '../customHooks/ui/useUiHooks.js' 
import HelpPage from './HelpPage.js'
import SearchPage from './SearchPage.js'

const MainBox = ({setDateFromSearch, setLineFromSearch, lineFromSearch, searchPageHidden, renderText, linkObjArr, ctrDispatch, savedCursorPos=undefined, helpPageHidden, message}) =>  {

  const [ { keyHandler, clickHandler, dispatch }, {cursorRef, mainBoxRef, linkBoxRef}, {cursorLeft, cursorTop, linkIndex, linkLine} ] = useUiHooks(ctrDispatch, lineFromSearch, setLineFromSearch)

  let memo = useMemo(() => renderText &&  renderText.join('\n'), [renderText]) 
  const [text, setText] = useState("")
  useEffect(() => {
    if (memo?.length) {
      setText(memo)
    } else if (renderText === undefined && message.length) {
      setText(message)
    } 
  }, [renderText, message])

  const [linkBoxHidden, setLinkBoxHidden] = useState(true)
  const [linkUrl, setLinkUrl] = useState("")
  


  useEffect(() => {
    if (typeof linkIndex === 'number' && linkIndex >= 0) {
      setLinkUrl(linkObjArr[linkIndex].linkUrl)
      setLinkBoxHidden(false)
    } else {
      setLinkBoxHidden(true)
    }
  }, [linkIndex])

  const searchPage = <SearchPage searchPageHidden={searchPageHidden} setLineFromSearch={setLineFromSearch} setDateFromSearch={setDateFromSearch} ctrDispatch={ctrDispatch}/>

  const main =  (  
    <>
    <box 
    top={"top"}
    left={"left"}
    width={"100%"}
    height={"100%"}  
    focused={searchPageHidden && helpPageHidden && linkBoxHidden}
    hidden={!helpPageHidden || !searchPageHidden}
    keyable={true}
    input={true}
    scrollable={true}
    mouse={true} 
    tags={true}
    onKeypress={keyHandler}
    onClick={clickHandler}
    ref={mainBoxRef}
    name={"mainbox"}
    fullUnicode
    forceUnicode
    content={text}
    > 
    <Cursor cursorRef={cursorRef} cursorTop={cursorTop} cursorLeft={cursorLeft} savedCursorPos={savedCursorPos} />   
    </box>
    </>
  )

  const mainWithLinkBox =  (  
    <>
    <box 
    top={"top"}
    left={"left"}
    width={"100%"}
    height={"100%"}  
    focused={searchPageHidden && helpPageHidden && linkBoxHidden}
    hidden={!helpPageHidden || !searchPageHidden}
    keyable={true}
    input={true}
    scrollable={true}
    mouse={true} 
    tags={true}
    onKeypress={keyHandler}
    onClick={clickHandler}
    ref={mainBoxRef}
    name={"mainbox"}
    fullUnicode
    forceUnicode
    content={text}
    > 
    <Cursor cursorRef={cursorRef} cursorTop={cursorTop} cursorLeft={cursorLeft} savedCursorPos={savedCursorPos} />   
    <LinkBox linkLine={linkLine} linkBoxRef={linkBoxRef} hidden={linkBoxHidden} linkUrl={linkUrl} dispatch={dispatch} />  
    </box>
    </>
  )

    if (linkBoxHidden === true) {
      return (main)
    } else if (linkBoxHidden === false) {
      return ( mainWithLinkBox)
    }
}
// <HelpPage helpPageHidden={helpPageHidden} /> 
// {!searchPageHidden ? searchPage : null}


export default MainBox



