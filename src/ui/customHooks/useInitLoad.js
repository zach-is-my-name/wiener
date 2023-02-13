import {useHasInternet, useHasLatestInArchive } from './index.js'
import {useEffect} from 'react'

export function useInitLoad(ctrDispatch, loadState) {
  const hasInternet = useHasInternet()
  const {hasLatestInArchive, dateLatestPub} = useHasLatestInArchive(hasInternet, loadState)

  useEffect(() =>  {
    if (hasInternet === true) {
      if (hasLatestInArchive === true) {
        ctrDispatch({type: "getArchiveMostRecent"})

      } else if (hasLatestInArchive === false) {
        ctrDispatch({type: "fetchLatest"})

      } else if (hasLatestInArchive === "loading") {
        ctrDispatch({type: "loading"}) 
      }

    } else if (hasInternet === false) { //no internet
      ctrDispatch({type: "getArchiveMostRecent"})

    } else if (hasInternet === "loading") {
      ctrDispatch({type: "loading"}) 
    } 

  }, [hasInternet, hasLatestInArchive])
  return [dateLatestPub, hasInternet, hasLatestInArchive]  
}


