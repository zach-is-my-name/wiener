#!/usr/bin/env node
import chalk from 'chalk';
import url from 'url'
import Crawler from 'crawler';
import fs from 'fs';
import {convertAndStore} from './convert1.js';
import {getUrlOfNewsletter, getNewsletterFromDate, fetchDateFromCurrentNewsletter,getDateFromNewsletter, fetchNewsletterFromDate, fetchPreceedingDateOfCurrentNewsletter, subsequentDate} from './utilities1.js'
//import {updateForwardFromNewest} from './updateForwardFromNewest.js'
import dayjs from 'dayjs'
import path from 'path'
import duration from 'dayjs/plugin/duration.js'
dayjs.extend(duration)

const methods = ['log', 'warn', 'error']
methods.forEach((methodName) => {
  const originalMethod = console[methodName];
  console[methodName] = (...args) => {
    let initiator = 'unknown place';
    try {
      throw new Error();
    } catch (e) {
      if (typeof e.stack === 'string') {
        let isFirst = true;
        for (const line of e.stack.split('\n')) {
          const matches = line.match(/^\s+at\s+(.*)/);
          if (matches) {
            if (!isFirst) { // first line - current function
                            // second line - caller (what we are looking for)
              initiator = matches[1];
              break;
            }
            isFirst = false;
          }
        }
      }
    }
    originalMethod.apply(console, [...args, '\n', chalk.ansi256(237).dim(`at ${initiator}`)]);
  };
})

export async function getAll() {
  console.log("starting")
  let errorCount = 0 
  let pass = 0  
  let loopGlobal
  do {
    pass++
    console.log("Iteration: ", pass)
    //if (pass >= 5) break
    const dateBeforeCurrent = await fetchPreceedingDateOfCurrentNewsletter() 

    let storedNewsletters = fs.readdirSync('./archive/markdownNewsletters/freshTest').sort((a, b) => new Date(b) - new Date(a))

    console.log({storedNewsletters})

    if  (!Boolean(storedNewsletters.find(file => {return file === '8-28-2016' }))) {
      storedNewsletters.unshift(await fetchNewsletterFromDate('8-28-2016'))
    }
    if  (!Boolean(storedNewsletters.find(file => {return file === dateBeforeCurrent}))) {
      storedNewsletters.unshift(await fetchNewsletterFromDate(dateBeforeCurrent))
    }

    let dateGaps = storedNewsletters.map((element, index, array) => (
      {firstDate: element, 
        secondDate: array[index +1], 
        spread: dayjs.duration(dayjs(element).diff(dayjs(array[index+1]))).asDays()
      })).filter(element => element.spread >= 7)

    console.log({dateGaps})
    if (dateGaps.length) {
      const gapNotNext = dateGaps.filter((gapObj, index ,array)  => {
        const debug = {index, array}
        const next = subsequentDate(gapObj.secondDate, gapObj.secondDate )
        const files = (fs.readdirSync('./archive/markdownNewsletters/freshTest'))
        const sortedFiles = files.sort((a, b) => new Date(b) - new Date(a))
        const nextInArchive = files.includes(next) 

        return (
          gapObj.firstDate && 
          gapObj.secondDate && 
          gapObj.firstDate !== next &&
          !nextInArchive
        )
      })
      loopGlobal = gapNotNext 
      console.log({gapNotNext})
      if (gapNotNext.length) {
        for (const obj of gapNotNext) {
          try {
          await fetchNewsletterFromDate(subsequentDate(obj.secondDate), false)
          } catch (e) {throw new Error(`problem fetching newsletter: ${e} }`)}
        }
      } 
    } 
  } while (loopGlobal.length)

  // handle current newsletter
  // segregating currrent newsletters allows ensures the next weeks url is available
  let debugFile
  const currentDateNewsletters = fs.readdir('./archive/markdownNewsletters/currentNewsletters', (err, files) => {
    if (!err) {
      return sortFiles(files)
    } else {
      console.log(err)
    }
  })

  async function sortFiles(files) {
    return files.sort((a, b) => new Date(b) - new Date(a))
  }

    //.catch(e => {throw new Error(`${e} From the file ${debugFile}` )})


  const currentNewsletterDate = await fetchDateFromCurrentNewsletter();


  (async function handleResidualCurrentNewsletters() {
    const notCurrent = currentDateNewsletters.filter(date => date !== currentNewsletterDate) 

    if (notCurrent.length) {
      let i   
      for (const file of notCurrent) {
        i++
        try {
          await fetchNewsletterFromDate(file)
        } catch (e) {throw new Error(`problem fetching newsletter: `)} 
      } 

      if (i !== notCurrent.length) throw new Error(`did not fetch all notCurrent`, {notCurrent})
      for (const file of notCurrent) {
        fs.unlinkSync(file)
      }
    }
  })()


  ( async function handleActualCurrentNewsletter(){

    fs.promises.readdir('./archive/markdownNewsletters/currentNewsletters').then((array) => {if (array.length !== 0) throw new Error(`did not delete all currentNewsletters`)}) 

    if (!currentDateNewsletters.includes(currentNewsletterDate)) {
      await fetchNewsletterFromDate(currentNewsletterDate, true)
    }
  })()
}


process.on('unhandledRejection', error => {
  // Will print "unhandledRejection err is not defined"
  console.log('unhandledRejection', error);
});
getAll()

function finder() {
let storedNewsletters = fs.readdirSync('./archive/markdownNewsletters/freshTest').sort((a, b) => new Date(b) - new Date(a))
console.log({storedNewsletters, conditional: storedNewsletters.find(file => file ==='8-28-2016' ) })
}
//finder()
