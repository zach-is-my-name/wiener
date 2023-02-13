
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'

const __dirname = dirname(fileURLToPath(import.meta.url));
const file = join(__dirname, 'db.json')
const adapter = new JSONFile(file)
const db = new Low(adapter)

export async function replaceBlankNextUrl(dateLatestPub, setReplaceCycleInitd) {
  await db.read()
  db.data ||= { newsletters: [ ] }
  const { newsletters } = db.data

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
  await db.read()
  db.data ||= { newsletters: [ ] }
  const { newsletters } = db.data

  let hasContinuity = []
  for (let i = 0; i < newsletters.length -1; i++) {
    if (newsletters[i].prevUrl !== newsletters[i + 1]?.url) {
      hasContinuity.push(false)
      throw new Error()
    } else {
      hasContinuity.push(true)
    }
  }
  return hasContinuity.every((item) => item === true)
}
