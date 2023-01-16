import React from 'react';
import Cursor from "./Cursor.js"  
import LinkBox from "./LinkBox.js"
import HelpPage from './HelpPage.js'
import SearchPage from './SearchPage.js'
import RefBox from './RefBox.js' 
import {useLayoutEffect, useEffect, useState, useMemo} from 'react';
import {useUiHooks} from '../customHooks/ui/useUiHooks.js' 
import {useTransformText} from '../customHooks/ui/useTransformText.js'
import {logger} from '../../devLog/logger.js' 
logger.level = "debug"

const MainBox = props =>  {

  const [ handlers, dispatch, refs, state] = useUiHooks(props.ctrDispatch, props.lineFromSearch, props.setLineFromSearch)

  const [text, linkObjArr] = useTransformText(props.renderText, props.message)

  const [linkUrl, setLinkUrl] = useState("")

  const [linkBoxHidden, setLinkBoxHidden] = useState(true)

  useEffect(() => {
    if (typeof state.openLinkIndex === 'number' && state.openLinkIndex >= 0 && linkObjArr.length) {
      setLinkUrl(linkObjArr[state.openLinkIndex].linkUrl)
      setLinkBoxHidden(false)
    } else {
      setLinkBoxHidden(true)
    }
  }, [state.openLinkIndex])

  const linkBox = <LinkBox linkLine={state.linkLink} linkBoxRef={refs.linkBoxRef} hidden={linkBoxHidden} linkUrl={linkUrl} dispatch={dispatch} />  

  const [refBoxHidden, setRefBoxHidden] = useState(true)

  useEffect(() => {
    if (state.initialRefNum) {
      setRefBoxHidden(false)
    } else {
      setRefBoxHidden(true)
    }
  }, [state.initialRefNum])


  const refBox = <RefBox mainBoxRef={refs.mainBoxRef} initialRefNum={state.initialRefNum} linkObjArr={linkObjArr.length && linkObjArr} hidden={refBoxHidden} dispatch={dispatch} />

  const searchPage = <SearchPage searchPageHidden={props.searchPageHidden} setLineFromSearch={props.setLineFromSearch} setDateFromSearch={props.setDateFromSearch} ctrDispatch={props.ctrDispatch}/>

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



