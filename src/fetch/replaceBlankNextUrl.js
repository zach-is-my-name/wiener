import {loadNewsletterFromDb, addNextUrl} from '../db/db.js'

import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'

import {logger} from '../devLog/logger.js' 
logger.level = "debug"
// const __dirname = dirname(fileURLToPath(import.meta.url));
const __dirname = '/home/zmg/Tinker/wiener/src/db/'
const file = join(__dirname, 'db.json')
const adapter = new JSONFile(file)
const db = new Low(adapter)
await db.read()
db.data ||= { newsletters: [ ] }
const { newsletters } = db.data
//bad logic
export async function replaceBlankNextUrl(dateLatestPub, checkedUrls, setCheckedUrls) {
  if (newsletters.length > 1 && typeof dateLatestPub === 'string' && checkedUrls === false) {
    let noNextUrl = newsletters.filter(obj => obj.date !== dateLatestPub && obj.nextUrl.length === 0)
    logger.debug({noNextUrl})
    for (let i = 0; i < noNextUrl.length; i++) {
        await addNextUrl(i, noNextUrl[i])   
        setCheckedUrls(true)
      } 
    }
  return true
}

