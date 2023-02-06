
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

export async function replaceBlankNextUrl(dateLatestPub /*, checkedUrls, setCheckedUrls */) {

  if (newsletters.length > 1 && typeof dateLatestPub === 'string' /*&& checkedUrls === false */) {
    let nl = newsletters

    for (let i = 0; i < nl.length; i++) {
      try {
      if ( nl[i].date !== dateLatestPub && !nl[i].nextUrl.length) {
        await addNextUrl(nl[i-1].url, i, nl)   
      }
      } catch(error) {
        logger.debug(`Error @ index ${i} ------ ${error}-------- ${Object.keys(nl[i])}`)
        return
      }
    }
   // setCheckedUrls(true)
  }
  return true
}

async function addNextUrl(nextUrl, i, nl) {
    const newObj = {...nl[i], nextUrl}  
    nl = nl.splice(i, 1, newObj) 
    await db.write()   
    logger.debug("added nextUrl", {index: i, writing_nextUrl: newObj.nextUrl, currentUrl: newObj.url})
}

