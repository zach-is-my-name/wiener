import {addNewsletterToDb, loadNewsletterFromDb} from '../db/db.js'
import {applyMarkdown} from './applyMarkdown.js'
import {getDateFromNewsletter, validateInputDate} from '../utilities.js'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat.js'
dayjs.extend(customParseFormat)

export async function convertAndStore(htmlNewsletter, url, prevUrl, nextUrl) {
  
  let {markdown: newsletter}  = await applyMarkdown(htmlNewsletter)
  const date = await getDateFromNewsletter(newsletter) 

  await validateInputDate(date) 

  newsletter = newsletter.split(/\n/) 
  
  debugger;
  const res = await addNewsletterToDb(date, newsletter, url, prevUrl, nextUrl) 
  // if (!res) return new Error({date, newsletter, url, prevUrl, nextUrl})
  return res
}








