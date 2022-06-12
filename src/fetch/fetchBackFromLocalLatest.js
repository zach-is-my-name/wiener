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
import {fetchDateFromCurrentNewsletter} from '../utilities.js'
import {getNewsletterFromDate, getDateFromNewsletter} from '../utilities.js'
import { join, dirname } from 'path'
import { Low, JSONFile } from 'lowdb'
import { fileURLToPath } from 'url'
const http = rateLimit(axios.create(), { maxRequests: 1, perMilliseconds: 5000 })

axiosRetry(http, { retryDelay: () => {return 50000}}) 

export async function fetchBackFromLocalLatest(dispatch) {
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
  let targetUrl = `https://weekinethereumnews.com/week-in-ethereum-news-${await fetchDateFromCurrentNewsletter(true)}`


  while (targetUrl) {
    // if (count > 100) { 
    //   setTimeout(() => {console.log("waiting a bit to fetch more... (the rate limit)")}, 50000)
    // } 
    if (count > 305) { 
      throw new Error("error")
      return 
    }

    await db.read()

    storedNewsletters = db.data.newsletters.sort((a, b) => new Date(b.date) - new Date(a.date))



    const newsLetterObj = storedNewsletters.find(obj => obj.url === targetUrl)  

    if (!newsLetterObj) {
       const writtenNewsletterObj = await fetchAndAdd(targetUrl) 

       targetUrl = writtenNewsletterObj.prevUrl 
       count++
    } else {
      targetUrl = newsLetterObj.prevUrl
      count++
    }
  }
    dispatch({type: "updateHook", payload: false}) 
    return 
}

async function fetchAndAdd(url) {
  if (!url) {
     dispatch({type: "updateHook", payload: false}) 
    return  
  }

let fetchResult
try {
  fetchResult =  await http.get(url); 
} catch (e) { throw new Error(e)} 
  const {data: fetchedNewsletter} = fetchResult
  const $ = cheerio.load(fetchedNewsletter)
  const $url = $('link[rel="canonical"]').attr('href')
  if ($url !== url) {throw new Error("url wrong! debug!")}
  const date =  await getDateFromNewsletter($.html())
  let prevUrl = $('.nav-previous').children('a').attr('href');
  url === "https://weekinethereumnews.com/january-4-2019/" ? prevUrl = "https://weekinethereumnews.com/december-28-2018/" : prevUrl = prevUrl
  
  const storedNewsletterObj = await convertAndStore(fetchedNewsletter, url, prevUrl) 

  
  return storedNewsletterObj 
}


