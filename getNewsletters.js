#!/usr/bin/env node
import Crawler from 'crawler';
import fs from 'fs';
import {convertAndStore} from './convert.js';

async function getForwardFromDate(startDate) {

  function getUrlOfNewsletter(newsletter) {
    const re = /(https\:\/\/weekinethereumnews.com\/week-in-ethereum-news-.*\d)/gm
    const execResult = re.exec(newsletter)
    //console.log(re.test(newsletter))
    //console.log(execResult[1])
    return execResult[1]
  }

  function getNewsletterFromDate(date) {
    const archiveFileNamesArr = fs.readdirSync('./archive/markdownNewsletters') 
    const newsletterFileName = archiveFileNamesArr.find(element => element === date)
    return fs.readFileSync('./archive/markdownNewsletters/' + newsletterFileName, {encoding:'utf8', flag:'r'})
  }

  const  startDateUrl = getUrlOfNewsletter(getNewsletterFromDate(startDate))
  
  let crawledPreviousGlobal
  const updateCrawler = new Crawler({
    maxconnections: 10,
    callback: async (error, res, done) => {
      if (error) {
        console.log(error);
      } else {
        const $ = res.$;
        const nextUrl = $('a[rel=next]').attr('href');
        if (nextUrl) {
          updateCrawler.queue([{
            uri: nextUrl,
            callback: async (error, res, done) => {
              if (error) {
                console.log(error);
              } else {
                crawledPrevious = true 
                const $ = res.$;
                await convertAndStore($.html())
                 
                const nextUrl = $('a[rel=next]').attr('href');
                
                if (nextUrl) {
                  updateCrawler.queue(nextUrl)
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
  
updateCrawler.queue(startDateUrl)
}

getForwardFromDate('12-24-2021')

function getForwardFromFirst() {
  console.log("ran")
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

        console.log(nextUrl)
      }
      done();
    }
  });
c.queue(StartUrl)
}

//getForwardFromFirst()

// <a href="https://weekinethereumnews.com/week-in-ethereum-news-august-28-2016/" rel="next">Next Post </a>


