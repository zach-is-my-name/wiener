import {addNewsletterToDb} from './db.js'
import {applyMarkdown} from './applyMarkdown.js'
import {getDateFromNewsletter} from './utilities.js'

import fs from 'fs'

export async function convertAndStoreAll() {
  const htmlNewsletterFileNames = fs.readdirSync('/home/zmg/Tinker/wiener/archive/htmlNewsletters')
  for (let i = 0; i < htmlNewsletterFileNames.length; i++) {
      const data = fs.readFileSync('/home/zmg/Tinker/wiener/archive/htmlNewsletters/'+ htmlNewsletterFileNames[i], {encoding:'utf8', flag:'r'})
      const markdownNewsletter = await applyMarkdown(data) 
      const date = getDateFromNewsletter(markdownNewsletter) 
      console.log('writing '+ date)
      fs.writeFileSync('./markdownNewsletters/'+ date, markdownNewsletter)
      addNewsletterToDb(date, markdownNewsletter) 
  }
}

export async function convertAndStore(html) {
      const markdownNewsletter = await applyMarkdown(html) 
      const date = getDateFromNewsletter(markdownNewsletter) 
      console.log('writing '+ date)
      fs.writeFileSync('./archive/markdownNewsletters/test/'+ date, markdownNewsletter)
      //addNewsletterToDb(date, markdownNewsletter) 
}





