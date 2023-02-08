import React, {useEffect, useState} from 'react'
import {getDateLatestInArchive} from '../../db/db.js' 
import {fetchDateCurrent} from '../../utilities.js'

import {getArchiveLength} from '../../db/db.js'

import {logger} from '../../devLog/logger.js'
logger.level = "debug"

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
    // logger.debug("useHasLatest", {hasLatestInArchive})
    if (hasLatestInArchive !== true && hasInternet === true ) {
      (async () => {
        const latestArchiveDate = await getDateLatestInArchive();
        if (!latestArchiveDate) {
          setHasLatestInArchive(false)
        } else {
          setHasLatestInArchive(Boolean(dateNumberFormat === latestArchiveDate))
        }
      })()
    }
  }, [hasInternet, dateNumberFormat, hasLatestInArchive, archiveLength])

  return {hasLatestInArchive, dateLatestPub} 
}

