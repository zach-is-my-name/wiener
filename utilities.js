//import {dateSchedule} from './dateSchedule.js'
import fs from 'fs'

export function getUrlOfNewsletter(markdownNewsletter) {
  const re = /(https\:\/\/weekinethereumnews.com\/week-in-ethereum-news-.*\d)/gm
  const execResult = re.exec(markdownNewsletter)
  return execResult[1]
}

export function getNewsletterFromDate(date) {
  const archiveFileNamesArr = fs.readdirSync('./archive/markdownNewsletters') 
  const newsletterFileName = archiveFileNamesArr.find(element => element === date)
  return fs.readFileSync('./archive/markdownNewsletters/' + newsletterFileName, {encoding:'utf8', flag:'r'})
}

export function getDateFromNewsletter(newsletter) {
  const re = /(Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)\s+(\d{1,2}),\s+(\d{4})/i
  const execResult = re.exec(newsletter)   
  if (execResult == undefined){console.log("exec result undefined")} 
  const [match, monthName, day, year] = execResult
  let monthNum 
  switch (monthName) {
    case  "January": 
      monthNum = "1"
      break;
    case  "February":
      monthNum = "2" 
      break
    case  "March": 
      monthNum = "3"
      break
    case  "April":
      monthNum = "4"
      break
    case  "May":
      monthNum = "5" 
      break
    case  "June":
      monthNum = "6"
      break
    case  "July":
      monthNum = "7" 
      break
    case  "August":
      monthNum = "8" 
      break
    case  "September":
      monthNum = "9" 
      break
    case  "October":
      monthNum = "10" 
      break
    case  "November":
      monthNum = "11"
      break
    case  "December":
      monthNum = "12" 
      break
  }

  return monthNum+'-'+day+'-'+year
}
