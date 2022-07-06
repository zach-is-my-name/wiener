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
        const http = rateLimit(axios.create(), { maxRequests: 1, perMilliseconds: 2500 })
        const dateResult = dateWithMonth 

        const {data} = await http.get(`http://weekinethereumnews.com/week-in-ethereum-news-${dateResult}`);
        const $ = cheerio.load(data)
        const url = $('link[rel="canonical"]').attr('href')
        const prevUrl = $('.nav-previous').children('a').attr('href');
        const addedNewsletterObj = await convertAndStore(data, url, prevUrl)
        setNewsletterObj(addedNewsletterObj)
      })()

    } else if (runHookString === "loadArchiveMostRecent") {
      (async () => {
        startLoad = performance.now();
        setNewsletterObj(await loadNewsletterFromDb(""))
        endLoad = performance.now()
      })()
    } else {
    }
      return () => { if (runHookString.length) {
          dispatch({type:"getHook", payload: "" })}
      } 
  }, [runHookString, dateWithMonth])

  if (newsletterObj && Object.keys(newsletterObj).length) {
        return newsletterObj
  } else {
    return null
      }
}

