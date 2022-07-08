import {parse, stringify, toJSON, fromJSON} from 'flatted';
import {logger, _logger, logger2, logger3} from '../../devLog/logger.js' 
logger.level = "debug"
import React, {useEffect, useState} from 'react'
import axios from 'axios';
import cheerio from 'cheerio' 
import {loadNewsletterFromDb} from '../../db/db.js' 
import {applyMarkdown} from '../../transform/applyMarkdown.js'
import {convertAndStore} from '../../transform/convert.js'

export function useGetWien(loadState, ctrDispatch, hasLatestInArchive, hasInternet, dateLatestPub, dateFromSearch, setHasLatest) {
  const [newsletterObj, setNewsletterObj] = useState(null)
  const [restorWienDate, setRestoreWienDate] = useState(null) 
  const [adjacentDates, setAdjacentDates] = useState(null)

  useEffect(() => {
    if (loadState === "fetchLatest" && dateLatestPub) {
      (async () => {
        const {data} = await axios.get(`https://weekinethereumnews.com/week-in-ethereum-news-${dateLatestPub}`).catch(e => new Error(e));
        const $ = cheerio.load(data)
        const url = $('link[rel="canonical"]').attr('href')
        let prevUrl = $('.nav-previous').children('a').attr('href');
        let nextUrl = $('.nav-next').children('a').attr('href');
        !nextUrl ? nextUrl = "" : nextUrl = nextUrl
        setAdjacentDates({prevUrl, nextUrl})

        const nlo  = await convertAndStore(data, url, prevUrl, nextUrl)
        logger2.info(`FETCH_LATEST added ${nlo.date}`)
        setNewsletterObj(nlo)
        setRestoreWienDate(nlo.date)
        if (hasLatestInArchive && hasInternet) {
          setHasLatest(true) 
        }
        ctrDispatch({type: "loaded"})
      })();

    } else if (loadState === "getArchiveMostRecent") {
      (async () => {
        const nlo = await loadNewsletterFromDb("first")
        setAdjacentDates({prevUrl: nlo.prevUrl, nextUrl: nlo.nextUrl})
        setNewsletterObj(nlo)
        setRestoreWienDate(nlo.date)
        if (hasLatestInArchive && hasInternet) {
          setHasLatest(true) 
        }
        ctrDispatch({type: "loaded"})
      })();

    } else if (loadState === "loadNextHook" && adjacentDates.nextUrl.length) {
      logger.debug(`adjacentDates.nextUrl, ${adjacentDates.nextUrl}`);
      (async () => {
        const nlo = await loadNewsletterFromDb("url", adjacentDates.nextUrl)
        setAdjacentDates({prevUrl: nlo.prevUrl, nextUrl: nlo.nextUrl})
        setNewsletterObj(nlo)
        setRestoreWienDate(nlo.date)
        ctrDispatch({type: "loaded"})
      })();

    } else if (loadState === "loadPrevHook" && adjacentDates.prevUrl.length) {
      (async () => {
        const nlo = await loadNewsletterFromDb("url", adjacentDates.prevUrl)
        setAdjacentDates({prevUrl: nlo.prevUrl, nextUrl: nlo.nextUrl})
        setNewsletterObj(nlo)
        setRestoreWienDate(nlo.date)
        ctrDispatch({type: "loaded"})
      })();

    } else if (dateFromSearch.length) {
      (async () => {
        const nlo = await loadNewsletterFromDb("date", dateFromSearch)
        setAdjacentDates({prevUrl: nlo.prevUrl, nextUrl: nlo.nextUrl})
        setNewsletterObj(nlo)
        setRestoreWienDate(nlo.date)
        ctrDispatch({type: "loaded"})
      })();

    } else if (loadState === 'restoreWien') {
      (async () => {
        const nlo = await loadNewsletterFromDb("date", restoreWienDate)
        setAdjacentDates({prevUrl: nlo.prevUrl, nextUrl: nlo.nextUrl})
        setNewsletterObj(nlo)
        setRestoreWienDate(nlo.date)
        ctrDispatch({type: "loaded"})      })();
    }
  }, [loadState, dateWithMonthName, adjacentDates])


  }, [loadState, dateLatestPub])

  return newsletterObj
}

