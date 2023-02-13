import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat.js'
import duration from 'dayjs/plugin/duration.js'
dayjs.extend(duration)
dayjs.extend(customParseFormat)
import cheerio from 'cheerio'
import got from 'got';
import pThrottle from 'p-throttle';

export async function fetchDateCurrent() {
  let data 
  try {
    data = await got('https://weekinethereumnews.com').text();
  } catch (error) {
    return 
  }
  const { dateNumberFormat, dateWordFormat } = await getDate(data)  
  return ({ dateNumberFormat, dateWordFormat })
}

export async function fetchPermaLinkCurrent() {
  let data 
  try {
    data =  await got('https://weekinethereumnews.com').text();
  } catch (error) {
    console.clear()
    console.trace() 
    return 
  }
  const $ = cheerio.load(data)
  return $('h2.entry-title').children('a').attr('href')
}

export async function validateInputDate(date) {

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

//searches rendered text
async function getDate(document) {
  const re = /(Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)\s+(\d{1,2}),\s+(\d{4})/i

  try {
    const execResult = re.exec(document)   
    const [match, monthName, day, year] = execResult
    let monthNum = monthNameToNumber(monthName)
    return ({dateWordFormat:`${monthName.toLowerCase()}-${day}-${year}/`, dateNumberFormat: monthNum + '-' + day + '-'+ year})
  } catch(error) {
    // new Error(error)
  }
}

export async function getDateFromNewsletter(newsletter) {
  const {dateNumberFormat: date} = await getDate(newsletter)
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

const throttle = pThrottle({
  limit: 2,
  interval: 5000
});

export const throttledGot = throttle( async url => {
  return got(url).text()  
})

export function parseDate(strDate) {
  if (strDate?.length && (/(\d+)-(\d+)-(\d+)/).test(strDate)) {
    let _strDate = strDate.replace(/(\d+)-(\d+)-(\d+)/, "$1+$2+$3")
    return parseInt(_strDate)
  }         
  return false
}

