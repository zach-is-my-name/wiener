import {_logger} from '../../devLog/logger.js'
import {useHasInternet, useHasLatestInArchive } from './index.js'
import {useReducer, useEffect} from 'react'

const initialState = {loadState: false, savedCursorPos: null}
const loadStates = ['fetchLatest','getArchiveMostRecent', 'loading', 'loadPrevHook', 'loadNextHook',  'closeSearch'] 
function reducer (state, action) {
  if (loadStates.includes(action.type)) {
    return ({loadState: action.type})
  } else if (action.type === 'renderSearch') {
    return ({...state, loadState: 'renderSearch', savedCursorPos: action.payload })
    } else if (action.type === 'closeSearch') {
      return ({...state, loadState: 'restoreWien'}) 
    }
  }

export function useInitLoad(ctrDispatch) {
  const hasInternet = useHasInternet()
  const {hasLatestInArchive, dateLatestPub} = useHasLatestInArchive(hasInternet)
 

  useEffect(() =>  {
    _logger.info(`hasInternet === true: ${hasInternet === true}`)
    if (hasInternet === true) {

      if (hasLatestInArchive === true) {
        ctrDispatch({type: "getArchiveMostRecent"})

      } else if (hasLatestInArchive === false) {
        ctrDispatch({type: "fetchLatest"})

      } else if (hasLatestInArchive === "loading") {
        ctrDispatch({type: "loading"}) 
      }
    } else if (hasInternet === false) { //no internet
      ctrDispatch({type: "getArchiveMostRecent"})
    }
    else if (hasInternet === "loading") {
      ctrDispatch({type: "loading"}) 
    } 
  }, [hasInternet, hasLatestInArchive])
  return [state.loadState , ctrDispatch, dateLatestPub, hasInternet, state.savedCursorPos]  
}


