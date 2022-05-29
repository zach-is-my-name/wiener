import React, {useEffect, useState} from 'react'
import {loadNewsletterFromDb} from '../../db/db.js' 
import {fetchDateFromCurrentNewsletter} from '../../utilities.js'
import  pkg from 'use-state-with-callback';
const  {useStateWithCallbackLazy}  = pkg 

export function useHasLatestInArchive(dateString) {
  const [latestPublishedDate, setLatestPublishedDate] =useStateWithCallbackLazy(null)
  const [hasLatestInArchive, setHasLatestInArchive] = useState(false) 

  useEffect(()=> {
    (async () => {
      setLatestPublishedDate(await fetchDateFromCurrentNewsletter(), 
        (async () => {
          setHasLatestInArchive(Boolean(await loadNewsletterFromDb(dateString)))
        })()
      )
    })()

  }, [])

  return hasLatestInArchive
}




