// import {_logger, logger2} from '../devLog/logger.js';
import {addNewsletterToDb, loadNewsletterFromDb} from '../db/db.js'
import {applyMarkdown} from './applyMarkdown.js'
import {getDateFromNewsletter, validateInputDate} from '../utilities.js'
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

  await addNewsletterToDb(date, newsletter, url, prevUrl, nextUrl) 
  // _logger.info(`added ${date}`)
  return await loadNewsletterFromDb("first")
}









