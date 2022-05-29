#!/usr/bin/env node

import { join, dirname } from 'path'
import { Low, JSONFile } from 'lowdb'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url));

// Use JSON file for storage
const file = join(__dirname, 'db.json')
const adapter = new JSONFile(file)
const db = new Low(adapter)
await db.read()

db.data ||= { newsletters: [] }             

export async function addNewsletterToDb(date, text, url, prevUrl, nextUrl) {
  console.log({file, adapter, db})
  const { newsletters } = db.data
  newsletters.push({ date, text });
  await db.write()
}



export async function loadNewsletter(dateString) {
  await db.read()
  console.log(db.data)
}

 await addNewsletterToDb("11-11-1111", "Foo" )
// await loadNewsletter()




