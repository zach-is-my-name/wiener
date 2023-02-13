import {useReducer, useState} from 'react'
import {logger} from '../../devLog/logger.js'
logger.level = "debug"

const loadStates = ['fetchLatest', 'getArchiveMostRecent', 'loading', 'loadPrevHook', 'loadNextHook', 'none', 'gotoLatestInArchive', 'gotoLatestInArchive', 'loadFromSearch' ] 

const loadedStates = ['loadedFromSearch', 'loadedFromBackButton', 'loadedFromNextButton',  'loadedFromFetchLatest' , 'loadedFromGotoLatest']

export function useCtrReducer() {


  function reducer (prevState, action) {

    if (loadStates.includes(action.type)) {
      return ({...prevState, loadState: action.type})

    } else if (loadedStates.includes(action.type)) {
      return ({...prevState, loadState: action.type})

    } else if (action.type === 'setHasContinuity') {
      return ({...prevState, hasContinuity: action.payload}) 

    } else if (action.type === 'setPopUpMessage') {
      return ({...prevState, loadState: 'popUpMessage', popUpMessage: action.payload})  
    } else if (action.type === 'clearPopUpMessage') {
      return ({...prevState, popUpMessage: ""})  

    } else if (action.type === 'toggleRenderSearch') {
      return ({...prevState, searchPageHidden: !prevState.searchPageHidden})

    } else if (action.type === 'toggleHelpPage') {
      return ({...prevState, helpPageHidden: !prevState.helpPageHidden})

    } else if(action.type === 'exitSearchPage') {
      return ({...prevState, searchPageHidden: true}) 

    } else if (action.type === 'exitHelpPage') {
      return ({...prevState, helpPageHidden: true})
    } 
    return prevState 
  }

  const initialState = {loadState: false, helpPageHidden: true, searchPageHidden: true, popUpMessage: ""}


  const [state, ctrDispatch] = useReducer(reducer, initialState);

  // if (typeof state !== 'object' || typeof state === null)  {
  //   logger.debug("state no keys; typeof state", typeof state)
  //   return [{loadState: false, helpPageHidden: true, searchPageHidden: true, popUpMessage: ""}, ctrDispatch]
  // } else { 
  //   if (isShallowEqual(initialState, state)){
  //     logger.debug("state === initialState")
  //   }     
  //   return [state, ctrDispatch]
  // } 
  return [state, ctrDispatch]
}

