import {_logger} from '../../devLog/logger.js' 
import React, {useEffect, useState} from 'react'
import axios from 'axios';
import cheerio from 'cheerio' 
import rateLimit from 'axios-rate-limit';
import {loadNewsletterFromDb} from '../../db/db.js' 
import {applyMarkdown} from '../../transform/applyMarkdown.js'
import {convertAndStore} from '../../transform/convert.js'
import {fetchDateFromCurrentNewsletter} from '../../utilities.js'

export function useGetWien(runHookString, dispatch, debugCount) {
  const [newsletterObj, setNewsletterObj] = useState(null)
  
  useEffect(() => {
    if (runHookString === "fetchLatest"){
      (async () => {
        const http = rateLimit(axios.create(), { maxRequests: 1, perMilliseconds: 2500 })
        const dateResult = await fetchDateFromCurrentNewsletter(true)
        const {data} = await http.get(`http://weekinethereumnews.com/week-in-ethereum-news-${dateResult}`);
        const $ = cheerio.load(data)
        const url = $('link[rel="canonical"]').attr('href')
        const prevUrl = $('.nav-previous').children('a').attr('href');
        const addedNewsletterObj = await convertAndStore(data, url, prevUrl)
        //_logger.info({addedNewsletterObj})
        setNewsletterObj(addedNewsletterObj)
      })()

    } else if (runHookString === "loadArchiveMostRecent") {
      (async () => {
        setNewsletterObj(await loadNewsletterFromDb(""))
      })()
    } else {
      _logger.info("loading") 
    }
      return () => { if (runHookString.length) dispatch({type:"getHook", payload: "" })}
    
  }, [runHookString])
  if (newsletterObj && Object.keys(newsletterObj).length) {
        return newsletterObj
  } else {
    return null 
      }
}

