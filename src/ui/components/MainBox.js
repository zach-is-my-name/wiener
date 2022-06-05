import {_logger, logger2} from '../../devLog/logger.js' 
import React from 'react';
//import useStateWithCallbackLazy from 'use-state-with-callback'
import Cursor from "./Cursor.js"  
import  {useReducer, useEffect, useRef, useCallback} from 'react';
import {keyHandler} from '../functions/keyHandler.js' 
import {
        //useKeyHandler, 
        useClickHandler, 
        //useUpdateArchive,
        useGetWien, 
        useUpdateNewsletters,
        //useScroll,
        useMouseClick,      
        } from '../customHooks/index.js'
        
const initialState = { cursorTop: 0, cursorLeft: 0, wasMouseClicked: false, /*stateCallbackFlag: false,*/ /*mode: "latest",*/ renderObj: {date: "", text: "", url:""}, getHook: "", updateHook: false, debugCount: 0, loading: false }

function reducer(state, action) {
  switch (action.type) {
    case 'setCursorTop':
      return {...state, cursorTop: action.payload};
    case 'setCursorLeft':
      return {...state, cursorLeft: state.count - 1};
    case 'setStateCallbackFlag':
      return {...state, stateCallbackFlag: !state.stateCallbackFlag };
    case 'toggleWasMouseClicked':
      return {...state, wasMouseClicked: !state.wasMouseClicked};
    case 'setMode':
      return {...state };
    case 'setRenderObj':
      return {...state, renderObj: action.payload };
    case 'getHook':
      _logger.info("reducer", {action, pass: state.debugCount})
      return {...state, getHook: action.payload};
    case 'updateHook':
      return {...state, updateHook: action.payload};
    case 'loadPrev':
      return {...state, loadPrev:action.payload};
    case 'loadNext':
      return {...state, loadNext: action.payload };
    case 'debugAdd':
      return {...state, debugCount: state.debugCount +1 };
    case 'loading':
      return {...state, loading: true };
    case 'placeholder':
      return {...state };
    default:
      _logger.warn("reducer error", {type: action.type, payload:action.payload})
  }
}

const MainBox = ({hasInternet, hasLatestInArchive, weeksElapsed}) =>  {
  const renderCount = useRef(0);
  renderCount.current = renderCount.current + 1;
  const [state, dispatch] = useReducer(reducer, initialState);
  const mainBoxRef = useRef(null)
  const cursorRef = useRef(null)
  const isFirstRender = useRef(true)
  const scrollToScrollHeightFlagRef = useRef(false)
  const scrollToZeroFlagRef = useRef(false)
  _logger.info({"MainBox renders" : renderCount.current})
  // _logger.info({state}) 

  /*   latest newsletter $ wienr 
    previous newsletters $ wienr (in-app)
  search all newsletters $ wienr (in-app)'
 */
  //const keyHandler = useKeyHandler(mainBoxRef, scrollToScrollHeightFlagRef, scrollToZeroFlagRef)
 if (state.renderObj?.url && state.renderObj?.date) {
   _logger.info("mainBox state partial", {url:state?.renderObj?.url, date:state?.renderObj?.date})
 } 
 useEffect(() =>  {
  if (hasInternet === true) {
    if (hasLatestInArchive === true) {
      dispatch({type: "getHook", payload: "loadArchiveMostRecent"})
    } else if (hasLatestInArchive === false) {
      dispatch({type: "getHook", payload: "fetchLatest"})
    } else if (hasLatestInArchive === "loading") {
      dispatch({type: "loading"}) 
    }
  } else if (hasInternet === false) { //no internet
    dispatch({type: "getHook", payload: "loadArchiveMostRecent"})
  }
   else if (hasInternet === "loading") {
    dispatch({type: "loading"}) 
   }

  if (hasInternet === true && Object.keys(state.renderObj).length) {
    dispatch({type: "updateHook", payload: true})
  }

 }, [hasInternet, hasLatestInArchive])
  
const renderObj = useGetWien(state?.getHook, dispatch, state?.debugCount)

// _logger.info({"useGetWien render count: ": state?.debugCount})
// _logger.info({"state.getHook": state?.getHook})

//useUpdateNewsletters(state?.updateHook, dispatch) 

  
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
    content={renderObj && renderObj.text}
    > 
    <Cursor cursorRef={cursorRef} cursorTop={state?.cursorTop} cursorLeft={state?.cursorLeft} />   

    </box>
  )
  //state?.renderObj?.text
  // content={state?.renderObj && state?.renderObj?.content}
}


export default MainBox

