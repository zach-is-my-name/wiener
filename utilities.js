#! /usr/bin/env/node
//import {dateSchedule} from './dateSchedule.js'
import fs from 'fs'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat.js'
import duration from 'dayjs/plugin/duration.js'
dayjs.extend(duration)
dayjs.extend(customParseFormat)
import cheerio from 'cheerio'
import axios from 'axios';
import rateLimit from 'axios-rate-limit';
import {applyMarkdown} from './applyMarkdown.js'
import {convertAndStore, convertAndStoreCurrent} from './convert1.js'
let errorCount = 0

const http = rateLimit(axios.create(), { maxRequests: 1, perMilliseconds: 2500 })

function validateInputDate(date) {
  if (typeof date !== 'string') {
    throw new Error(`argument must be a string ${date}`)
    return 
  } else if (dayjs(date, 'M-D-YYYY').isValid() === false){ 
    throw new Error(`date format invalid ${date}`)
    return 
  }
}

export function subsequentDate(baseDate, debug) {
  validateInputDate(baseDate)
  const baseDateNewsletter = getNewsletterFromDate(baseDate)
  const re = /\[Next\sPost.*\(https:\/\/weekinethereumnews\.com\/(?:week-in-ethereum-news-)?(jan(?:uary)?|feb(?:ruary)?|mar(?:ch)?|apr(?:il)?|may|jun(?:e)?|jul(?:y)?|aug(?:ust)?|sep(?:tember)?|oct(?:ober)?|nov(?:ember)?|dec(?:ember)?)-(\d{1,2})-(\d{4})/i

  
  if (!re.test(baseDateNewsletter)) {
   console.log({debug: JSON.stringify(debug)}) 
   console.log({baseDate,basedateNewsletter: baseDateNewsletter.length > 20, test: re.test(baseDateNewsletter) }) 
  }
  //if (!re.test(baseDateNewsletter)) console.log(baseDateNewsletter) 
  const execResult =  re.exec(baseDateNewsletter)
  const [match, monthName, date, year] = execResult 
  const month = monthNameToNumber(monthName)
  return `${month}-${date}-${year}`
}


export function getUrlOfNewsletter(markdownNewsletter) {
  validateInputDate(markdownNewsletter)
  const re = /(https\:\/\/weekinethereumnews.com\/(?:week-in-eth(?:ereum)?-news-)?.*\d)/igm
  //console.log(re.test(markdownNewsletter))

  const execResult = re.exec(markdownNewsletter)
  return execResult[1]
}

export function getNewsletterFromDate(date) {
  validateInputDate(date)
  let archiveFileNames = fs.readdirSync('./archive/markdownNewsletters/freshTest/') 

  let newsletterFileName = archiveFileNames.find(element => element === date)
  archiveFileNames = fs.readdirSync('./archive/markdownNewsletters/freshTest/')  

  newsletterFileName = archiveFileNames.find(element => element === date) 
 
  if (newsletterFileName) { 
    const newsletter = fs.readFileSync('./archive/markdownNewsletters/freshTest/' + newsletterFileName, {encoding:'utf8', flag:'r'})
    return newsletter
  } else {
    console.log("error")
  }
}

export async function fetchNewsletterFromDate(date, isCurrent) {
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

  if (isCurrent) {
  fetchedNewsletter && typeof fetchedNewsletter === 'string' ?  await convertAndStore(fetchedNewsletter) && console.log("should write newsletter"): console.log("no write")  

  } else {

  fetchedNewsletter && typeof fetchedNewsletter === 'string' ?  await convertAndStoreCurrent(fetchedNewsletter) && console.log("should write newsletter"): console.log("no write")  
  }
}

export async function fetchDateFromCurrentNewsletter() {
  const {data} = await http.get('http://weekinethereumnews.com');
  //const markdownNewsletter = applyMarkdown(data) 
  const date = await getDate(data)  
  return date
}

export async function fetchPreceedingDateOfCurrentNewsletter(currentNewsletterDate) {
  const {data} = await http.get('http://weekinethereumnews.com/page/2/');
  //const markdownNewsletter = applyMarkdown(data) 
  const date = await getDate(data)  
  return date
}

async function getDate(document) {
  const re = /(Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)\s+(\d{1,2}),\s+(\d{4})/i

  try {
    const execResult = re.exec(document)   
    const [match, monthName, day, year] = execResult
    let monthNum = monthNameToNumber(monthName)
    return monthNum + '-' + day + '-'+ year
  } catch(error) {
    console.log(error)    
    errorCount++
    if (errorCount > 5) throw new Error(`error count passed threshold, analize`)
  }
}

export async function getDateFromNewsletter(newsletter) {
  validateInputDate(newsletter)
  const date = await getDate(newsletter)
  return date
}


function monthNameToNumber(monthName){ if (typeof monthName === 'number') {
    return monthName
  }
    switch (monthName) {
      case  "January": 
      case "january":
      case    "Jan":
      case  "jan":
        return "1"
        break;
      case  "February":
      case  "february":
      case  "Feb":
      case "feb": 
        return "2" 
        break;
      case  "March":
      case  "march":
      case  "Mar": 
      case  "mar": 
        return "3"
        break;
      case  "April":
      case  "april":
      case "Apr":
      case "apr":
        return "4"
        break;
      case  "May":
      case  "may":
      case "may" :
        return "5" 
        break;
      case  "June":
      case  "june":
      case "Jun":  
      case "jun":
        return "6"
        break;
      case  "July":
      case  "july":
      case  "Jul":  
      case  "jul":
        return "7" 
        break;
      case  "August":
      case  "august":
      case "Aug":
      case "aug":
        return "8" 
        break;
      case  "September":  
      case  "september":  
      case "Sept":
      case"sept":
        return "9" 
        break;
      case"October":
      case"october":
      case "Oct" :
      case "oct":
        return "10" 
        break;
      case  "November":
      case  "november":
      case "Nov":  
      case "nov":
        return "11"
        break;
      case  "December":
      case  "december":
      case"Dec": 
      case "dec":
        return "12" 
        break;
    }
}

process.on('unhandledRejection', error => {
  // Will print "unhandledRejection err is not defined"
  console.log('unhandledRejection', error);
});
