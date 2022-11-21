import {parse, stringify, toJSON, fromJSON} from 'flatted';
import {_logger} from '../../../devLog/logger.js'
import {useRef, useReducer} from 'react'
import {useKeyHandler, useScroll, useMouseClick, useUIReducer, useGetRefs} from '../index.js'


export function useUiHooks(ctrDispatch, lineFromSearch, setLineFromSearch) {

  const [state, dispatch] = useUIReducer()

  const refsObjArr = useGetRefs()
  const [{followLinkUnderCursor, keyHandler}] = useKeyHandler(refsObjArr, state, dispatch, ctrDispatch)

  useScroll(refsObjArr, state, dispatch, lineFromSearch, setLineFromSearch)

  const [{clickHandler}] = useMouseClick(refsObjArr, state, dispatch, followLinkUnderCursor)

  return [{keyHandler, clickHandler, dispatch}, ...refsObjArr, state]  
}
