import {_logger, logger2} from '../../devLog/logger.js' 
import {useTraceUpdate} from '../../devScripts/useTraceUpdates.js'
import React from 'react';
import Cursor from "./Cursor.js"  
import  {useReducer, useEffect, useRef, useCallback} from 'react';
import {useUiHooks} from '../customHooks/ui/useUiHooks.js' 
import HelpPage from './HelpPage.js'

const MainBox = ({renderText, ctrDispatch, savedCursorPos, helpPageHidden}) =>  {

  const [ { keyHandler, clickHandler }, {cursorRef, mainBoxRef}, {cursorLeft, cursorTop} ] = useUiHooks(ctrDispatch)

  const text = useMemo(() => renderText &&  renderText.join('\n'), [renderText]) 
    return  ( 
      <>
      <box 
      top={"top"}
      left={"left"}
      width={"100%"}
      height={"100%"}  
      focused
      hidden={!helpPageHidden}
      keyable={true}
      input={true}
      scrollable={true}
      mouse={true} 
      tags={true}
      onKeypress={keyHandler}
      onClick={clickHandler}
      ref={mainBoxRef}
      name={"mainbox"}
      content={text}
      > 
      <Cursor cursorRef={cursorRef} cursorTop={cursorTop} cursorLeft={cursorLeft} savedCursorPos={savedCursorPos} />   
      </box>
      <HelpPage helpPageHidden={helpPageHidden} /> 
      </>
    )
  } 

  )
}


export default MainBox


