import {parse, stringify, toJSON, fromJSON} from 'flatted';
import {_logger, logger2, logger3} from '../../devLog/logger.js' 
import React, {useEffect, useState} from 'react'
import axios from 'axios';
import cheerio from 'cheerio' 
import {loadNewsletterFromDb} from '../../db/db.js' 
import {convertAndStore} from '../../transform/convert.js'

export function useGetWien(loadState, ctrDispatch, hasLatestInArchive, hasInternet, dateLatestPub, dateFromSearch, setHasLatest, setDateFromSearch ) {
  const [newsletterObj, setNewsletterObj] = useState(null)
  const [adjacentDates, setAdjacentDates] = useState(null)

  useEffect(() => {
    if (loadState === "fetchLatest" && dateLatestPub ){
      (async () => {

        const http = rateLimit(axios.create(), { maxRequests: 1, perMilliseconds: 2500 })

        const {data} = await http.get(`https://weekinethereumnews.com/week-in-ethereum-news-${dateLatestPub}`);

        const $ = cheerio.load(data)
        const url = $('link[rel="canonical"]').attr('href')
        let prevUrl = $('.nav-previous').children('a').attr('href');
        let nextUrl = $('.nav-next').children('a').attr('href');
        !nextUrl ? nextUrl = "" : nextUrl = nextUrl
        setAdjacentDates({prevUrl, nextUrl})

        const nlo  = await convertAndStore(data, url, prevUrl, nextUrl)
        setNewsletterObj(nlo)
        if (hasLatestInArchive === true && hasInternet === true) {
          setHasLatest(true) 
        }
        ctrDispatch({type: "loaded"})
      })();
     
    } else if (loadState === "getArchiveMostRecent") {
      (async () => {
        const nlo = await loadNewsletterFromDb("first")
        setNewsletterObj(nlo)
        if (hasLatestInArchive === true && hasInternet === true) {
          setHasLatest(true) 
        }
        ctrDispatch({type: "loaded"})
      })();
     
    } else if (loadState === "loadNextHook" && adjacentDates.nextUrl) {
      (async () => {
        const nlo = await loadNewsletterFromDb("url", adjacentDates.nextUrl)
        setNewsletterObj(nlo)
        ctrDispatch({type: "loaded"})
      })();

    } else if (loadState === "loadPrevHook" && adjacentDates.prevUrl) {
      (async () => {
        const nlo = await loadNewsletterFromDb("url", adjacentDates.prevUrl)
        setNewsletterObj(nlo)
        ctrDispatch({type: "loaded"})
      })();

    } else if (dateFromSearch.length) {
      (async () => {
        const nlo = await loadNewsletterFromDb("date", dateFromSearch)
        setAdjacentDates({prevUrl: nlo.prevUrl, nextUrl: nlo.nextUrl})
        setNewsletterObj(nlo)
        setDateFromSearch("")
        ctrDispatch({type: "loaded"})
      })();
    }
  }, [loadState, dateLatestPub, dateFromSearch])

  return newsletterObj
}
