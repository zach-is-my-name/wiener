import { join, dirname } from 'path'
import { Low, JSONFile } from 'lowdb'
import { fileURLToPath } from 'url'

// const __dirname = dirname(fileURLToPath(import.meta.url)); production db file
const __dirname = '/home/zmg/Tinker/wiener/src/db/'
// Use JSON file for storage
const file = join(__dirname, 'db.json')
const adapter = new JSONFile(file)
const db = new Low(adapter)

export async function addNewsletterToDb(date, text, url, prevUrl, nextUrl, linkObjArr) {
  await db.read()
  db.data ||= { newsletters: [] }             
  db.data.newsletters.unshift({ date, text, url, prevUrl, nextUrl, linkObjArr });
  await db.write()

  await db.read()
  db.data.newsletters.sort((a, b) => new Date(b.date) - new Date(a.date))

  await db.write()
  
  const addedNewsletter = await loadNewsletterFromDb("date", date)

  return addedNewsletter 
}

export async function loadNewsletterFromDb(by, param) {
  await db.read()
  db.data ||= { newsletters: [] }             
  const storedNewsletters = db.data.newsletters.sort((a, b) => new Date(b.date) - new Date(a.date))
  if (storedNewsletters.length === 0) return "none" 
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

export async function getDateLatestInArchive() {
   const result = await loadNewsletterFromDb("first")
   const {date} = result || false 
  return date 
}
