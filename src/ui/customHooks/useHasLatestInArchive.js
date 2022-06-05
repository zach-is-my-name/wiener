import React, {useEffect, useState} from 'react'
import {loadNewsletterFromDb} from '../../db/db.js' 
import {fetchDateFromCurrentNewsletter} from '../../utilities.js'
//import  pkg from 'use-state-with-callback';
//const  {useStateWithCallbackLazy}  = pkg 

export function useHasLatestInArchive() {
  // const [latestPublishedDate, setLatestPublishedDate] = useStateWithCallbackLazy(null)
  const [hasLatestInArchive, setHasLatestInArchive] = useState("loading") 

  useEffect(()=> {
    (async () => {
      const latestPublished = await fetchDateFromCurrentNewsletter()
      const load = await loadNewsletterFromDb(latestPublished) 
      //const hasLatestPublished = Boolean(load) 
      //console.log("inside", {load, latestPublished})
      setHasLatestInArchive(Boolean(await loadNewsletterFromDb(latestPublished)))
    }) ()
  } )

  return hasLatestInArchive
}




