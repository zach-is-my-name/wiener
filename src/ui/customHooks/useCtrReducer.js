import {logger, logger2} from '../../devLog/logger.js'
logger.level = "debug"

import {useReducer, useState} from 'react'

const initialState = {loadState: false, helpPageHidden: true, searchPageHidden: true }

const loadStates = ['fetchLatest', 'getArchiveMostRecent', 'loading', 'loadPrevHook', 'loadNextHook', 'loaded', 'none'] 

function reducer (state, action) {
  if (loadStates.includes(action.type)) {
    return ({...state, loadState: action.type})

  } else if (action.type === 'toggleRenderSearch') {
    return ({...state, searchPageHidden: !state.searchPageHidden})

  } else if (action.type === 'toggleHelpPage') {
    return ({...state, helpPageHidden: !state.helpPageHidden})

  } else if(action.type === 'exitSearchPage') {
    return ({...state, searchPageHidden: true}) 

  } else if (action.type === 'exitHelpPage') {
    return ({...state, helpPageHidden: true})
  } 
}

export function useCtrReducer() {
  const [hasLatest, setHasLatest] = useState(false)
  const [state, ctrDispatch] = useReducer(reducer, initialState);
  return [state?.loadState, ctrDispatch, hasLatest, setHasLatest, state?.savedCursorPos, state?.helpPageHidden, state?.searchPageHidden]
}
