import {_logger} from '../../../devLog/logger.js' 

import {useReducer} from 'react'

const initialState = { cursorTop: 0, cursorLeft: 0, wasMouseClicked: false}

function reducer(state, action) {
  switch (action.type) {
    case 'setCursorTop':
      return {...state, cursorTop: action.payload};
    case 'setCursorLeft':
      //state.count - 1??? 
      return {...state, cursorLeft: action.payload};
    case 'toggleWasMouseClicked':
      return {...state, wasMouseClicked: !state.wasMouseClicked};
    case 'setStateCallbackFlag':
      return {...state, stateCallbackFlag:!state.stateCallbackFlag};
    default:
      _logger.warn("reducer error", {type: action.type, payload:action.payload})
  }
}

export function useUIReducer () {
  const [state, dispatch] = useReducer(reducer, initialState)
 

  return [ state,  dispatch  ] 

}
