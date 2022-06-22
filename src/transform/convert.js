import {_logger, logger2} from '../devLog/logger.js';
import {addNewsletterToDb, loadNewsletterFromDb} from '../db/db.js'
import {applyMarkdown} from './applyMarkdown.js'
import {getDateFromNewsletter} from '../utilities.js'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat.js'
dayjs.extend(customParseFormat)
import pkg from 'utils-deep-clone';
const { toJSON } = pkg;

export async function convertAndStore(htmlNewsletter, url, prevUrl, nextUrl) {
  const markdownNewsletter = await applyMarkdown(htmlNewsletter) 
  const date = await getDateFromNewsletter(markdownNewsletter) 
  
  if (dayjs(date, 'M-D-YYYY').isValid() === true) {
    const addedNewsletterObj = await addNewsletterToDb(date, markdownNewsletter, url, prevUrl, nextUrl) 
    // return addedNewsletterObj
    const loadedFirstNewsletterObj = await loadNewsletterFromDb()
    // logger2.info(JSON.stringify(loadedFirstNewsletterObj)) 
    return loadedFirstNewsletterObj
  } else { console.log("invalid date format")}
}



