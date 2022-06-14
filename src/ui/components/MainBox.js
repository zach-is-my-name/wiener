import {_logger, logger2} from '../../devLog/logger.js' 
import {useTraceUpdate} from '../../devScripts/useTraceUpdates.js'
import {format} from '../format/format.js'
import React from 'react';
import Cursor from "./Cursor.js"  
import  {useReducer, useEffect, useRef, useCallback} from 'react';
import {keyHandler} from '../functions/keyHandler.js' 
import {
        //useKeyHandler, 
        //useScroll,
        useMouseClick,      
        useClickHandler, 
        useGetWien, 
        useUpdateNewsletters,
        useLoadController, 
        } from '../customHooks/index.js'
        
const initialState = { cursorTop: 0, cursorLeft: 0, wasMouseClicked: false}

function reducer(state, action) {
  switch (action.type) {
    case 'setCursorTop':
      return {...state, cursorTop: action.payload};
    case 'setCursorLeft':
      return {...state, cursorLeft: state.count - 1};
    case 'toggleWasMouseClicked':
      return {...state, wasMouseClicked: !state.wasMouseClicked};
    default:
      _logger.warn("reducer error", {type: action.type, payload:action.payload})
  }
}
  /*   latest newsletter $ wienr 
    previous newsletters $ wienr (in-app)
  search all newsletters $ wienr (in-app)'
 */

const MainBox = (props) =>  {
const {hasInternet, hasLatestInArchive, weeksElapsed} = props
  const renderCount = useRef(0);
  renderCount.current = renderCount.current + 1;
  const mainBoxRef = useRef(null)
  const cursorRef = useRef(null)
  const isFirstRender = useRef(true)
  const scrollToScrollHeightFlagRef = useRef(false)
  const scrollToZeroFlagRef = useRef(false)
  const [state, dispatch] = useReducer(reducer, initialState);



  let [ { getHook, updateHook, loading, renderObj: {url, prevUrl, text } }, {ctrDispatch}] = useLoadController(hasInternet, hasLatestInArchive)

  const renderObj = useGetWien(getHook, ctrDispatch);
  const renderText = useFormatWien(renderObj) 

  useUpdateNewsletters(updateHook, ctrDispatch) 

  //const keyHandler = useKeyHandler(mainBoxRef, scrollToScrollHeightFlagRef, scrollToZeroFlagRef)
  
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
    onKeypress={(e,ch, key) => keyHandler(e,ch,key, mainBoxRef, scrollToScrollHeightFlagRef, scrollToZeroFlagRef, dispatch)}
    onClick={() =>clickHandler(mainBoxRef)}
    ref={mainBoxRef}
    content={await format(renderObj && renderObj.text)}
    > 
    <Cursor cursorRef={cursorRef} cursorTop={state?.cursorTop} cursorLeft={state?.cursorLeft} />   

    </box>
  )
}


export default MainBox

