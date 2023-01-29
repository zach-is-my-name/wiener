import React, {useEffect, useState} from 'react'
import {getDateLatestInArchive} from '../../db/db.js' 
import {fetchDateCurrent} from '../../utilities.js'

export function useHasLatestInArchive(hasInternet) {
  const [hasLatestInArchive, setHasLatestInArchive] = useState("loading") 
  const [dateLatestPub, setDateLatestPub] = useState(null) 

  useEffect(()=> {
    if (hasLatestInArchive === "loading" && hasInternet === true ) {
      (async () => {
        const { dateWithMonth, dateWithMonthNumber:latestPublishedDate } =       await fetchDateCurrent()
        const latestArchiveDate  = await getDateLatestInArchive();
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
