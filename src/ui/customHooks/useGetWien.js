import { performance } from 'perf_hooks';
import {_logger, logger2, logger3} from '../../devLog/logger.js' 
import React, {useEffect, useState} from 'react'
import axios from 'axios';
import cheerio from 'cheerio' 
import rateLimit from 'axios-rate-limit';
import {loadNewsletterFromDb} from '../../db/db.js' 
import {applyMarkdown} from '../../transform/applyMarkdown.js'
import {convertAndStore} from '../../transform/convert.js'

export function useGetWien(runHookString, dispatch, dateWithMonth) {
  const [newsletterObj, setNewsletterObj] = useState(null)
    let startFetchLatest 
    let endFetchLatest
  
    let startLoad
    let endLoad


  useEffect(() => {
    
    if (runHookString === "fetchLatest" && dateWithMonth){
      startFetchLatest = performance.now();
      (async () => {
    //    _logger.info("fetchLatest_1") 
        const http = rateLimit(axios.create(), { maxRequests: 1, perMilliseconds: 2500 })
        const dateFetchStart = performance.now()
        const dateResult = dateWithMonth 
        const dateFetchEnd = performance.now()
        // logger2.info({dateFetchTime:dateFetchEnd - dateFetchStart })

        const {data} = await http.get(`http://weekinethereumnews.com/week-in-ethereum-news-${dateResult}`);
        const $ = cheerio.load(data)
        const url = $('link[rel="canonical"]').attr('href')
        const prevUrl = $('.nav-previous').children('a').attr('href');
        const addedNewsletterObj = await convertAndStore(data, url, prevUrl)
        // _logger.info(JSON.stringify(addedNewsletterObj))
        setNewsletterObj(addedNewsletterObj)
      })()

    } else if (runHookString === "loadArchiveMostRecent") {
      // _logger.info("loadArchive_2") 
      (async () => {
        startLoad = performance.now();
        setNewsletterObj(await loadNewsletterFromDb(""))
        endLoad = performance.now()
        // logger2.info({profileLoadArchiveMostRecent: endLoad - startLoad})
      })()
    } else {
      // _logger.info("loading_3, no hookString") 
    }
      return () => { if (runHookString.length) {
          // _logger.info("reset hookString") 
          dispatch({type:"getHook", payload: "" })}
      } 
  }, [runHookString, dateWithMonth])

  if (newsletterObj && Object.keys(newsletterObj).length) {
        endFetchLatest = performance.now()
        //logger2.info({profileFetchLatest: endFetchLatest - startFetchLatest}) 
        return newsletterObj
  } else {
    // _logger.info("returned null from useGetWien.  newsletterObj === false")
    return null
      }
}

