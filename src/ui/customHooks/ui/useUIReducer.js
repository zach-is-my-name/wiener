import {logger} from '../../../devLog/logger.js' 
logger.level = "debug"
import {useReducer} from 'react'

const initialState = { cursorTop: 0, cursorLeft: 0, wasMouseClicked: false, openLinkIndex: false, linkLine: null, initialRefNum: null}

function reducer(state, action) {
  switch (action.type) {
    case 'setCursorTop':
      return {...state, cursorTop: action.payload};
    case 'setCursorLeft':
      return {...state, cursorLeft: action.payload};
    case 'toggleWasMouseClicked':
      return {...state, wasMouseClicked: !state.wasMouseClicked};
    case 'openLinkBox':
      return {...state, openLinkIndex: action.payload.openLinkIndex, linkLine: action.payload.line }; 
    case 'closeLinkBox':
      return {...state, openLinkIndex: false};
    case 'openRefBox':
      return {...state, initialRefNum: action.payload} 
    case 'closeRefBox':
      return {...state, initialRefNum: null} 

    default:
     throw new Error("UI reducer error") 
  }
}

export function useUIReducer () {
  const [state, dispatch] = useReducer(reducer, initialState)
  return [ state,  dispatch  ] 

}
