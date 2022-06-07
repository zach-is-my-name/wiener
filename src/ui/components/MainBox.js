import {_logger, logger2} from '../../devLog/logger.js' 
import {useTraceUpdate} from '../../devScripts/useTraceUpdates.js'
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
        
const initialState = { cursorTop: 0, cursorLeft: 0, wasMouseClicked: false, /*stateCallbackFlag: false,*/ /*mode: "latest",*/ renderObj: {date: "", text: "", url:""}, getHook: "", updateHook: false,  loading: false }

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
      //_logger.info("reducer", {action})
      return {...state, getHook: action.payload};
    case 'updateHook':
      return {...state, updateHook: action.payload};
    case 'loadPrev':
      return {...state, loadPrev:action.payload};
    case 'loadNext':
      return {...state, loadNext: action.payload };
    case 'loading':
      return {...state, loading: true };
    case 'placeholder':
      return {...state };
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
  const [state, dispatch] = useReducer(reducer, initialState);
  const mainBoxRef = useRef(null)
  const cursorRef = useRef(null)
  const isFirstRender = useRef(true)
  const scrollToScrollHeightFlagRef = useRef(false)
  const scrollToZeroFlagRef = useRef(false)
  // _logger.info({"MainBox renders" : renderCount.current})

  useTraceUpdate({...props, ...state})

  //const keyHandler = useKeyHandler(mainBoxRef, scrollToScrollHeightFlagRef, scrollToZeroFlagRef)

const renderObj = useGetWien(state?.getHook, dispatch);

 useEffect(() => {
   if (renderObj && renderObj.text.length) {
     dispatch({type: "updateHook", payload: true})
   }
 }, [renderObj]
 )
  
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
  // _logger.info({renderObj, hasInternet, keys:renderObj && Object.keys(renderObj).length})
  // if (hasInternet && renderObj && Object.keys(renderObj).length) {
  //   dispatch({type: "updateHook", payload: true})
  // }

 }, [hasInternet, hasLatestInArchive])
 
  useUpdateNewsletters(state?.updateHook, dispatch) 

  
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

