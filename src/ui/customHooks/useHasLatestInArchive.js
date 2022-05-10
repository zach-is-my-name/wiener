import React, {useEffect, useState} from 'react'
import {loadNewsletterFromDb} from '../../db.js' 
import {fetchDateFromCurrentNewsletter} from '../../utilities.js'
import {useStateWithCallbackLazy} from 'use-state-with-callback'

export function useHasLatestInArchive(dateString) {
  const [latestPublishedDate, setLatestPublishedDate] = useStateWithCallbackLazy(null)
  const [hasLatestInArchive, setHasLatestInArchive] = useState(false) 
   

  useEffect(()=> {
    (async () => {
     setLatestPublishedDate(await fetchDateFromCurrentNewsletter(), 
    (async () => {
      setHasLatestInArchive(Boolean(await loadNewsletterFromDb(dateString)))
    })()
     
     )
    })()

  })

  return hasLatestInArchive
}




