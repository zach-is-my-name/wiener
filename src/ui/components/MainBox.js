import React from 'react';
import Cursor from "./Cursor.js"  
import  {useReducer, useEffect, useRef, useCallback} from 'react';
import {useKeyHandler, 
        useClickHandler, 
        //useUpdateArchive,
        useGetWien, 
        useStateWithCallbackLazy, 
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


const MainBox = (props) =>  {
  const [state, dispatch] = useReducer(reducer, initialState);
  const mainBoxRef = useRef(null)
  const cursorRef = useRef(null)
  const isFirstRender = useRef(true)
  const scrollToScrollHeightFlagRef = useRef(false)
  const scrollToZeroFlagRef = useRef(false)
  /*   latest newsletter $ wienr 
    previous newsletters $ wienr                                 
  search all newsletters $ wienr -s 'search terms'

  argObj={input: cli.input[0], flags: cli.flags} */
  
  const argObj = {props}
   
  useGetWien(argObj)
  //useUpdateArchive() 

  

  const keyHandler = useKeyHandler(mainBoxRef, scrollToScrollHeightFlagRef, scrollToZeroFlagRef)

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

