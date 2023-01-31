import fs from 'fs'
import React, {useEffect, useState} from 'react'
import got from 'got'
import cheerio from 'cheerio' 
import {loadNewsletterFromDb} from '../../db/db.js' 
import {convertAndStore} from '../../transform/convert.js'

export function useGetWien(loadState, ctrDispatch, hasLatestInArchive,setHasLatestInArchive,  hasInternet, dateLatestPub, dateFromSearch, setHasLatest, setDateFromSearch) {
  const [newsletterObj, setNewsletterObj] = useState(null)
  const [adjacentDates, setAdjacentDates] = useState(null)

  useEffect(() => {
    if (loadState === "fetchLatest" && dateLatestPub ){
      (async () => {
        let data 
        try {
          data = await got(`https://weekinethereumnews.com/week-in-ethereum-news-${dateLatestPub}`).text();
        } catch (error) {
          logger.debug("error", error) 
          return 
        }


        const $ = cheerio.load(data)
        const url = $('link[rel="canonical"]').attr('href')
        let prevUrl = $('.nav-previous').children('a').attr('href');
        let nextUrl = $('.nav-next').children('a').attr('href');
        !nextUrl ? nextUrl = "" : nextUrl = nextUrl
        setAdjacentDates({prevUrl, nextUrl})

        const nlo  = await convertAndStore(data, url, prevUrl, nextUrl)
        setNewsletterObj(nlo)
        setHasLatestInArchive(true) 
        ctrDispatch({type: "loaded"})
      })();
     
    } else if (loadState === "getArchiveMostRecent") {
      (async () => {
        const nlo = await loadNewsletterFromDb("first")
        if (nlo === "none") {
          ctrDispatch({type: "none"})
        } else {
        let prevUrl 
        let nextUrl 
        if (nlo?.prevUrl){
          prevUrl = nlo.prevUrl
        } else { 
          prevUrl = null
        }

        if (nlo?.nextUrl){
          nextUrl = nlo.nextUrl
        } else { 
          nextUrl = null
        }
        setAdjacentDates({prevUrl: prevUrl, nextUrl: nextUrl})
        setNewsletterObj(nlo)
        // if (hasLatestInArchive === true && hasInternet === true) {
        //   setHasLatest(true) 
        // }
        ctrDispatch({type: "loaded"})
        }
      })();

    } else if (loadState === "loadNextHook" && adjacentDates.nextUrl.length) {
      (async () => {
        const nlo = await loadNewsletterFromDb("url", adjacentDates.nextUrl)
        setAdjacentDates({prevUrl: nlo.prevUrl, nextUrl: nlo.nextUrl})
        setNewsletterObj(nlo)
        ctrDispatch({type: "loaded"})
      })();

    } else if (loadState === "loadPrevHook" && adjacentDates.prevUrl) {
      (async () => {
        const nlo = await loadNewsletterFromDb("url", adjacentDates.prevUrl)
        setAdjacentDates({prevUrl: nlo.prevUrl, nextUrl: nlo.nextUrl})
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
