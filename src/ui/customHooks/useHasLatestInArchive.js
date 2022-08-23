import {_logger, logger2} from '../../devLog/logger.js' 
import React, {useEffect, useState} from 'react'
import {getDateLatestInArchive} from '../../db/db.js' 
import {fetchDateCurrent} from '../../utilities.js'

export function useHasLatestInArchive(hasInternet) {
  const [hasLatestInArchive, setHasLatestInArchive] = useState("loading") 
  const [dateLatestPub, setDateLatestPub] = useState(null) 



  useEffect(()=> {
    if (hasLatestInArchive === "loading" && hasInternet === true ) {
      (async () => {
        const { dateWithMonth, dateWithMonthNumber:latestPublishedDate } = await fetchDateCurrent()
        const latestArchiveDate  = await getDateLatestInArchive();
        // _logger.info(JSON.stringify({dateWithMonth, latestPublishedDate}))
        // _logger.info(JSON.stringify({latestArchiveDate })) 
        if (!latestArchiveDate) {
          setHasLatestInArchive(false)
        } else {
          setHasLatestInArchive(Boolean(latestPublishedDate === latestArchiveDate))
        }

        setDateLatestPub(dateWithMonth) 

      })();
    }
  })
  return {hasLatestInArchive, dateLatestPub, setHasLatestInArchive} 
}
