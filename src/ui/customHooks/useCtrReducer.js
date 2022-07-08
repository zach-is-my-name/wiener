import {useReducer, useState} from 'react'

const initialState = {loadState: false, savedCursorPos: null}

const loadStates = ['fetchLatest','getArchiveMostRecent', 'loading', 'loadPrevHook', 'loadNextHook', 'closeSearch', 'loaded' ] 

function reducer (state, action) {
  if (loadStates.includes(action.type)) {
    return ({loadState: action.type})
  } else if (action.type === 'renderSearch') {
    return ({...state, loadState: 'renderSearch', savedCursorPos: action.payload })
  } else if (action.type === 'closeSearch') {
    return ({...state, loadState: 'restoreWien'}) 
  }
}


export function useCtrReducer() {
  const [hasLatest, setHasLatest] = useState(false)
  const [state, ctrDispatch] = useReducer(reducer, initialState);
  return [state.loadState, ctrDispatch, hasLatest, setHasLatest, state.savedCursorPos]
}
