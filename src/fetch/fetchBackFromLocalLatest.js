#!/usr/bin/env node
import {resolve} from 'import-meta-resolve'
import chalk from 'chalk';
import url from 'url'
import got from 'got'
import cheerio from 'cheerio'
import {convertAndStore} from '../transform/convert.js';
import {getDateFromNewsletter, fetchPermaLinkCurrent, throttledGot} from '../utilities.js'
import {loadNewsletterFromDb} from '../db/db.js'

import {replaceBlankNextUrl} from './replaceBlankNextUrl.js'

import {logger} from '../devLog/logger.js' 
logger.level = "debug"

let reqCount
export async function fetchBackFromLocalLatest(dateLatestPub) {

  let targetUrl = await fetchPermaLinkCurrent()
  let count = -1
  // logger.debug({targetUrl})
  while (targetUrl) {
    
    let storedNewsletters = await loadNewsletterFromDb("all")
    count++
    const newsletterObj = storedNewsletters.find(obj => obj.url === targetUrl)  
    if (newsletterObj) {
      // logger.debug("next target: after find", newsletterObj.prevUrl)
      targetUrl = newsletterObj.prevUrl
    } else {
      // logger.debug("about to fetchAndAdd: ", targetUrl)
      const writtenNewsletterObj = await fetchAndAdd(targetUrl) 
      // logger.debug("write:", writtenNewsletterObj.date) 
      // logger.debug("next target: after write", writtenNewsletterObj.prevUrl) 
      targetUrl = writtenNewsletterObj.prevUrl 
    }
    count++
  }
  
  // replaceBlankNextUrl(dateLatestPub)
  
  async function fetchAndAdd(url) {
    if (url) {
      let fetchedNewsletter 
      try {
        fetchedNewsletter = await throttledGot(url)
      } catch (error) {
        console.trace()
        logger.debug("error", error) 
      }

      reqCount++
      if (typeof fetchedNewsletter !== 'string') return new Error(`error on fetched newsletter, value: ${fetchedNewsletter}`)
      const $ = cheerio.load(fetchedNewsletter)
      const $url = $('link[rel="canonical"]').attr('href')
      if ($url !== url) {return new Error("url wrong! debug!")}
      let prevUrl = $('.nav-previous').children('a').attr('href');
      let nextUrl = $('.nav-next').children('a').attr('href');
      !nextUrl ? nextUrl = "" : nextUrl = nextUrl
      url === "https://weekinethereumnews.com/january-4-2019/" ? prevUrl = "https://weekinethereumnews.com/december-28-2018/" : prevUrl = prevUrl

      const storedNewsletterObj = await convertAndStore(fetchedNewsletter, url, prevUrl, nextUrl) 


      return storedNewsletterObj 
    }

    return  
  }
}

