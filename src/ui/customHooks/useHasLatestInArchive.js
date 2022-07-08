import {_logger, logger2} from '../../devLog/logger.js' 
import React, {useEffect, useState} from 'react'
import {getDateFromLatestInArchive} from '../../db/db.js' 
import {fetchDateFromCurrentNewsletter} from '../../utilities.js'

export function useHasLatestInArchive(hasInternet) {
  const [hasLatestInArchive, setHasLatestInArchive] = useState("loading") 
  const [dateCurrentNewsletter, setDateCurrentNewsletter] = useState({dateCurrentNewsletter: {dateWithMonthName: null, dateWithMonthNumber:null}} ) 



  useEffect(()=> {
    if (hasLatestInArchive === "loading" && hasInternet) {
      (async () => {

        const { dateWithMonthName, dateWithMonthNumber:latestPublishedDate } = await fetchDateFromCurrentNewsletter()
        
        const result = await getDateFromLatestInArchive() 
        const latestArchiveDate= result.date

        const areEqual = Boolean(latestPublishedDate === latestArchiveDate) 
        setDateCurrentNewsletter({dateWithMonthName, latestPublishedDate}) 
        setHasLatestInArchive(areEqual)

      })()
    }
  })
  return {hasLatestInArchive, dateLatestPub} 
}
