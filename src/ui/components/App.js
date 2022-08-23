import {parse, stringify, toJSON, fromJSON} from 'flatted';
import {_logger, logger2} from '../../devLog/logger.js' 
import React, {useState, useEffect} from 'react';
import MainBox from './MainBox.js' 
import SearchPage from './SearchPage.js'

import {
  useInitLoad, 
  useGetWien, 
  useUpdateNewsletters,
} from '../customHooks/index.js'


function App(props) {

  const [dateFromSearch, setDateFromSearch] = useState("") 
  const [lineFromSearch, setLineFromSearch] = useState(null) 

  const [loadState, ctrDispatch, hasLatest, setHasLatest, savedCursorPos, helpPageHidden, searchPageHidden] = useCtrReducer()

  const [dateLatestPub, hasInternet, hasLatestInArchive, setHasLatestInArchive] = useInitLoad(ctrDispatch) 

  const {text, date} = useGetWien(loadState, ctrDispatch, hasLatestInArchive,setHasLatestInArchive, hasInternet, dateLatestPub, dateFromSearch, setHasLatest, setDateFromSearch) || {};

  useUpdateNewsletters(dateLatestPub, hasLatestInArchive, hasInternet) 

  if (loadState === 'loading') {
    return "loading..."
  } 
    return ( 
      <MainBox setDateFromSearch={setDateFromSearch} setLineFromSearch={setLineFromSearch} lineFromSearch={lineFromSearch} searchPageHidden={searchPageHidden} renderText={text} ctrDispatch={ctrDispatch} helpPageHidden={helpPageHidden}  />
    )
}

export default App
