import React, {useEffect, useState} from 'react'
import {getDateLatestInArchive} from '../../db/db.js' 
import {fetchDateCurrent} from '../../utilities.js'
import {logger} from '../../devLog/logger.js'
logger.level = "debug"

export function useHasLatestInArchive(hasInternet) {
  const [hasLatestInArchive, setHasLatestInArchive] = useState("loading") 
  const [dateLatestPub, setDateLatestPub] = useState(null) 
  const [dateNumberFormat, setDateNumberFormat] = useState(null)
  const [dateWordFormat, setDateWordFormat] = useState(null)

  useEffect(() => {
    (async () => {
    const { dateWordFormat, dateNumberFormat} = await fetchDateCurrent()

    // logger.debug({dateNumberFormat, dateWordFormat})
    setDateWordFormat(dateWordFormat)
    setDateNumberFormat(dateNumberFormat)  
    setDateLatestPub(dateNumberFormat)
    })();
  }, [dateNumberFormat, dateWordFormat])

  useEffect(()=> {
    if (hasLatestInArchive === "loading" && hasInternet === true ) {
      (async () => {
        const latestArchiveDate  = await getDateLatestInArchive();
        if (!latestArchiveDate) {
          setHasLatestInArchive(false)
        } else {
          setHasLatestInArchive(Boolean(dateNumberFormat === latestArchiveDate))
        }
      })()
    }
  }, [hasInternet, dateNumberFormat])
  return {hasLatestInArchive, dateLatestPub} 
}
