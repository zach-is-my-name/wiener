import fs from 'fs'
import chalk from 'chalk';
import Crawler from 'crawler';
import {getUrlOfNewsletter, getNewsletterFromDate, getDateFromNewsletter, dateGaps} from './utilities1.js'

export async function updateBackFromOldest() {
  console.log(`${chalk.magenta('Getting Backwards from Oldest...')}`)
  let start
  const storedNewsletters = fs.readdirSync('./archive/markdownNewsletters/freshTest').sort((a, b) => new Date(b) - new Date(a))
  if (storedNewsletters.length) {
    const urlOldestInArchive = getUrlOfNewsletter(getNewsletterFromDate(storedNewsletters.slice().pop())) 
    console.log("oldest in archive:", urlOldestInArchive) 

    start = urlOldestInArchive 
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

        newsletterInArchive = storedNewsletters.find(fileName => fileName === newsletterDate)


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
                if (newsletterInArchive?.length) {console.log(`${newsletterDate} In archive? ${chalk.green('YES')}`)}  
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
      let arrayOfDateGapObjs = dateGaps()

      if (arrayOfDateGapObjs.length) {
        arrayOfDateGapObjs.forEach(dateGapObj => getForwardFromDate(dateGapObj.b))
      } 
     console.log("COMPLETE") 
    }
  })
  crawler.queue(start)
}
