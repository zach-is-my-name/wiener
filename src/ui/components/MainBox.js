import React from 'react';
import Cursor from "./Cursor.js"  
import LinkBox from "./LinkBox.js"
import HelpPage from './HelpPage.js'
import SearchPage from './SearchPage.js'
import RefBox from './RefBox.js' 
import PopUpBox from './PopUpBox.js';
import {useEffect, useState} from 'react';
import {useUiHooks} from '../customHooks/ui/useUiHooks.js' 
import {useTransformText} from '../customHooks/ui/useTransformText.js'
import {logger} from '../../devLog/logger.js' 
logger.level = "debug"

const MainBox = props =>  {

  const [ handlers, dispatch, refs, state] = useUiHooks(props.ctrDispatch, props.lineFromSearch, props.setLineFromSearch)
  
  const [text, linkArray] = useTransformText(props.renderText, props.message, props.ctrDispatch)

  const [linkUrl, setLinkUrl] = useState("")
  const [linkBoxHidden, setLinkBoxHidden] = useState(true)
  const [refBoxHidden, setRefBoxHidden] = useState(true)
  const [popUpBoxHidden, setPopUpBoxHidden] = useState(true)

  useEffect(() => {
    // logger.debug("linkIndex", state.openLinkIndex)
  // logger.debug("debug linkArray", Array.isArray(linkArray))
  // logger.debug("linkArray length",  linkArray?.length)
  }, [state.openLinkIndex, linkArray] )

  useEffect(() => {
    if (props.popUpMessage?.length) {
      setPopUpBoxHidden(false)
    }
  }, [props.popUpMessage])

  useEffect(() => {
    if (typeof state.openLinkIndex === 'number' && state.openLinkIndex >= 0 && linkArray.length) {
      setLinkUrl(linkArray[state.openLinkIndex])
      setLinkBoxHidden(false)
    } else {
      setLinkBoxHidden(true)
    }
  }, [state.openLinkIndex, linkArray])

  useEffect(() => {
    if (state.initialRefNum) {
      setRefBoxHidden(false)
    } else {
      setRefBoxHidden(true)
    }
  }, [state.initialRefNum])

  const linkBox = <LinkBox linkLine={state.linkLine} linkBoxRef={refs.linkBoxRef} hidden={linkBoxHidden} linkUrl={linkUrl} dispatch={dispatch} />  

  const refBox = <RefBox mainBoxRef={refs.mainBoxRef} initialRefNum={state.initialRefNum} linkArray={linkArray?.length && linkArray} hidden={refBoxHidden} dispatch={dispatch} />

  const searchPage = <SearchPage searchPageHidden={props.searchPageHidden} setLineFromSearch={props.setLineFromSearch} setDateFromSearch={props.setDateFromSearch} ctrDispatch={props.ctrDispatch}/>

  const popUpBox = <PopUpBox popUpMessage={props.popUpMessage} popUpBoxHidden={popUpBoxHidden} setPopUpBoxHidden={setPopUpBoxHidden} ctrDispatch={props.ctrDispatch} /> 

    return (
      <>
      <box 
      top={"top"}
      left={"left"}
      width={"100%"}
      height={"100%"}  
      focused={props.searchPageHidden && props.helpPageHidden && linkBoxHidden}
      hidden={props.helpPageHidden === false || props.searchPageHidden === false}
      keyable={true}
      input={true}
      scrollable={true}
      mouse={true} 
      tags={true}
      onKeypress={handlers.keyHandler}
      onClick={handlers.clickHandler}
      ref={refs.mainBoxRef}
      name={"mainbox"}
      fullUnicode
      forceUnicode
      content={text}
      > 
      <Cursor cursorRef={refs.cursorRef} cursorTop={state.cursorTop} cursorLeft={state.cursorLeft} savedCursorPos={props.savedCursorPos} />   
      </box>
      <HelpPage helpPageHidden={props.helpPageHidden} /> 
      {props.searchPageHidden  === false ? searchPage : null}
      {linkBoxHidden === false ? linkBox : null}
      {refBoxHidden === false ? refBox : null}
      {popUpBoxHidden === false ? popUpBox : null}
      </>
    )
}


export default MainBox



