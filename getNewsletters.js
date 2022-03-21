#!/usr/bin/env node
import Crawler from 'crawler';
import fs from 'fs';
import {convertAndStore} from './convert.js';
import {getUrlOfNewsletter, getNewsletterFromDate, getDateFromNewsletter} from './utilities.js'

export async function checkAndGetBackFromLatest() {

  const storedNewsletters = fs.readdirSync('./archive/markdownNewsletters/freshTest').sort((a, b) => new Date(b) - new Date(a))

  const  latest = 'https://weekinetheremnews.com' 
  const updateCrawler = new Crawler({
    maxconnections: 10,
    callback: async (error, res, done) => {
      let newsletterInArchive
      if (error) {
        console.log(error);
      } else {
        const $ = res.$;
        newsletterInArchive = storedNewsletters.find(newsletter => newsletter === getDateFromNewsletter($.html()))
        if (!newsletterInArchive) {
          await convertAndStore($.html())          
        } 
        if (previousUrl) {
          updateCrawler.queue([{
            uri: previousUrl,
            callback: async (error, res, done) => {
              if (error) {
                console.log(error);
              } else {
                const $ = res.$;
                newsletterInArchive = storedNewsletters.find(newsletter => newsletter === getDateFromNewsletter($.html()))
                if (!newsletterInArchive) {
                  await convertAndStore($.html())          
                } 

                const prevUrl = $('a[rel=prev]').attr('href');

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
  updateCrawler.queue(latest)
}

async function getForwardFromDate(startDate) {

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
                crawledPreviousGlobal = true 
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

        console.log(nextUrl)
      }
      done();
    }
  });
c.queue(StartUrl)
}

//getForwardFromFirst()

// <a href="https://weekinethereumnews.com/week-in-ethereum-news-august-28-2016/" rel="next">Next Post </a>


