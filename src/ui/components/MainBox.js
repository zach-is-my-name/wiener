import React from 'react';
import fs from 'fs'
import Cursor from "./Cursor.js"  
import LinkBox from "./LinkBox.js"
import HelpPage from './HelpPage.js'
import SearchPage from './SearchPage.js'
import RefBox from './RefBox.js' 
import  {useLayoutEffect, useEffect, useState, useMemo} from 'react';
import {useUiHooks} from '../customHooks/ui/useUiHooks.js' 
import {logger} from '../../devLog/logger.js' 
logger.level = "debug"

const MainBox = props =>  {

  const [ handlers, dispatch, refs, state] = useUiHooks(props.ctrDispatch, props.lineFromSearch, props.setLineFromSearch)

  let memo = useMemo(() => props.renderText &&  props.renderText.join('\n'), [props.renderText]) 
  const [text, setText] = useState("")

  useEffect(() => {
    if (memo?.length) {
      setText(memo)
    } else if (props.renderText === undefined && props.message.length) {
      setText(props.message)
    } 
  }, [props.renderText, props.message])

  const [linkBoxHidden, setLinkBoxHidden] = useState(true)
  const [linkUrl, setLinkUrl] = useState("")

  /*
  useEffect(() => {
    if (typeof state.openLinkIndex === 'number' && state.openLinkIndex >= 0) {
      setLinkUrl(linkObjArr[state.openLinkIndex].linkUrl)
      setLinkBoxHidden(false)
    } else {
      setLinkBoxHidden(true)
    }
  }, [state.openLinkIndex])
*/
  const [refBoxHidden, setRefBoxHidden] = useState(true)

  useEffect(() => {
    if (state.initialRefNum) {
      setRefBoxHidden(false)
    } else {
      setRefBoxHidden(true)
    }
  }, [state.initialRefNum])

  const searchPage = <SearchPage searchPageHidden={props.searchPageHidden} setLineFromSearch={props.setLineFromSearch} setDateFromSearch={props.setDateFromSearch} ctrDispatch={props.ctrDispatch}/>

  const linkBox = <LinkBox linkLine={state.linkLink} linkBoxRef={refs.linkBoxRef} hidden={linkBoxHidden} linkUrl={linkUrl} dispatch={dispatch} />  

  const refBox = <RefBox mainBoxRef={refs.mainBoxRef} initialRefNum={state.initialRefNum} /*linkObjArr={linkObjArr}*/ hidden={refBoxHidden} dispatch={dispatch} />

    return (
      <>
      <box 
      top={"top"}
      left={"left"}
      width={"100%"}
      height={"100%"}  
      focused={props.searchPageHidden && props.helpPageHidden && linkBoxHidden}
      hidden={!props.helpPageHidden || !props.searchPageHidden}
      keyable={true}
      input={true}
      scrollable={true}
      mouse={true} 
      tags={true}
      onKeypress={handlers.keyHandler}
      onClick={handlers.clickHandler}
      ref={state.mainBoxRef}
      name={"mainbox"}
      fullUnicode
      forceUnicode
      content={text}
      > 
      <Cursor cursorRef={refs.cursorRef} cursorTop={state.cursorTop} cursorLeft={state.cursorLeft} savedCursorPos={props.savedCursorPos} />   
      </box>
      <HelpPage helpPageHidden={props.helpPageHidden} /> 
      {!props.searchPageHidden ? searchPage : null}
      {!linkBoxHidden ? linkBox : null}
      {!refBoxHidden ? refBox : null}
      </>
    )



}


export default MainBox



