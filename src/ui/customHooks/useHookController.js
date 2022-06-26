import {_logger, logger2} from '../../devLog/logger.js' 
import {useReducer, useEffect} from 'react'

const initialState = {renderObj: {url: "", text: "", prevUrl: ""}, getHook: "", updateHook: false,  loading: false }

function reducer (state, action) {
  switch (action.type) {
    case 'setRenderObj':
      return {...state, renderObj: action.payload };
    case 'getHook':
      return {...state, getHook: action.payload};
    case 'updateHook':
      return {...state, updateHook: action.payload};
    case 'loadPrev':
      return {...state, loadPrev:action.payload};
    case 'loadNext':
      return {...state, loadNext: action.payload };
    case 'loading':
      return {...state, loading: true };
    case 'placeholder':
      return {...state };
    default:
      _logger.warn("reducer error", {type: action.type, payload:action.payload})
  }
}

export function useHookController(hasInternet, hasLatestInArchive) {
  const [state, ctrDispatch] = useReducer(reducer, initialState);

  useEffect(() =>  {
    if (hasInternet === true) {

      if (hasLatestInArchive === true) {
        ctrDispatch({type: "getHook", payload: "loadArchiveMostRecent"})

      } else if (hasLatestInArchive === false) {
        ctrDispatch({type: "getHook", payload: "fetchLatest"})

      } else if (hasLatestInArchive === "loading") {
        ctrDispatch({type: "loading"}) 
      }
    } else if (hasInternet === false) { //no internet
      ctrDispatch({type: "getHook", payload: "loadArchiveMostRecent"})
    }
    else if (hasInternet === "loading") {
      ctrDispatch({type: "loading"}) 
    }

  }, [hasInternet, hasLatestInArchive])

  useEffect(() => {
    if (state?.renderObj && state?.renderObj.text.length) {
      ctrDispatch({type: "updateHook", payload: true})
    }
  }, [state.renderObj]
  )

  return [state, {ctrDispatch}]  
}
