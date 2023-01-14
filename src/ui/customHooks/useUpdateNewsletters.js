import {useEffect} from 'react'
import {applyMarkdown} from '../../transform/applyMarkdown.js'
import {fetchBackFromLocalLatest} from '../../fetch/fetchBackFromLocalLatest.js'

export function useUpdateNewsletters(dateLatestPub, hasLatestInArchive, hasInternet) {
  useEffect(() => {
    if (hasLatestInArchive && hasInternet /* && dateLatestPub && text && text.length*/) {
      (async () => {
        if (dateLatestPub) {
          await fetchBackFromLocalLatest(dateLatestPub)
        }
      })();
      }
    }, [hasLatestInArchive, hasInternet, dateLatestPub])
}









