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
  const { newsletters } = db.data
  newsletters.push({ date, text, url, prevUrl, nextUrl });
  await db.write()
  return true
}

export async function loadNewsletterFromDb(dateString) {
  await db.read()
  db.data ||= { newsletters: [] }             
  const { newsletters } = db.data
  const storedNewsletters = newsletters.sort((a, b) => new Date(b.date) - new Date(a.date))

  if (dateString.length === 0) {
    return storedNewsletters.pop()
  } 
  return storedNewsletters.find(obj => obj.date === dateString)
}

