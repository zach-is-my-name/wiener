import {_logger} from '../../devLog/logger.js' 
import {useEffect} from 'react'
import {applyMarkdown} from '../../transform/applyMarkdown.js'
import {fetchBackFromLocalLatest} from '../../fetch/fetchBackFromLocalLatest.js'

export function useUpdateNewsletters(dateLatestPub, hasLatest) {
  useEffect(() => {
    if (hasLatest /*hasInternet && dateLatestPub && text && text.length*/) {
    (async () => {
      await fetchBackFromLocalLatest(dateWithMonthName)
    })();
    }
  }, [hasLatest])
}









