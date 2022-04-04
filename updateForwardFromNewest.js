import fs from 'fs'
import chalk from 'chalk'
import Crawler from 'crawler';
import {updateBackFromOldest} from './updateBackFromOldest.js'
import {getUrlOfNewsletter, getNewsletterFromDate, getDateFromNewsletter} from './utilities.js'

export async function updateForwardFromNewest() { 
  console.log(`${chalk.yellow('Getting Forward from Latest')}`)
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
    updateBackFromOldest()    
    console.log("checkAndGetForwardFromLatest() complete")
  }

  const crawler = new Crawler({
    rateLimit: 2500,
    callback: callbackOuter
  })
  crawler.queue(start)
}


