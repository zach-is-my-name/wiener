import fs from 'fs'
import React, {useEffect, useState} from 'react'
import got from 'got'
import cheerio from 'cheerio' 
import {loadNewsletterFromDb} from '../../db/db.js' 
import {convertAndStore} from '../../transform/convert.js'
import {logger} from '../../devLog/logger.js'
logger.level = "debug"
import {fetchPermaLinkCurrent} from '../../utilities.js'

export function useGetWien(loadState, ctrDispatch, hasLatestInArchive, hasInternet, dateFromSearch, setDateFromSearch, dateLatestPub) {
  const [newsletterObj, setNewsletterObj] = useState(null)
  const [adjacentDates, setAdjacentDates] = useState(null)

  useEffect(() => {
    if (loadState === "fetchLatest"){
      (async () => {
        let data 
        try {
          let url = await fetchPermaLinkCurrent()
          data = await got(url).text();
        } catch (error) {
          console.trace()
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
        logger.debug("fetchLatest: added newsletter; date: ", nlo.date)
        setNewsletterObj(nlo)
        ctrDispatch({type: "loadedFromFetchLatest"})
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
          ctrDispatch({type: "loadedFromGetArchiveMostRecent"})
        }
      })();

    } else if (loadState === "loadNextHook" && adjacentDates?.nextUrl.length) {
      (async () => {
        const nlo = await loadNewsletterFromDb("url", adjacentDates.nextUrl)

        if (!nlo.prevUrl.length) {
          ctrDispatch({type: "setPopUpMessage", payload: "Missing some newsletter data (prevUrl date)..."})
          return
        }
        setAdjacentDates({prevUrl: nlo.prevUrl, nextUrl: nlo.nextUrl})
        setNewsletterObj(nlo)
        ctrDispatch({type: "loadedFromNextButton"})
      })();

    } else if (loadState === "loadNextHook" && newsletterObj.date === dateLatestPub) {
      ctrDispatch({type: "setPopUpMessage", payload: "Already at most recent published"})
      return 

    } else if (loadState === "loadPrevHook" && adjacentDates?.prevUrl.length) {
      (async () => {
        const nlo = await loadNewsletterFromDb("url", adjacentDates.prevUrl)
        if (nlo.nextUrl.length === 0) {
          ctrDispatch({type: "setPopUpMessage", payload: "Missing some newsletter data (nextUrl date)"})
          return 
        } else {
          setAdjacentDates({prevUrl: nlo.prevUrl, nextUrl: nlo.nextUrl})
          setNewsletterObj(nlo)
          ctrDispatch({type: "loadedFromBackButton"})
        }
      })();

    } else if (loadState === 'loadFromSearch' && dateFromSearch?.length) {
      (async () => {
        const nlo = await loadNewsletterFromDb("date", dateFromSearch)
        if (!nlo.date.length) throw new Error()
        setAdjacentDates({prevUrl: nlo.prevUrl, nextUrl: nlo.nextUrl})
        setNewsletterObj(nlo)
        setDateFromSearch("")
        ctrDispatch({type: "loadedFromSearch"})
      })();
    } else if (loadState === "gotoLatestInArchive") {
      (async () => {
        const nlo = await loadNewsletterFromDb("first")
        setAdjacentDates({prevUrl: nlo.prevUrl, nextUrl: nlo.nextUrl})
        setNewsletterObj(nlo)
        ctrDispatch({type: "loadedFromGotoLatest"})
      })();
    }
  }, [loadState, dateFromSearch])

  return newsletterObj
}


