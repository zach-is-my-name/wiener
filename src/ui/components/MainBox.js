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
        
const initialState = { cursorTop: 0, cursorLeft: 0, wasMouseClicked: false, stateCallbackFlag: false, mode: "latest", renderObj: {date: "", content:"" }, getHook: "", updateHook: false }

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
      return {...state, getHook: action.payload};
    case 'updateHook':
      return {...state, updateHook: action.payload};
    case 'loadPrev':
      return {...state, loadPrev:action.payload};
    case 'loadNext':
      return {...state, loadNext: action.payload };
    case 'placeholder':
      return {...state };
    default:
      throw new Error("reducer error");
  }
}

const MainBox = ({hasInternet, hasLatestInArchive, weeksElapsed}) =>  {
  const [state, dispatch] = useReducer(reducer, initialState);
  const mainBoxRef = useRef(null)
  const cursorRef = useRef(null)
  const isFirstRender = useRef(true)
  const scrollToScrollHeightFlagRef = useRef(false)
  const scrollToZeroFlagRef = useRef(false)
  
  /*   latest newsletter $ wienr 
    previous newsletters $ wienr (in-app)
  search all newsletters $ wienr (in-app)'
 */

  //const keyHandler = useKeyHandler(mainBoxRef, scrollToScrollHeightFlagRef, scrollToZeroFlagRef)
  // console.log({hasInternet})
/* 
  if (hasInternet) {
    if (hasLatestInArchive) {
      dispatch({type: "getHook", payload: "useLoadArchiveMostRecent"})
    } else {
      dispatch({type: "getHook", payload: "useFetchLatest"})
    }
  } else { //no internet
    dispatch({type: "getHook", payload: "useLoadArchiveMostRecent"})
  }
  if (hasInternet && !hasAllNewsletters) {
    dispatch({type: "updateHook", payload: true})
  }
*/
  //useGetWien(state.getHook, dispatch)
  //useUpdateNewsletters(state.updateHook, dispatch) 
  
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
    content={"ruf"}
    /*content={state.renderObj && state.renderObj.text}*/
    > 

    <Cursor cursorRef={cursorRef} cursorTop={state.cursorTop} cursorLeft={state.cursorLeft} />   

    </box>
  )

}


export default MainBox

