#!/usr/bin/env node
import chalk from 'chalk';
import url from 'url'
import got from 'got'
import cheerio from 'cheerio'
import {convertAndStore} from '../transform/convert.js';
import {getDateFromNewsletter, fetchPermaLinkCurrent, throttledGot} from '../utilities.js'
import {loadNewsletterFromDb, replaceBlankNextUrl} from '../db/db.js'

let reqCount
export async function fetchBackFromLocalLatest(dateLatestPub) {

  let targetUrl = await fetchPermaLinkCurrent()
  let count = -1
  while (targetUrl) {
    
    let storedNewsletters = await loadNewsletterFromDb("all")
    count++
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
      let fetchedNewsletter 
      try {
        fetchedNewsletter = await throttledGot(url)
      } catch (error) {
        console.trace()
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

