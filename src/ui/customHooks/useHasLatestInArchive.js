import {_logger, logger2} from '../../devLog/logger.js' 
import React, {useEffect, useState} from 'react'
import {getDateFromLatestInArchive} from '../../db/db.js' 
import {fetchDateFromCurrentNewsletter} from '../../utilities.js'

export function useHasLatestInArchive() {
  const [hasLatestInArchive, setHasLatestInArchive] = useState("loading") 
  const [dateCurrentNewsletter, setDateCurrentNewsletter] = useState({dateCurrentNewsletter: {dateWithMonth: null, dateNoMonth:null}} ) 

  useEffect(()=> {
    if (hasLatestInArchive === "loading" || dateCurrentNewsletter === null) {
      (async () => {

        const { dateWithMonth, dateNoMonth:latestPublishedDate } = await fetchDateFromCurrentNewsletter()
        
        const result = await getDateFromLatestInArchive() 
        const latestArchiveDate= result.date
        logger2.info(`calling hook where date is compared to latest published: ${latestPublishedDate} `, JSON.stringify(result.date))

        const areEqual = Boolean(latestPublishedDate === latestArchiveDate) 
        setDateCurrentNewsletter({dateWithMonth, latestPublishedDate}) 
        setHasLatestInArchive(areEqual)

      })()
    }
  }, [])

  return {hasLatestInArchive, dateCurrentNewsletter} 
}
