import React, {useState, useEffect} from 'react';
import MainBox from './MainBox.js' 
import SearchPage from './SearchPage.js'
import HelpPage from './HelpPage.js'
import {logger} from '../../devLog/logger.js' 
logger.level = "debug"

import {
  useCtrReducer,
  useInitLoad, 
  useGetWien, 
  useUpdateNewsletters,
} from '../customHooks/index.js'

function App(props) {

  const [dateFromSearch, setDateFromSearch] = useState("") 
  const [lineFromSearch, setLineFromSearch] = useState(null) 
  const [message, setMessage] = useState("")

  const [{loadState, helpPageHidden, searchPageHidden, popUpMessage}, ctrDispatch] = useCtrReducer()

  const [dateLatestPub, hasInternet, hasLatestInArchive] = useInitLoad(ctrDispatch, loadState) 

  const {text, date} = useGetWien(loadState, ctrDispatch, hasLatestInArchive, hasInternet, dateFromSearch, setDateFromSearch, dateLatestPub) || {};

  useEffect(() => {
    logger.debug({loadState})
  })

  useUpdateNewsletters(dateLatestPub, hasLatestInArchive, hasInternet, text) 

  useEffect(() => {
    if (!hasInternet && loadState === 'none') {
      setTimeout(() => null, 5000)
      setMessage("Error: newsletter DB is empty and there is no internet. connect to internet to populate newsletter db")
    }

    if (loadState === 'loading') {
      setMessage("Loading...") 
    } 

  }, [hasInternet, loadState])

  return ( 
    <MainBox setDateFromSearch={setDateFromSearch} setLineFromSearch={setLineFromSearch} lineFromSearch={lineFromSearch} searchPageHidden={searchPageHidden} renderText={text} /*linkObjArr={linkObjArr}*/ ctrDispatch={ctrDispatch} helpPageHidden={helpPageHidden} message={message} popUpMessage={popUpMessage}/>
  )
}

export default App
