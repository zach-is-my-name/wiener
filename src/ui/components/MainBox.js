import {_logger, logger2} from '../../devLog/logger.js' 
import {useTraceUpdate} from '../../devScripts/useTraceUpdates.js'
import {format} from '../format/format.js'
import React from 'react';
import Cursor from "./Cursor.js"  
import  {useReducer, useEffect, useRef, useCallback} from 'react';
import {useUiHooks} from '../customHooks/ui/useUiHooks.js' 
        
  /*   latest newsletter $ wienr 
    previous newsletters $ wienr (in-app)
  search all newsletters $ wienr (in-app)'
 */

const MainBox = (props) =>  {

  const [ { keyHandler, clickHandler }, {mainBoxRef, cursorRef }, {cursorLeft, cursorTop} ] = useUiHooks()

  // _logger.info("renderText from props", props.renderText)
  return(
    <box 
    top={"top"}
    left={"left"}
    width={"100%"}
    height={"100%"}  
    focused={true}
    keyable={true}
    input={true}
    scrollable={true}
    mouse={true} 
    tags={true}
    onKeypress={keyHandler}
    onClick={() =>clickHandler(mainBoxRef)}
    ref={mainBoxRef}
    content={props.renderText}
    > 
    <Cursor cursorRef={cursorRef} cursorTop={cursorTop} cursorLeft={cursorLeft} />   

    </box>
  )
}


export default MainBox

