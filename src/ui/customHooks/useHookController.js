import {_logger, logger2} from '../../devLog/logger.js' 
import {useReducer, useEffect} from 'react'

const initialState = {loadState: false}

function reducer (state, action) {
  return {loadState: action.type}
  }
}

export function useHookController(hasInternet, hasLatestInArchive) {
  const [state, ctrDispatch] = useReducer(reducer, initialState);

  useEffect(() =>  {
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

  return [state.loadState , ctrDispatch]  
}
