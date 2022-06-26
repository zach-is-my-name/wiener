import {_logger} from '../../../devLog/logger.js'
import {useRef, useReducer} from 'react'
import {useKeyHandler, useScroll, useMouseClick, useUIReducer, useGetRefs} from '../index.js'


export function useInput() {

  const [state, dispatch] = useUIReducer()

  const refsObjArr = useGetRefs()
  const [{followLinkUnderCursor, keyHandler}] = useKeyHandler(refsObjArr, state, dispatch)

  useScroll(refsObjArr, state, dispatch)

  const [{clickHandler}] = useMouseClick(refsObjArr, state, dispatch, followLinkUnderCursor)

  return [{keyHandler, clickHandler}, ...refsObjArr, state]  
}
