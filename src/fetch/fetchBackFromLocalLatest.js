#!/usr/bin/env node
// import {_logger} from '../devLog/logger.js'
import {resolve} from 'import-meta-resolve'
import chalk from 'chalk';
import url from 'url'
import axios from 'axios';
import axiosRetry from 'axios-retry';
import rateLimit from 'axios-rate-limit';
import cheerio from 'cheerio'
import {convertAndStore} from '../transform/convert.js';
import {getNewsletterFromDate, getDateFromNewsletter} from '../utilities.js'
import {loadNewsletterFromDb, addNextUrl} from '../db/db.js'
const http = rateLimit(axios.create(), { maxRequests: 1, perMilliseconds: 5000 })

axiosRetry(http, { retryDelay: () => {return 50000}}) 
let count = 0
let reqCount = 0

export async function fetchBackFromLocalLatest(dispatch, dateLatestPub) {
  // _logger.info("fetchBackCalled")
  let count = 0
  const __dirname = dirname(fileURLToPath(await resolve("../db/db.json", import.meta.url)));
  const file = join(__dirname, 'db.json')
  const adapter = new JSONFile(file)
  const db = new Low(adapter)
  await db.read()

  db.data ||= { newsletters: [ ] }

  const { newsletters } = db.data

  let storedNewsletters  
  storedNewsletters = newsletters.sort((a, b) => new Date(b.date) - new Date(a.date))
  let targetUrl = `https://weekinethereumnews.com/week-in-ethereum-news-${dateLatestPub}`
  //  storedNewsletters = await replaceBlankNextUrl(storedNewsletters)
  //let storedNewsletters 
  let count = 0 
  while (targetUrl) {

    let storedNewsletters = await loadNewsletterFromDb("all")
    const newsletterObj = storedNewsletters.find(obj => obj.url === targetUrl)  
    if (newsletterObj) {
      logger2.info(`pass ${count} ${newsletterObj.date} in archive`)
      targetUrl = newsletterObj.prevUrl
    } else {
      logger2.info(`pass ${count} ${targetUrl}  NOT in archive, fetching...`)

      const writtenNewsletterObj = await fetchAndAdd(targetUrl) 
      // logger2.info(`UPDATE added ${writtenNewsletterObj.date} on count ${count}`)
      targetUrl = writtenNewsletterObj.prevUrl 
    }
    count++
  }



  async function fetchAndAdd(url) {
    if (url) {
      let fetchResult =  await http.get(url).catch(e => new Error(e)); 
      reqCount++
      const {data: fetchedNewsletter} = fetchResult
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

  async function replaceBlankNextUrl(newsletters) {
    for (let i = 0; i < newsletters.length; i++) {
      if (!newsletters[i].nextUrl && newsletters[i].date !== dateLatestPub) {
        return await addNextUrl(i, newsletters)   
      } 
    }
  }
  // logger2.info("return fetchBackFromLatest")
  return 
}
