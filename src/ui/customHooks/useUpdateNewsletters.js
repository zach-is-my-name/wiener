import {_logger, logger2} from '../../devLog/logger.js' 
import {useEffect} from 'react'
import {applyMarkdown} from '../../transform/applyMarkdown.js'
import {fetchBackFromLocalLatest} from '../../fetch/fetchBackFromLocalLatest.js'

export function useUpdateNewsletters(dateLatestPub, hasLatest, hasInternet) {
  useEffect(() => {
    logger2.info(`dateLatestPub: ${dateLatestPub}`)
    logger2.info(`update dep hasLatest: ${hasLatest}`)

    if (hasLatest && hasInternet /* && dateLatestPub && text && text.length*/) {
    (async () => {
      if (dateLatestPub) {
        await fetchBackFromLocalLatest(dateLatestPub)
      }
    })();
    }
  }, [hasLatest, hasInternet, dateLatestPub])
}









