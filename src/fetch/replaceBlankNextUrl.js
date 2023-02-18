// import {logger} from '../logger.js' 
// logger.level = "debug"

import { loadNewsletterFromDb } from '../db/db.js';

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
