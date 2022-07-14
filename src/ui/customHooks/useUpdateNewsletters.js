// import {_logger} from '../../devLog/logger.js' 
import {useEffect} from 'react'
import {applyMarkdown} from '../../transform/applyMarkdown.js'
import {fetchBackFromLocalLatest} from '../../fetch/fetchBackFromLocalLatest.js'

export function useUpdateNewsletters(text, hasInternet, dateLatestPub) {
  useEffect(() => {
    if (hasLatest /*hasInternet && dateLatestPub && text && text.length*/) {
    (async () => {
      await fetchBackFromLocalLatest(dateLatestPub)
    })();
    }
  }, [hasLatest])
}









