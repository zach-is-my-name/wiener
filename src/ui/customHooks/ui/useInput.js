import {_logger} from '../../../devLog/logger.js'
import {useRef, useReducer} from 'react'
import {useKeyHandler, useScroll, useMouseClick, useUIReducer, useGetRefs} from '../index.js'


export function useInput() {

  const [state, dispatch] = useUIReducer()
  
  const refsObjArr = useGetRefs()
  //const debugRes = useKeyHandler(refsObjArr, state, dispatch)
  //console.log({debugRes})
   const [{followLinkUnderCursor, keyHandler}] = useKeyHandler(refsObjArr, state, dispatch)
 
  useScroll(refsObjArr, dispatch)
  //console.log("followLinkUnderCursor", followLinkUnderCursor.toString())
  const [{clickHandler}] = useMouseClick(refsObjArr, state, dispatch, followLinkUnderCursor)

  return [{keyHandler, clickHandler}, ...refsObjArr, state]  
}
