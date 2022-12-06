import {useEffect} from 'react'
import {applyMarkdown} from '../../transform/applyMarkdown.js'
import {fetchBackFromLocalLatest} from '../../fetch/fetchBackFromLocalLatest.js'

export function useUpdateNewsletters(dateLatestPub, hasLatest, hasInternet) {
  useEffect(() => {

    if (hasLatest && hasInternet /* && dateLatestPub && text && text.length*/) {
    (async () => {
      if (dateLatestPub) {
        await fetchBackFromLocalLatest(dateLatestPub)
      }
    })();
    }
  }, [hasLatest, hasInternet, dateLatestPub])
}









