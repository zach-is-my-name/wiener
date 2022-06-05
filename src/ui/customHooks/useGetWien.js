import {_logger} from '../../devLog/logger.js' 
import React, {useEffect, useState} from 'react'
import axios from 'axios';
import rateLimit from 'axios-rate-limit';
import {loadNewsletterFromDb} from '../../db/db.js' 
import {applyMarkdown} from '../../transform/applyMarkdown.js'
import {convertAndStore} from '../../transform/convert.js'
import {fetchDateFromHtml} from '../../utilities.js'

export function useGetWien(runHookString, dispatch, debugCount) {
  const [newsletterObj, setNewsletterObj] = useState(null)
  
  useEffect(() => {
    dispatch({type: "debugAdd"})
    if (runHookString === "fetchLatest"){
      (async () => {
        const http = rateLimit(axios.create(), { maxRequests: 1, perMilliseconds: 2500 })

        const {data} = await http.get('http://weekinethereumnews.com');
        const date = convertAndStore(data)
        setNewsletterObj(await loadNewsletterFromDb(date))
      })()

    } else if (runHookString === "loadArchiveMostRecent") {
      (async () => {
        setNewsletterObj(await loadNewsletterFromDb(""))
      })()
    } else {
       _logger.info("loading", {pass: debugCount}) 
    }
      return () => { if (runHookString.length) dispatch({type:"getHook", payload: "" })}
    
  }, [runHookString])
  if (newsletterObj && Object.keys(newsletterObj).length) {
        return newsletterObj
  } else {
    return null 
      }
}

