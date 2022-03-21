#!/usr/bin/env node
import chalk from 'chalk';
import url from 'url'
import Crawler from 'crawler';
import fs from 'fs';
import {convertAndStore} from './convert1.js';
import {getUrlOfNewsletter, getNewsletterFromDate, getDateFromNewsletter} from './utilities1.js'

import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration.js'
dayjs.extend(duration)


export async function getAll() {
  let storedNewsletters = fs.readdirSync('./archive/markdownNewsletters/freshTest').sort((a, b) => new Date(b) - new Date(a))
  //console.log(storedNewsletters)
  //console.log(storedNewsletters.map((element, index, array) => ({a: element , b: array[index +1] , spread: dayjs.duration(dayjs(element).diff(dayjs(array[index+1]))).asDays()}))) 

  let arrayOfDateGapObjs = dateGaps()
  console.log("Checking for Gaps...")
  if (arrayOfDateGapObjs.length) {
    console.log("Gaps Found")
    arrayOfDateGapObjs.forEach(async dateGapObj => await getForwardFromDate(dateGapObj.b))} else {
      console.log("No Gaps at Present...")
    }
  
  
  await checkAndGetForwardFromLatest()
  await checkAndGetBackFromOldest()

  storedNewsletters = fs.readdirSync('./archive/markdownNewsletters/freshTest').sort((a, b) => new Date(b) - new Date(a))

  arrayOfDateGapObjs = dateGaps()

  console.log("Final Check For Gaps...")

  if (arrayOfDateGapObjs) {arrayOfDateGapObjs.forEach(async dateGapObj => await getForwardFromDate(dateGapObj.b))}
  console.log("Finish update")
}
getAll()

function dateGaps() {
  const storedNewsletters = fs.readdirSync('./archive/markdownNewsletters/freshTest').sort((a, b) => new Date(b) - new Date(a))

  const arrayOfGaps = storedNewsletters.map((element, index, array) => ({a: element , b: array[index +1] , spread: dayjs.duration(dayjs(element).diff(dayjs(array[index+1]))).asDays()})).filter((element, index, array ) => element.spread > 8)
  
  return arrayOfGaps   
}

export async function checkAndGetForwardFromLatest() { 
  console.log("Getting Forward from Latest")
  let start
  const storedNewsletters = fs.readdirSync('./archive/markdownNewsletters/freshTest').sort((a, b) => new Date(b) - new Date(a))
  if (storedNewsletters.length) {
    const urlNewestInArchive = getUrlOfNewsletter(getNewsletterFromDate(storedNewsletters.slice().shift())) 
    console.log("newest in archive:", urlNewestInArchive) 
    start =  urlNewestInArchive 
  } else {
    start = 'https://weekinethereumnews.com'
  }
  async function callbackOuter(error, res, done) {
     
      let newsletterInArchive
      if (error) {
        console.log(error);
      } else {
        const $ = res.$;
        const newsletterDate = getDateFromNewsletter($.html())

        //console.log(`${newsletterDate} is ${chalk.blue(res.statusCode)}`) 

        if (res.statusCode !== 200) {console.log(res.body)}

        newsletterInArchive = storedNewsletters.find(fileName => fileName === newsletterDate )

        if (newsletterInArchive?.length)  {console.log(`${newsletterDate} In archive? ${chalk.green('YES')}`)}  
        if (!newsletterInArchive) {console.log(`${newsletterDate} In archive?: ${chalk.red('NO')}`)}

        if (!newsletterInArchive) {
          await convertAndStore($.html())          
        } 
        const nextUrl = $('.nav-next').children('a').attr('href');
        if (nextUrl) {
          crawler.queue([{
            uri: nextUrl,
            rateLimit: 2500,
            callback: async (error, res, done) => {
              console.log("callback inner")
              if (error) {
                console.log(error);
              } else {
                const $ = res.$;

                const newsletterDate = getDateFromNewsletter($.html())

                newsletterInArchive = storedNewsletters.find(fileName => fileName === newsletterDate)

                if (newsletterInArchive?.length)  {console.log(`${newsletterDate} In archive? ${chalk.green('YES')}`)}  
                if (!newsletterInArchive) {console.log(`${newsletterDate} In archive?: ${chalk.red('NO')}`)}
                if (!newsletterInArchive) {
                  await convertAndStore($.html())          
                } 

                const nextUrl = $('.nav-next').children('a').attr('href');
                if (nextUrl) {
                  crawler.queue(nextUrl)
                }
              }
              done() 
            }
          }]);
        }
      }
      done();
    console.log("checkAndGetForwardFromLatest() complete")
    }
  

  const crawler = new Crawler({
    rateLimit: 2500,
    callback: callbackOuter
  })
  crawler.queue(start)
}




