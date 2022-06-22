import { get } from 'stack-trace';
import {_logger, logger2} from '../devLog/logger.js' 
import { join, dirname } from 'path'
import { Low, JSONFile } from 'lowdb'
import { fileURLToPath } from 'url'

// const __dirname = dirname(fileURLToPath(import.meta.url)); production db file
const __dirname = '/home/zmg/Tinker/wiener/src/db/'
// Use JSON file for storage
const file = join(__dirname, 'db.json')
const adapter = new JSONFile(file)
const db = new Low(adapter)

export async function addNewsletterToDb(date, text, url, prevUrl, nextUrl) {
  await db.read()
  db.data ||= { newsletters: [] }             
  db.data.newsletters.unshift({ date, text, url, prevUrl, nextUrl });
  await db.write()
  await db.read()
  db.data.newsletters.sort((a, b) => new Date(b.date) - new Date(a.date))
  await db.write()
  const addedNewsletter = await loadNewsletterFromDb(date)
  return addedNewsletter 
}

export async function loadNewsletterFromDb(dateString) {
  await db.read()
  db.data ||= { newsletters: [] }             

  const storedNewsletters = db.data.newsletters.sort((a, b) => new Date(b.date) - new Date(a.date))

  if (!dateString || dateString.length === 0) {
    const loadPopMostRecent = storedNewsletters.slice(0,1).pop()
    return loadPopMostRecent
  } 
  return storedNewsletters.find(obj => obj.date === dateString)
}

export async function getDateFromLatestInArchive() {
   const result = await loadNewsletterFromDb()
  const {date} = result
  return result 
}
