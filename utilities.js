//import {dateSchedule} from './dateSchedule.js'

export function checkNewslettersBack(currentDate) {
  //const datesBefore = return dates before currentDate     
}

export function formatDate(newsletter) {
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
