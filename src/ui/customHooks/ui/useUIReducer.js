// import {_logger} from '../../../devLog/logger.js' 

import {useReducer} from 'react'

const initialState = { cursorTop: 0, cursorLeft: 0, wasMouseClicked: false, linkIndex: false, linkLine: null}

function reducer(state, action) {
  switch (action.type) {
    case 'setCursorTop':
      return {...state, cursorTop: action.payload};
    case 'setCursorLeft':
      //state.count - 1??? 
      return {...state, cursorLeft: action.payload};
    case 'toggleWasMouseClicked':
      return {...state, wasMouseClicked: !state.wasMouseClicked};
    case 'openLink':
      return {...state, linkIndex: action.payload.linkIndex, linkLine: action.payload.line }; 
    case 'closeLinkBox':
      return {...state, linkIndex: false};
    default:
     throw new Error("UI reducer error") 
  }
}

export function useUIReducer () {
  const [state, dispatch] = useReducer(reducer, initialState)
 

  return [ state,  dispatch  ] 

}
