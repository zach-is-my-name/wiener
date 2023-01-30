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

  const [loadState, ctrDispatch, hasLatest, setHasLatest, savedCursorPos, helpPageHidden, searchPageHidden] = useCtrReducer()

  const [dateLatestPub, hasInternet, hasLatestInArchive, setHasLatestInArchive] = useInitLoad(ctrDispatch) 

  const {text, date /*, linkObjArr*/} = useGetWien(loadState, ctrDispatch, hasLatestInArchive,setHasLatestInArchive, hasInternet, dateLatestPub, dateFromSearch, setHasLatest, setDateFromSearch) || {};

  useUpdateNewsletters(dateLatestPub, hasLatestInArchive, hasInternet, text) 

  const [message, setMessage] = useState("")

  useEffect(() => {
    // logger.debug({loadState})
  if (!hasInternet && loadState === 'none') {
    setTimeout(() => null, 5000)
    setMessage("Error: newsletter DB is empty and there is no internet. connect to internet to populate newsletter db")
  }

  if (loadState === 'loading') {
   setMessage("Loading...") 
  } 

  }, [hasInternet, loadState])
    
    return ( 
      <MainBox setDateFromSearch={setDateFromSearch} setLineFromSearch={setLineFromSearch} lineFromSearch={lineFromSearch} searchPageHidden={searchPageHidden} renderText={text} /*linkObjArr={linkObjArr}*/ ctrDispatch={ctrDispatch} helpPageHidden={helpPageHidden}  message={message}/>
    )
}

export default App
