import {resolve} from 'import-meta-resolve'
import chalk from 'chalk';
// import url from 'url'
import got from 'got'
import cheerio from 'cheerio'
import {convertAndStore} from '../transform/convert.js';
import {fetchPermaLinkCurrent, getDateFromNewsletter} from '../utilities.js'
import {loadNewsletterFromDb, addNextUrl} from '../db/db.js'
import {logger} from '../devLog/logger.js' 
logger.level = "debug"
import fs from "fs"
let count = 0
let reqCount = 0

export async function fetchBackFromLocalLatest(dateLatestPub) {
  let storedNewsletters = await loadNewsletterFromDb("all")

  await replaceBlankNextUrl(storedNewsletters, dateLatestPub)
  let targetUrl = await fetchPermaLinkCurrent()

  let count = 0 

  while (targetUrl) {
    const newsletterObj = storedNewsletters.find(obj => obj.url === targetUrl)  
    if (newsletterObj) {
      logger.debug(`newsletter exists: ${newsletterObj.date} `)
      targetUrl = newsletterObj.prevUrl
    } else {
      logger.debug(`targetUrl not found: fetching: ${targetUrl}`)
        debugger;
      /*
      const writtenNewsletterObj = await fetchAndAdd(targetUrl) 
      */
      /* begin -------------- */
        const url = targetUrl
      let fetchedNewsletter
      try {
        fetchedNewsletter = await got(url).text()
      } catch (error) {
        logger.debug("error", error)
      }
      // fs.writeFileSync("/home/zmg/tmp/got.txt", fetchedNewsletter)
        
        reqCount++
        
        const $ = cheerio.load(fetchedNewsletter)
        const $url = $('link[rel="canonical"]').attr('href')
        let prevUrl = $('.nav-previous').children('a').attr('href');
        let nextUrl = $('.nav-next').children('a').attr('href');
        !nextUrl ? nextUrl = "" : nextUrl = nextUrl
        url === "https://weekinethereumnews.com/january-4-2019/" ? prevUrl = "https://weekinethereumnews.com/december-28-2018/" : prevUrl = prevUrl
        logger.debug({length: fetchedNewsletter.length, type: typeof fetchedNewsletter, prevUrl, nextUrl})
        debugger
        const storedNewsletterObj = await convertAndStore(fetchedNewsletter, url, prevUrl, nextUrl) 
        logger.debug(`written newsletter; next to check: ${storedNewsletterObj.prevUrl}`)
        logger.debug("storedNewsletterObj", storedNewsletterObj) 




        /* end -------------- */
        logger.debug("storedNewsletterObj ", storedNewsletterObj )  
        targetUrl = storedNewsletterObj .prevUrl 
        logger.debug(`end loop iteration. new targetUrl ${targetUrl}`)
      count++
      if (!targetUrl) {
        logger.debug("no target url", targetUrl)
        break
      }
    }
  }
}
async function replaceBlankNextUrl(newsletters, dateLatestPub) {
    if (newsletters.length > 1) {
      for (let i = 0; i < newsletters.length; i++) {
        if (!newsletters[i].nextUrl && newsletters[i].date !== dateLatestPub) {
           await addNextUrl(i, newsletters)   
        } 
      }
    }
  }
  // async function fetchAndAdd(url) {
  //   if (url) {
  //     let fetchedNewsletter =  await got(url).text().catch(e => new Error(e))
  //     reqCount++
  //     if (typeof fetchedNewsletter !== 'string') return new Error(`error on fetched newsletter, value: ${fetchedNewsletter}`)
  //     const $ = cheerio.load(fetchedNewsletter)
  //     const $url = $('link[rel="canonical"]').attr('href')
  //     let prevUrl = $('.nav-previous').children('a').attr('href');
  //     let nextUrl = $('.nav-next').children('a').attr('href');
  //     !nextUrl ? nextUrl = "" : nextUrl = nextUrl
  //     url === "https://weekinethereumnews.com/january-4-2019/" ? prevUrl = "https://weekinethereumnews.com/december-28-2018/" : prevUrl = prevUrl

  //     const storedNewsletterObj = await convertAndStore(fetchedNewsletter, url, prevUrl, nextUrl) 
  //     // logger.debug(`written newsletter; next to check: ${storedNewsletterObj.prevUrl}`)
  //     logger.debug("storedNewsletterObj", storedNewsletterObj) 
  //     return storedNewsletterObj 
  //   }
  //   logger.debug("early return fetchAndAdd")
  //   return  
  // }

