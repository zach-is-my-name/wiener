import {useEffect, useState} from 'react'
import {applyMarkdown} from '../../transform/applyMarkdown.js'
import {fetchBackFromLocalLatest} from '../../fetch/fetchBackFromLocalLatest.js'
import {replaceBlankNextUrl, checkContinuity} from '../../fetch/replaceBlankNextUrl.js'
import {logger} from '../../devLog/logger.js' 
logger.level = "debug"

export function useUpdateNewsletters(dateLatestPub, hasLatestInArchive, hasInternet, text, ctrDispatch) {

  const [replaceCycleInitd, setReplaceCycleInitd] = useState(false)

  useEffect(() => {
    // logger.debug({replaceCycleInitd, hasLatestInArchive, hasInternet});

    (async () => {
      if (!replaceCycleInitd) {
        let hasContinuity = await checkContinuity()
        // logger.debug({hasContinuity, typeof_dateLatestPub: typeof dateLatestPub})
        if (hasContinuity && typeof dateLatestPub === 'string') {
          await replaceBlankNextUrl(dateLatestPub, setReplaceCycleInitd)
        } else if (!hasContinuity) {
          setReplaceCycleInitd(true)
        }
      }
    })();

  }, [replaceCycleInitd, dateLatestPub, hasLatestInArchive, hasInternet])

  useEffect(() => {
  // logger.debug({hasLatestInArchive, hasInternet, textHasLength: text?.length, replaceCycleInitd})
  if (hasLatestInArchive === true  && hasInternet && text?.length, replaceCycleInitd) {
      (async () => {
        if (dateLatestPub) {
          await fetchBackFromLocalLatest(dateLatestPub)
        }
      })();
      }
    }, [hasLatestInArchive, hasInternet, dateLatestPub, text, replaceCycleInitd])

}
