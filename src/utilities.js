import fs from 'fs'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat.js'
import duration from 'dayjs/plugin/duration.js'
dayjs.extend(duration)
dayjs.extend(customParseFormat)
import cheerio from 'cheerio'
import got from 'got';
import chalk from 'chalk';

export async function fetchDateCurrent() {
  const data = await got('https://weekinethereumnews.com').text();
  const { dateWithMonth, dateWithMonthNumber } = await getDate(data)  
  return ({dateWithMonth, dateWithMonthNumber})
}

export function validateInputDate(date) {

  if (typeof date !== 'string') {
    // new Error(`argument must be a string ${JSON.stringify(date)}`)
    return 
  } else if (dayjs(date, 'M-D-YYYY').isValid() === false){ 
    // new Error(`date format invalid ${date}`)
    return 
  }
}

export function getUrlOfNewsletter(markdownNewsletter) {
  validateInputDate(markdownNewsletter)
  const re = /(https\:\/\/weekinethereumnews.com\/(?:week-in-eth(?:ereum)?-news-)?.*\d)/igm

  const execResult = re.exec(markdownNewsletter)
  return execResult[1]+'/'
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

//searches rendered text
async function getDate(document) {
  const re = /(Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)\s+(\d{1,2}),\s+(\d{4})/i

  try {
    const execResult = re.exec(document)   
    const [match, monthName, day, year] = execResult
    let monthNum = monthNameToNumber(monthName)
   return ({dateWithMonth:`${monthName.toLowerCase()}-${day}-${year}/`, dateWithMonthNumber: monthNum + '-' + day + '-'+ year})
  } catch(error) {
    // new Error(error)
  }
}

export async function getDateFromNewsletter(newsletter) {
  const {dateWithMonthNumber:date} = await getDate(newsletter)
  validateInputDate(date)
  return date
}

export function monthNameToNumber(monthName){ if (typeof monthName === 'number') {
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

