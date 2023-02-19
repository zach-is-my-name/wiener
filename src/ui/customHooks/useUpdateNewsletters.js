import {useEffect, useState} from 'react'
import {applyMarkdown} from '../../transform/applyMarkdown.js'
import {fetchBackFromLocalLatest} from '../../fetch/fetchBackFromLocalLatest.js'
import {replaceBlankNextUrl, checkContinuity} from '../../db/db.js'

export function useUpdateNewsletters(dateLatestPub, hasLatestInArchive, hasInternet, text, ctrDispatch) {

  const [replaceCycleInitd, setReplaceCycleInitd] = useState(false)
  useEffect(() => {

    (async () => {
      if (hasLatestInArchive === true && hasInternet && text?.length && !replaceCycleInitd) {
        let hasContinuity = await checkContinuity()
        if (hasContinuity && typeof dateLatestPub === 'string') {
          await replaceBlankNextUrl(dateLatestPub, setReplaceCycleInitd)
        } else if (!hasContinuity) {
          setReplaceCycleInitd(true)
        }
      }
    })();

  }, [replaceCycleInitd, dateLatestPub, hasLatestInArchive, hasInternet, text])

  useEffect(() => {
    if (hasLatestInArchive === true && hasInternet && text?.length, replaceCycleInitd) {
      (async () => {
          await fetchBackFromLocalLatest(dateLatestPub)
      })();
    }
  }, [replaceCycleInitd])

}
