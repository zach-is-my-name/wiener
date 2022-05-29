#! /usr/bin/env/node
import {execArgv} from 'process'
//import {dateSchedule} from './dateSchedule.js'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat.js'
import duration from 'dayjs/plugin/duration.js'
dayjs.extend(duration)
dayjs.extend(customParseFormat)
import cheerio from 'cheerio'
import axios from 'axios';
import rateLimit from 'axios-rate-limit';
import {applyMarkdown} from '../transform/applyMarkdown.js'
import {convertAndStore} from '../transform/convert.js'

function validateInputDate(date) {
  if (typeof date !== 'string') {
    console.log(typeof date)
    throw new Error(`argument must be a string ${date}`)
  } else if (dayjs(date, 'M-D-YYYY').isValid() === false){ 
    console.log(typeof date)
    throw new Error(`date format invalid ${date}`)
  }
    console.log(typeof date)
}

fetchNewsletterFromDate("5-7-2022")

export async function fetchNewsletterFromDate(date) {
const http = rateLimit(axios.create(), { maxRequests: 1, perMilliseconds: 2500 })

  const dateObj = dayjs(date)
  validateInputDate(date)
  let day = dateObj.format("D") 
  let month = dateObj.format("MMMM") 
  let year = dateObj.format("YYYY") 

  const urls = [
    `https://weekinethereumnews.com/week-in-ethereum-news-${month}-${day}-${year}`,

    `https://weekinethereumnews.com/week-in-eth-news-${month}-${day}-${year}`,

    `https://weekinethereumnews.com/${month}-${day}-${year}`,

    `https://weekinethereumnews.com/week-in-ethereum-news-${dateObj.format("MMM")}-${day}-${year}`,

    `https://weekinethereumnews.com/week-in-eth-news-${dateObj.format("MMM")}-${day}-${year}`,
  ]
  /*he always uses the month name (long or short)*/ 

  const fetchedNewsletter =  (await ( async (urls) => {
    let i = 0;
    while (i < urls.length) {
      const url = urls[i];
      try {
        const {data: response} = await http.get(url);
        
        if (response) console.log("Success:", url)
        return await response;
      } catch (error) {
        //if (errorCount > 5) throw new Error(`error count passed threshold, analize`)
        console.log('url' +' Fail')
        continue;
      } finally {
        i++;
      }
    }
  })(urls)) 
  const $ = cheerio.load(fetchedNewsletter)
  const prevUrl = $('.nav-previous').children('a').attr('href');
  console.log({prevUrl})  
  await convertAndStore(fetchedNewsletter, prevUrl) 
}


