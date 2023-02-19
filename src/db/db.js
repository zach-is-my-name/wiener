import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'
const __dirname = dirname(fileURLToPath(import.meta.url)); //production db file
const file = join(__dirname, 'db.json')
const adapter = new JSONFile(file)
const db = new Low(adapter)


export async function addNewsletterToDb(date, text, url, prevUrl, nextUrl ) {
  await db.read()
  db.data ||= { newsletters: [] }             
  db.data.newsletters.unshift({ date, text, url, prevUrl, nextUrl});
  await db.write()
  await db.read()
  db.data ||= { newsletters: [] }             // For Node >= 15.x
  
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
    default: 
      throw new Error()
  }
}


export async function getDateLatestInArchive() {
  let result
  let attempts  = 0
  while (attempts < 2) {
    try {
      result = await loadNewsletterFromDb("first")
      if (result.length === 0)  {
        return []
      } else {
      return result.date
      }
    } catch (error) {
      attempts++
    }
  }
 throw new Error("failed to getDateLatestInArchive") 
}

export async function getArchiveLength() {
  await db.read()
  db.data ||= { newsletters: [] }             
  return db.data.newsletters.length 
}

export async function replaceBlankNextUrl(dateLatestPub, setReplaceCycleInitd) {

  let newsletters = await loadNewsletterFromDb("all")
  if (newsletters.length > 1 && typeof dateLatestPub === 'string') {
    let nl = newsletters
    for (let i = 0; i < nl.length; i++) {
      try {
        if ( nl[i].date !== dateLatestPub && !nl[i].nextUrl.length) {
          await addNextUrl(nl[i-1].url, i, nl)   
        }
      } catch(error) {
        return
      }
    }
    setReplaceCycleInitd(true)
  } else if (newsletters.length <= 1) {
    setReplaceCycleInitd(true)
  }
}

async function addNextUrl(nextUrl, i, nl) {
  const newObj = {...nl[i], nextUrl}  
  nl = nl.splice(i, 1, newObj) 
  await db.write()   
}

export async function checkContinuity() {
  const newsletters = await loadNewsletterFromDb("all")

  let hasContinuity = []
  for (let i = 0; i < newsletters.length -1; i++) {
    if (newsletters[i].prevUrl !== newsletters[i + 1]?.url) {
      hasContinuity.push(false)
    } else {
      hasContinuity.push(true)
    }
  }
  return hasContinuity.every((item) => item === true)
}

