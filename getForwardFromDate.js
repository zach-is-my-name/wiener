import {getUrlOfNewsletter, getNewsletterFromDate, getDateFromNewsletter, getPermaLinkFowardFromPage} from './utilities.js'
import {convertAndStore} from './convert1.js'
import Crawler from 'crawler';

export async function getForwardFromDate(startDate) {
  const newsletterFromDate = getNewsletterFromDate(startDate)
  const  startDateUrl = getUrlOfNewsletter(newsletterFromDate)

  let crawledPreviousGlobal

  const crawler = new Crawler({
    rateLimit: 2500,
    callback: async (error, res, done) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Scanning... ", res.request.uri)
        const $ = res.$;
        const nextUrl = $('a[rel=next]').attr('href');
        if (nextUrl) {
          crawler.queue([{
            uri: nextUrl,
            callback: async (error, res, done) => {
              if (error) {
                console.log(error);
              } else {
                console.log("Scanning... ", res.request.uri)
                //crawledPreviousGlobal = true 
                const $ = res.$;
                await convertAndStore($.html())
/*
                const nextUrl = $('a[rel=next]').attr('href');

                if (nextUrl) {
                  crawler.queue(nextUrl)
                */
                }
              }
              done() 
            }
          }]);
/*
        } else if (!nextUrl && crawledPreviousGlobal) {
          await convertAndStore($.html())
          crawledPreviousGlobal = false
        }
      }
      */
      done();
    }
  });
  crawler.queue(startDateUrl)
}

