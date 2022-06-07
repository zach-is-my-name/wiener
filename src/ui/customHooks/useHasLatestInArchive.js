import {_logger, logger2} from '../../devLog/logger.js' 
import React, {useEffect, useState} from 'react'
import {getDateFromLatestInArchive} from '../../db/db.js' 
import {fetchDateFromCurrentNewsletter} from '../../utilities.js'
//import  pkg from 'use-state-with-callback';
//const  {useStateWithCallbackLazy}  = pkg 

export function useHasLatestInArchive() {
  // const [latestPublishedDate, setLatestPublishedDate] = useStateWithCallbackLazy(null)
  const [hasLatestInArchive, setHasLatestInArchive] = useState("loading") 
  //_logger.info({hasLatestInArchive})
  useEffect(()=> {
    (async () => {
      const latestPublishedDate = await fetchDateFromCurrentNewsletter()
      const latestArchiveDate = await getDateFromLatestInArchive() 
      //_logger.info({latestPublishedDate, latestArchiveDate, areEqualResult: areEqual()})  
      const areEqual =  Boolean(latestPublishedDate ===  latestArchiveDate) 
      setHasLatestInArchive(areEqual)
    })()
  })
  return hasLatestInArchive
}




