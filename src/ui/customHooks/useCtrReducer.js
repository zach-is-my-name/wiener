import {useReducer, useState} from 'react'
import {logger} from '../../devLog/logger.js'
logger.level = "debug"

const initialState = {loadState: false, helpPageHidden: true, searchPageHidden: true, message: ""}

const loadStates = ['fetchLatest', 'getArchiveMostRecent', 'loading', 'loadPrevHook', 'loadNextHook', 'loaded', 'none'] 

function reducer (state, action) {

  if (loadStates.includes(action.type)) {
    return ({...state, loadState: action.type})

  } else if (action.type === 'setHasContinuity') {
    return ({...state, hasContinuity: action.payload}) 
    
  } else if (action.type === 'setMessage') {
    return ({...state, loadState: 'message', message: action.payload})  

  } else if (action.type === 'clearMessage') {
    return ({...state, message: ""})  

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
  // logger.debug("state", state)
  return [state.loadState, ctrDispatch, hasLatest, setHasLatest, state.helpPageHidden, state.searchPageHidden, state.message]
}


