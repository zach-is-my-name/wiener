import {useRef, useReducer} from 'react'
import {useKeyHandler, useScroll, useMouseClick, useUIReducer, useGetRefs} from '../index.js'
import {logger} from '../../../devLog/logger.js' 
logger.level = "debug"

export function useUiHooks(ctrDispatch, lineFromSearch, setLineFromSearch, loadState) {

  const [state, dispatch] = useUIReducer()

  const refs = useGetRefs()

  const [{followLinkUnderCursor, keyHandler}] = useKeyHandler(refs, state, dispatch, ctrDispatch)

  useScroll(refs, state, dispatch, lineFromSearch, setLineFromSearch, loadState)

  const [{clickHandler}] = useMouseClick(refs, state, dispatch, followLinkUnderCursor)
  
  return [{keyHandler, clickHandler} , dispatch, refs, state]  
}
