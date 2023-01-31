import {useEffect, useState} from 'react'
import {applyMarkdown} from '../../transform/applyMarkdown.js'
import {fetchBackFromLocalLatest} from '../../fetch/fetchBackFromLocalLatest.js'
import {replaceBlankNextUrl} from '../../fetch/replaceBlankNextUrl.js'
import {logger} from '../../devLog/logger.js' 
logger.level = "debug"

export function useUpdateNewsletters(dateLatestPub, hasLatestInArchive, hasInternet, text) {

  const [checkedUrls, setCheckedUrls] = useState(false) 

  // useEffect(() => {
  //   (async () => {
  //   await replaceBlankNextUrl(dateLatestPub, setCheckedUrls)
  // })();
  // }, [dateLatestPub, hasInternet, checkedUrls])

  // useEffect(() => {
  //   if (hasLatestInArchive && hasInternet && text && text.length) {
  //     (async () => {
  //       if (dateLatestPub) {
  //         await fetchBackFromLocalLatest(dateLatestPub)
  //       }
  //     })();
  //     }
  //   }, [hasLatestInArchive, hasInternet, dateLatestPub, text])
}









