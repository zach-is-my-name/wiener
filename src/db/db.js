import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'
import {logger} from '../devLog/logger.js'
logger.level = "debug"

// const __dirname = dirname(fileURLToPath(import.meta.url)); //production db file
const __dirname = '/home/zmg/Tinker/wiener/src/db/'
const file = join(__dirname, 'db.json')
const adapter = new JSONFile(file)
const db = new Low(adapter)


export async function addNewsletterToDb(date, text, url, prevUrl, nextUrl ) {
  await db.read()
  db.data ||= { newsletters: [] }             
  logger.debug("before write", db.data.newsletters.length)
  db.data.newsletters.unshift({ date, text, url, prevUrl, nextUrl});
  await db.write()
  await db.read()
  db.data ||= { newsletters: [] }             // For Node >= 15.x
  logger.debug("after write", db.data.newsletters.length)
  
  await db.read()
  db.data.newsletters.sort((a, b) => new Date(b.date) - new Date(a.date))

  await db.write()
  
  await db.read()
  
  const addedNewsletter = await loadNewsletterFromDb("date", date)

  return addedNewsletter 
}

export async function loadNewsletterFromDb(by, param) {
  await db.read()
  db.data ||= { newsletters: [] }             
  const storedNewsletters = db.data.newsletters.sort((a, b) => new Date(b.date) - new Date(a.date))
  if (storedNewsletters.length === 0) return storedNewsletters 
  switch (by) {
    case "date":
      return storedNewsletters.find(obj => obj.date === param)
    case "first":
      return storedNewsletters.slice(0,1).pop()
    case "url":
      return storedNewsletters.find(obj => obj.url === param)
    case "all": 
      return storedNewsletters.slice()
  }
}

export async function addNextUrl(obj, i, nl) {
    nl = nl.splice(i, 1, obj) 
    await db.write()   
    logger.debug("added nextUrl", {index: i, writing_nextUrl: obj.nextUrl, currentUrl: nl[i].url})
}

export async function getDateLatestInArchive() {
   const result = await loadNewsletterFromDb("first")
   const {date} = result || false 
  return date 
}

