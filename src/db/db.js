import {logger2, logger} from '../devLog/logger.js';
logger.level = "debug"
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
  
  const addedNewsletter = await loadNewsletterFromDb("date", date)
  // logger.debug("date trying to load by", date)
  // logger.debug("loadall", await loadNewsletterFromDb("all"))

  // logger.debug("addedNewsletter", addedNewsletter)
  return addedNewsletter 
}

export async function loadNewsletterFromDb(by, param) {
  await db.read()
  db.data ||= { newsletters: [] }             
  const storedNewsletters = db.data.newsletters.sort((a, b) => new Date(b.date) - new Date(a.date))
  
  switch (by) {
    case "date":
      // logger.debug(`find by ${param}`, storedNewsletters.find(obj => obj.date === param))
      return storedNewsletters.find(obj => obj.date === param)
    case "first":
      return storedNewsletters.slice(0,1).pop()
    case "url":
      return storedNewsletters.find(obj => obj.url === param)
    case "all": 
      return storedNewsletters.slice()
  }
}

export async function addNextUrl(index, arr) {
  if (arr.length > 1) {
    db.data = { newsletters: arr  }             
    let newsletters = db.data.newsletters 
    logger.debug({index})
    const nextUrl = newsletters[index+1].url 
    const targetObj  = {...newsletters[index], url: nextUrl} 
    newsletters = newsletters.splice(index, 1, targetObj) 
    await db.write()   
    return await loadNewsletterFromDb("all")  
  }
  return arr
}

export async function getDateLatestInArchive() {
   const result = await loadNewsletterFromDb("first")
  const {date} = result
  return result 
}