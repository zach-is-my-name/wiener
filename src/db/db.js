import { join, dirname } from 'path'
import { Low, JSONFile } from 'lowdb'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url));

// Use JSON file for storage
const file = join(__dirname, 'db.json')
const adapter = new JSONFile(file)
const db = new Low(adapter)

// Read data from JSON file, this will set db.data content
await db.read()

// set default db value if db is empty
db.data ||= { newsletters: [{date:"", text:""}] }

// add new entry
export async function addNewsletterToDb(date, text) {
  await db.read()
  const { newsletters } = db.data
  newsletters.push({ date, text });
  await db.write()
  return true
}

export async function loadNewsletterFromDb(dateString) {
  await db.read()
  const { newsletters } = db.data
  return newsletters.find(obj => obj.date === dateString)
}

