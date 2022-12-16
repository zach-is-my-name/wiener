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

export async function fetchBackFromLocalLatest(dateLatestPub) {
  let targetUrl = `https://weekinethereumnews.com/week-in-ethereum-news-${dateLatestPub}`
  let storedNewsletters =  await loadNewsletterFromDb("all")
  storedNewsletters = await replaceBlankNextUrl(storedNewsletters)
  
  while (targetUrl) {

    let storedNewsletters = await loadNewsletterFromDb("all")
    const newsletterObj = storedNewsletters.find(obj => obj.url === targetUrl)  
    if (newsletterObj) {
      targetUrl = newsletterObj.prevUrl
    } else {

      const writtenNewsletterObj = await fetchAndAdd(targetUrl) 
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
  return 
}
