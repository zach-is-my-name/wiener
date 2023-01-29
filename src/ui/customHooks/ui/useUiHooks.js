import {useRef, useReducer} from 'react'
import {useKeyHandler, useScroll, useMouseClick, useUIReducer, useGetRefs} from '../index.js'
import {logger} from '../../../devLog/logger.js' 
logger.level = "debug"

export function useUiHooks(ctrDispatch, lineFromSearch, setLineFromSearch) {

  const [state, dispatch] = useUIReducer()

  const refs = useGetRefs()

  const [{followLinkUnderCursor, keyHandler}] = useKeyHandler(refs, state, dispatch, ctrDispatch)

  useScroll(refs, state, dispatch, lineFromSearch, setLineFromSearch)

  const [{clickHandler}] = useMouseClick(refs, state, dispatch, followLinkUnderCursor)
  
  return [{keyHandler, clickHandler} , dispatch, refs, state]  
}
