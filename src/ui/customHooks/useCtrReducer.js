import {logger, logger2} from '../../devLog/logger.js'
logger.level = "debug"

import {useReducer, useState} from 'react'

const initialState = {loadState: false, savedCursorPos: null, helpPageHidden: true }

const loadStates = ['fetchLatest','getArchiveMostRecent', 'loading', 'loadPrevHook', 'loadNextHook', 'closeSearch', 'loaded'  ] 

function reducer (state, action) {
  if (loadStates.includes(action.type)) {
    return ({...state, loadState: action.type})
  } else if (action.type === 'renderSearch') {
    return ({...state, loadState: 'renderSearch', savedCursorPos: action.payload })
  } else if (action.type === 'closeSearch') {
    return ({...state, loadState: 'restoreWien'}) 
  } else if (action.type === 'toggleHelpPage') {
    logger.debug("state", state)   
    return ({...state, helpPageHidden: !state.helpPageHidden})
  }
}


export function useCtrReducer() {
  const [hasLatest, setHasLatest] = useState(false)
  const [state, ctrDispatch] = useReducer(reducer, initialState);
  return [state?.loadState, ctrDispatch, hasLatest, setHasLatest, state?.savedCursorPos, state?.helpPageHidden]
}
