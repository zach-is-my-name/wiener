#!/usr/bin/env node
import chalk from 'chalk';
import url from 'url'
import Crawler from 'crawler';
import fs from 'fs';
import {convertAndStore} from './convert1.js';
import {getUrlOfNewsletter, getNewsletterFromDate, getDateFromNewsletter} from './utilities.js'

/*
(function sorted() {
  const storedNewsletters = fs.readdirSync('./archive/markdownNewsletters/freshTest').sort((a, b) => new Date(b) - new Date(a))
  console.log(storedNewsletters.slice())
  console.log(storedNewsletters.slice().shift())
})()
*/

export async function checkAndFetchBackFromLatest() {

  const storedNewsletters = fs.readdirSync('./archive/markdownNewsletters/freshTest').sort((a, b) => new Date(b) - new Date(a))

  const urlNewestInArchive = getUrlOfNewsletter(await getNewsletterFromDate(storedNewsletters.slice().shift())) 
  let count = 0
  const updateCrawler = new Crawler({
    rateLimit: 2500,
    callback: async (error, res, done) => {
      if (error) {
        console.log(error);
      } else {
        const $ = res.$;
        const newsletterDate = await getDateFromNewsletter($.html())
        console.log({newsletterDate})
        console.log("Count: ", count)
        count++

        let newsletterInArchiveArray = storedNewsletters.find(fileName => fileName === newsletterDate )
        
        if (newsletterInArchiveArray?.length)  {console.log(`${newsletterDate} In archive? ${chalk.green('YES')}`)}  
        if (!newsletterInArchiveArray) {console.log(`${newsletterDate} In archive?: ${chalk.red('NO')}`)}

        if (!newsletterInArchiveArray) {
          await convertAndStore($.html())          
        } 

        const prevUrl = $('.nav-previous').children('a').attr('href');
        if (prevUrl) {
          updateCrawler.queue([{
            uri: prevUrl,
            rateLimit: 2500,
            callback: async (error, res, done) => {
              if (error) {
                console.log(error);
              } else {
                const $ = res.$;
                const newsletterDate = await getDateFromNewsletter($.html())
                newsletterInArchiveArray = storedNewsletters.find(fileName => fileName === newsletterDate)

                if (newsletterInArchiveArray?.length)  {console.log(`${newsletterDate} In archive? ${chalk.green('YES')}`)}  
                if (!newsletterInArchiveArray) {console.log(`${newsletterDate} In archive?: ${chalk.red('NO')}`)}
                if (!newsletterInArchiveArray) {
                  await convertAndStore($.html())          
                } 

                const prevUrl = $('.nav-previous').children('a').attr('href');
                if (prevUrl) {
                  updateCrawler.queue(prevUrl)
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
  updateCrawler.queue(urlNewestInArchive)
}

checkAndFetchBackFromLatest()


