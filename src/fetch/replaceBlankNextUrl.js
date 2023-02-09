
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

export async function replaceBlankNextUrl(dateLatestPub, setReplaceCycleInitd) {
  if (newsletters.length > 1 && typeof dateLatestPub === 'string') {
    let nl = newsletters
    // logger.debug("running replaceBlankNextUrl")
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
    setReplaceCycleInitd(true)
  } else if (newsletters.length <= 1) {
    setReplaceCycleInitd(true)
  }
}

async function addNextUrl(nextUrl, i, nl) {
  const newObj = {...nl[i], nextUrl}  
  nl = nl.splice(i, 1, newObj) 
  await db.write()   
  logger.debug("added nextUrl", {index: i, writing_nextUrl: newObj.nextUrl, currentUrl: newObj.url})
}

export async function checkContinuity() {
  let hasContinuity = []
  for (let i = 0; i < newsletters.length -1; i++) {
    // logger.debug({index: i, this_prevUrl:newsletters[i].prevUrl, next_url: newsletters[i + 1]?.url})
    if (newsletters[i].prevUrl !== newsletters[i + 1]?.url) {
      hasContinuity.push(false)
      logger.debug("Error: bad continuity", {index: i, this_prevUrl:newsletters[i].prevUrl, next_url: newsletters[i + 1]?.url} )
      throw new Error()
    } else {
      hasContinuity.push(true)
    }
  }
  return hasContinuity.every((item) => item === true)
}
