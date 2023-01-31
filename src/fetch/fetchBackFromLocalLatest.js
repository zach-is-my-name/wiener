#!/usr/bin/env node
import {resolve} from 'import-meta-resolve'
import chalk from 'chalk';
import url from 'url'
import got from 'got'
import cheerio from 'cheerio'
import {convertAndStore} from '../transform/convert.js';
import {getDateFromNewsletter, fetchPermaLinkCurrent} from '../utilities.js'
import {loadNewsletterFromDb, addNextUrl} from '../db/db.js'

import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'

// File path
const __dirname = dirname(fileURLToPath(import.meta.url));
const file = join(__dirname, 'db.json')




import {logger} from '../devLog/logger.js' 
logger.level = "debug"

let count = 0
let reqCount = 0

export async function fetchBackFromLocalLatest(dispatch, dateLatestPub) {
  // const __dirname = dirname(fileURLToPath(import.meta.url));
  const __dirname = '/home/zmg/Tinker/wiener/src/db/'
  const file = join(__dirname, 'db.json')
  const adapter = new JSONFile(file)
  const db = new Low(adapter)
  await db.read()

  db.data ||= { newsletters: [ ] }

  const { newsletters } = db.data

  let storedNewsletters  
  storedNewsletters = newsletters.sort((a, b) => new Date(b.date) - new Date(a.date))
  let targetUrl = await fetchPermaLinkCurrent()

  await replaceBlankNextUrl(storedNewsletters, dateLatestPub)

  let count = 0 
  while (targetUrl) {

    let storedNewsletters = await loadNewsletterFromDb("all")
    const newsletterObj = storedNewsletters.find(obj => obj.url === targetUrl)  
    if (newsletterObj) {
      targetUrl = newsletterObj.prevUrl
    } else {
      const writtenNewsletterObj = await fetchAndAdd(targetUrl) 
      logger.debug("writtenNewsletterObj", writtenNewsletterObj) 
      targetUrl = writtenNewsletterObj.prevUrl 
    }
    count++
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

  async function fetchAndAdd(url) {
    if (url) {
      let fetchedNewsletter 
      try {
        fetchedNewsletter = setTimeout(async () => await got(url).text(), 5000)
      } catch (error) {
        logger.debug("error", error) 
        return 
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


