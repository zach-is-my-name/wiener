import {parse, stringify, toJSON, fromJSON} from 'flatted';
import {_logger, logger, logger2} from '../../devLog/logger.js' 
logger.level = "debug"
import React, {useState, useEffect} from 'react';
import MainBox from './MainBox.js' 
import SearchPage from './SearchPage.js'

import {
  useCtrReducer,
  useInitLoad, 
  useGetWien, 
  useUpdateNewsletters,
  useHookController, 
} from '../customHooks/index.js'


function App(props) {

  const [dateFromSearch, setDateFromSearch] = useState("") 
  const [renderSearch, setRenderSearch] = useState(false)

  const [loadState, ctrDispatch, hasLatest, setHasLatest, savedCursorPos] = useCtrReducer()

  const [dateLatestPub, hasInternet, hasLatestInArchive] = useInitLoad(ctrDispatch) 

  useEffect(() => {
    logger.debug("loadState", loadState)
  }, [loadState])

  const {text, date} = useGetWien(loadState, ctrDispatch, hasLatestInArchive, hasInternet, dateLatestPub, dateFromSearch, setHasLatest) || {};

  // useEffect(() => {
  //   logger.debug("APP NLO DATE: ", date)
  // }, [date])

  useEffect(() => {
    if (loadState === "renderSearch") setRenderSearch(state => !state)
  }, [loadState])

  useUpdateNewsletters(dateLatestPub, hasLatest) 

  if (!renderSearch) {
    return ( 
      <MainBox renderText={text} ctrDispatch={ctrDispatch} savedCursorPos={savedCursorPos}  />
    )
  } else if (renderSearch) {
    return (
      <SearchPage setDateFromSearch={setDateFromSearch} ctrDispatch={ctrDispatch}/>
    )
  } else if (loadState === 'loading') {
    return null
  }
}

export default App
