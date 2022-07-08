import {logger2, logger} from '../devLog/logger.js';
logger.level = "debug"
import {addNewsletterToDb, loadNewsletterFromDb} from '../db/db.js'
import {applyMarkdown} from './applyMarkdown.js'
import {getDateFromNewsletter} from '../utilities.js'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat.js'
dayjs.extend(customParseFormat)
import pkg from 'utils-deep-clone';
const { toJSON } = pkg;

export async function convertAndStore(htmlNewsletter, url, prevUrl, nextUrl) {
  let newsletter = await applyMarkdown(htmlNewsletter)
  const date = await getDateFromNewsletter(newsletter) 
  validateInputDate(date) 

  newsletter = newsletter.split(/\n/) 
  
  const res = await addNewsletterToDb(date, newsletter, url, prevUrl, nextUrl) 
  if (!res) return new Error({date, newsletter, url, prevUrl, nextUrl})
  return res
}



