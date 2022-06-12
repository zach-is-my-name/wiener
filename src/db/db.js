/*always include April 18, 2021 in db*/ 
import {_logger, logger2} from '../devLog/logger.js' 
import { join, dirname } from 'path'
import { Low, JSONFile } from 'lowdb'
import { fileURLToPath } from 'url'
 
const __dirname = dirname(fileURLToPath(import.meta.url));

// Use JSON file for storage
const file = join(__dirname, 'db.json')
const adapter = new JSONFile(file)
const db = new Low(adapter)

// add new entry
export async function addNewsletterToDb(date, text, url, prevUrl, nextUrl) {
  // Use JSON file for storage
  await db.read()
  db.data ||= { newsletters: [] }             
  db.data.newsletters.unshift({ date, text, url, prevUrl, nextUrl });
  db.data.newsletters.sort((a, b) => new Date(b.date) - new Date(a.date))
  await db.write()

  const addedNewsletter = await loadNewsletterFromDb(date)
  return addedNewsletter 
}

export async function loadNewsletterFromDb(dateString) {
  await db.read()
  db.data ||= { newsletters: [] }             
  const { newsletters } = db.data
  
  const storedNewsletters = newsletters.sort((a, b) => new Date(b.date) - new Date(a.date))

  if (dateString.length === 0) {
    return storedNewsletters.shift()
  } 
  // _logger.info("inside loadNewsletterFromDb", { 
  //   storedNewslettersLength:storedNewsletters.length, 
  //   latestNewsletter: storedNewsletters.shift(), target: 
  //   {targetDate:dateString, 
  //     targetNewsletter:storedNewsletters.find(obj => obj.date === dateString)  
  //   } 
  // })
  return storedNewsletters.find(obj => obj.date === dateString)
}

export async function getDateFromLatestInArchive() {
  await db.read()
  db.data ||= { newsletters: [] }             
  const { newsletters } = db.data

  const storedNewsletters= newsletters.sort((a, b) => new Date(b.date) - new Date(a.date))

  const date = storedNewsletters.shift().date

  //_logger.info({dateLatestInArchive:date, dirname:__dirname })

  return date


}
