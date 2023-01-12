import React from 'react';
import fs from 'fs'
import Cursor from "./Cursor.js"  
import LinkBox from "./LinkBox.js"
import HelpPage from './HelpPage.js'
import SearchPage from './SearchPage.js'
import RefBox from './RefBox.js' 
import  {useLayoutEffect, useEffect, useState, useMemo} from 'react';
import {useUiHooks} from '../customHooks/ui/useUiHooks.js' 

const MainBox = ({setDateFromSearch, setLineFromSearch, lineFromSearch, searchPageHidden, renderText, linkObjArr, ctrDispatch, savedCursorPos=undefined, helpPageHidden, message}) =>  {

  const [ { keyHandler, clickHandler, dispatch }, {cursorRef, mainBoxRef, linkBoxRef}, {cursorLeft, cursorTop, openLinkIndex, linkLine, initialRefNum} ] = useUiHooks(ctrDispatch, lineFromSearch, setLineFromSearch)

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
    if (typeof openLinkIndex === 'number' && openLinkIndex >= 0) {
      setLinkUrl(linkObjArr[openLinkIndex].linkUrl)
      setLinkBoxHidden(false)
    } else {
      setLinkBoxHidden(true)
    }
  }, [openLinkIndex])

  const [refBoxHidden, setRefBoxHidden] = useState(true)

  useEffect(() => {
    if (initialRefNum) {
      setRefBoxHidden(false)
    } else {
      setRefBoxHidden(true)
    }
  }, [initialRefNum])

  const searchPage = <SearchPage searchPageHidden={searchPageHidden} setLineFromSearch={setLineFromSearch} setDateFromSearch={setDateFromSearch} ctrDispatch={ctrDispatch}/>

  const linkBox = <LinkBox linkLine={linkLine} linkBoxRef={linkBoxRef} hidden={linkBoxHidden} linkUrl={linkUrl} dispatch={dispatch} />  

  const refBox = <RefBox mainBoxRef={mainBoxRef} initialRefNum={initialRefNum} linkObjArr={linkObjArr} hidden={refBoxHidden} dispatch={dispatch} />

    return (
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
      <HelpPage helpPageHidden={helpPageHidden} /> 
      {!searchPageHidden ? searchPage : null}
      {!linkBoxHidden ? linkBox : null}
      {!refBoxHidden ? refBox : null}
      </>
    )



}


export default MainBox



