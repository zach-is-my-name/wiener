#!/usr/bin/env node
const Crawler = require('crawler');

getForwardFromFirst()
async function getForward(start) {
}

function getForwardFromFirst() {
  const firstNewsletterDate = "8-21-16"
  const firstNewsletterURL = "https://weekinethereumnews.com/week-in-ethereum-news-august-21-2016/"
  const queue = [firstNewsletterURL ]

  const c = new Crawler({
      maxConnections: 10,
      callback: (error, res, done) => {
          if (error) {
              console.log(error);
          } else {
              const $ = res.$;
              const nextUrl = $('a[rel=next').attr('href');
              console.log(nextUrl)
          }
          done();
      }
  });
  
}

// <a href="https://weekinethereumnews.com/week-in-ethereum-news-august-28-2016/" rel="next">Next Post </a>


// Queue just one URL, with default callback
//c.queue('http://www.amazon.com');

// Queue a list of URLs
c.queue(queue);


// Queue URLs with custom callbacks & parameters
/*
c.queue([{
    uri: 'http://parishackers.org/',
    jQuery: false,

    // The global callback won't be called
    callback: (error, res, done) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Grabbed', res.body.length, 'bytes');
        }
        done();
    }
}]);

// Queue some HTML code directly without grabbing (mostly for tests)
c.queue([{
    html: '<p>This is a <strong>test</strong></p>'
}]);
*/
