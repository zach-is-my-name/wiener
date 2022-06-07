#!/usr/bin/env node
import {_logger} from '../devLog/logger.js'
import {resolve} from 'import-meta-resolve'
import chalk from 'chalk';
import url from 'url'
import axios from 'axios';
import axiosRetry from 'axios-retry';
import rateLimit from 'axios-rate-limit';
import cheerio from 'cheerio'
import {convertAndStore} from '../transform/convert.js';
import {getUrlOfNewsletter, getNewsletterFromDate, getDateFromNewsletter} from '../utilities.js'
import { join, dirname } from 'path'
import { Low, JSONFile } from 'lowdb'
import { fileURLToPath } from 'url'

fetchBackFromLocalLatest()
export async function fetchBackFromLocalLatest(dispatch) {

//export async function fetchBackFromLocalLatest(dispatch) {
  let count = 0
  const http = rateLimit(axios.create(), { maxRequests: 1, perMilliseconds: 5000 })
  axiosRetry(http, { retryDelay: () => {return 50000}}) 

  const __dirname = dirname(fileURLToPath(await resolve("../db/db.json", import.meta.url)));
  const file = join(__dirname, 'db.json')
  const adapter = new JSONFile(file)
  const db = new Low(adapter)
  await db.read()

  db.data ||= { newsletters: [ ] }

  const { newsletters } = db.data

  let storedNewsletters  
  storedNewsletters = newsletters.sort((a, b) => new Date(b.date) - new Date(a.date))

  for (let i = 0; i < storedNewsletters.length; i++ ) {
    if (count > 100) { 
      setTimeout(() => {console.log("waiting a bit to fetch more... (the rate limit)")}, 50000)
    } 

    await db.read()
    storedNewsletters = db.data.newsletters.sort((a, b) => new Date(b.date) - new Date(a.date))
    count++
    const debugSlice = storedNewsletters.slice(0, 5) 
    // for (const obj of debugSlice) _logger.info({date: obj.date, prevUrl: obj.prevUrl})
    const newsLetterObj = storedNewsletters[storedNewsletters.length - 1]
    _logger.info({newsLetterObj})
    const prevUrlFromArchive = newsLetterObj.prevUrl 

    if (!prevUrlFromArchive) {
      // dispatch({type: "updateHook", payload: false}) 
      // _logger.info("fetchBack 50, dispatch",{date: newsLetterObj.date, prev: newsLettersObj.prevUrl} )
      return  
    }
    let fetchResult 
    fetchResult = await http.get(prevUrlFromArchive); 

    const {data: fetchedNewsletter} = fetchResult
    const $ = cheerio.load(fetchedNewsletter)
    const date =  await getDateFromNewsletter($.html())
    const prevUrl = $('.nav-previous').children('a').attr('href');
    const beforePutNewsletterArrayLength = storedNewsletters.length
    await convertAndStore(fetchedNewsletter, prevUrl) 
    await db.read()
    const afterPutNewsletterArrayLength = storedNewsletters.length
    if (beforePutNewsletterArrayLength >= afterPutNewsletterArrayLength) {
      return
    }

  }
}