async function checkAndGetBackFromOldest() {
  console.log("Getting Backwards from Oldest...")
  let start
  const storedNewsletters = fs.readdirSync('./archive/markdownNewsletters/freshTest').sort((a, b) => new Date(b) - new Date(a))
  if (storedNewsletters.length) {
    const urlOldestInArchive = getUrlOfNewsletter(getNewsletterFromDate(storedNewsletters.slice().pop())) 
    console.log("oldest in archive:", urlOldestInArchive) 

    start =  urlOldestInArchive 
  } else {
    start = 'https://weekinethereumnews.com'
  }
  const crawler = new Crawler({
    rateLimit: 2500,
    callback: async (error, res, done) => {
      let newsletterInArchive
      if (error) {
        console.log(error);
      } else {
        const $ = res.$;
        const newsletterDate = getDateFromNewsletter($.html())

        //console.log(`${newsletterDate} is ${chalk.blue(res.statusCode)}`) 

        if (res.statusCode !== 200) {console.log(res.body)}

        newsletterInArchive = storedNewsletters.find(fileName => fileName === newsletterDate )

        
        if (newsletterInArchive?.length)  {console.log(`${newsletterDate} In archive? ${chalk.green('YES')}`)}  
        if (!newsletterInArchive) {console.log(`${newsletterDate} In archive?: ${chalk.red('NO')}`)}

        if (!newsletterInArchive) {
          await convertAndStore($.html())          
        } 
        const prevUrl = $('.nav-previous').children('a').attr('href');
        if (prevUrl) {
          crawler.queue([{
            uri: prevUrl,
            rateLimit: 2500,
            callback: async (error, res, done) => {
              if (error) {
                console.log(error);
              } else {
                const $ = res.$;

                const newsletterDate = getDateFromNewsletter($.html())

                newsletterInArchive = storedNewsletters.find(fileName => fileName === newsletterDate)

                if (newsletterInArchive?.length)  {console.log(`${newsletterDate} In archive? ${chalk.green('YES')}`)}  
                if (!newsletterInArchive) {console.log(`${newsletterDate} In archive?: ${chalk.red('NO')}`)}
                if (!newsletterInArchive) {
                  await convertAndStore($.html())          
                } 

                const prevUrl = $('.nav-previous').children('a').attr('href');
                if (prevUrl) {
                  crawler.queue(prevUrl)
                }
              }
              done() 
            }
          }]);
        }
      }
      done();
    }
  });
  crawler.queue(start)
}
//checkAndGetBackFromLatest()

async function getForwardFromDate(startDate) {
  console.log("Filling Date Gaps...")
  const newsletterFromDate = getNewsletterFromDate(startDate)
  const  startDateUrl = getUrlOfNewsletter(newsletterFromDate)

  let crawledPreviousGlobal

  const crawler = new Crawler({
    rateLimit: 2500,
    callback: async (error, res, done) => {
      if (error) {
        console.log(error);
      } else {
        const $ = res.$;
        const nextUrl = $('a[rel=next]').attr('href');
        if (nextUrl) {
          crawler.queue([{
            uri: nextUrl,
            callback: async (error, res, done) => {
              if (error) {
                console.log(error);
              } else {
                crawledPreviousGlobal = true 
                const $ = res.$;
                await convertAndStore($.html())
                 
                const nextUrl = $('a[rel=next]').attr('href');
                
                if (nextUrl) {
                  crawler.queue(nextUrl)
                }
              }
             done() 
            }
          }]);
        } else if (!nextUrl && crawledPreviousGlobal) {
          await convertAndStore($.html())
          crawledPreviousGlobal = false
        }
      }
      done();
    }
  });
  
crawler.queue(startDateUrl)
}

//getForwardFromDate('12-24-2021')

function getForwardFromFirst() {
  const firstNewsletterDate = "8-21-16"
  const firstNewsletterURL = "https://weekinethereumnews.com/week-in-ethereum-news-august-21-2016/"
  const queue = [firstNewsletterURL]

  const c = new Crawler({
    maxconnections: 10,
    callback: (error, res, done) => {
      if (error) {
        console.log(error);
      } else {
        const $ = res.$;

        // find the next url and enqueue it 
        const nextUrl = $('a[rel=next').attr('href');
        if (nextPage) {
          pagesCrawler.queue(nextUrl);
        }
      }
      done();
    }
  });
c.queue(StartUrl)
}

//getForwardFromFirst()

// <a href="https://weekinethereumnews.com/week-in-ethereum-news-august-28-2016/" rel="next">Next Post </a>


