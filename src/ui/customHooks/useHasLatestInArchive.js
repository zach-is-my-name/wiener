import React, {useEffect, useState} from 'react'
import {getDateLatestInArchive} from '../../db/db.js' 
import {fetchDateCurrent, parseDate} from '../../utilities.js'

import {getArchiveLength} from '../../db/db.js'

export function useHasLatestInArchive(hasInternet, loadState) {
  const [hasLatestInArchive, setHasLatestInArchive] = useState("loading") 
  const [dateLatestPub, setDateLatestPub] = useState(null) 
  const [dateNumberFormat, setDateNumberFormat] = useState(null)
  const [dateWordFormat, setDateWordFormat] = useState(null)
  const [archiveLength, setArchiveLength] = useState(null)

  useEffect(() => {
    (async () => {
      const { dateWordFormat, dateNumberFormat} = await fetchDateCurrent()
      setDateWordFormat(dateWordFormat)
      setDateNumberFormat(dateNumberFormat)  
      setDateLatestPub(dateNumberFormat)
    })();
  }, [dateNumberFormat, dateWordFormat])

  useEffect(() => {
    if (hasLatestInArchive !== true) {
      (async () => {
        setArchiveLength(await getArchiveLength())
      })();
    }
  }, [loadState])

  useEffect(()=> {
    if (hasLatestInArchive !== true && hasInternet === true ) {
      (async () => {
        const latestArchiveDate = await getDateLatestInArchive();

        if (Array.isArray(latestArchiveDate) && latestArchiveDate.length === 0) setHasLatestInArchive(false)
        let parsedLatestArchiveDate = parseDate(latestArchiveDate)
        let parsedDateNumberFormat = parseDate(dateNumberFormat)

        if (parsedLatestArchiveDate && parsedDateNumberFormat) {
          let hasLatestBool = Boolean(dateNumberFormat === latestArchiveDate)
          setHasLatestInArchive(hasLatestBool)
        } 
        
      })()
    }
  }, [hasInternet, dateNumberFormat, hasLatestInArchive, archiveLength])

  return {hasLatestInArchive, dateLatestPub} 
}

