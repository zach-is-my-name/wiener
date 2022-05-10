import React from 'react';
import {useStateWithCallbackLazy} from 'use-state-with-callback'
import Cursor from "./Cursor.js"  
import  {useReducer, useEffect, useRef, useCallback} from 'react';
import {useKeyHandler, 
        useClickHandler, 
        //useUpdateArchive,
        useGetWien, 
        //useScroll,
        useMouseClick,      
        } from './customHooks/index.js'

const initialState = { cursorTop: 0, cursorLeft: 0, renderObj: null, wasMouseClicked: false, stateCallbackFlag: false, mode: "latest", renderObj: {date: "", content:"" } }

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
    case 'placeholder':
      return {...state };
    default:
      throw new Error("reducer error");
  }
}


const MainBox = ({hasInternet, hasLatest, argObj}) =>  {
  const [state, dispatch] = useReducer(reducer, initialState);
  const mainBoxRef = useRef(null)
  const cursorRef = useRef(null)
  const isFirstRender = useRef(true)
  const scrollToScrollHeightFlagRef = useRef(false)
  const scrollToZeroFlagRef = useRef(false)

  /*   latest newsletter $ wienr 
    previous newsletters $ wienr (in-app)
  search all newsletters $ wienr (in-app)'
  argObj={input: cli.input[0], flags: cli.flags} */
  
  const argObj = {props.argObj, props.hasInternet }
   
  useGetWien(argObj)

  const keyHandler = useKeyHandler(mainBoxRef, scrollToScrollHeightFlagRef, scrollToZeroFlagRef)

  if (hasInternet) {
    if (hasLatest) {
      useLoadArchiveLatest()
    } else {
      useFetchLatest()
    }
  } else {
    useLoadArchiveMostRecent()
  }

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
    onKeypress={(e) => keyHandler(e,  )}
    onClick={() =>clickHandler(mainBoxRef)}
    ref={mainBoxRef}
    content={renderObj && renderObj.text} 
    > 

    <Cursor cursorRef={cursorRef} cursorTop={cursorTop} cursorLeft={cursorLeft} />   
    </box>
  )

}


export default MainBox

