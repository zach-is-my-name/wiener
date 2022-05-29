#!/usr/bin/env node
import {addNewsletterToDb} from '../db/db.js'
import {applyMarkdown} from './applyMarkdown.js'
import {getDateFromNewsletter} from '../utilities.js'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat.js'
dayjs.extend(customParseFormat)
import chalk from 'chalk'
import fs from 'fs'

export async function convertAndStoreAll() {
  const htmlNewsletterFileNames = fs.readdirSync('/home/zmg/Tinker/wiener/archive/htmlNewsletters')
  for (let i = 0; i < htmlNewsletterFileNames.length; i++) {
      const data = fs.readFileSync('/home/zmg/Tinker/wiener/archive/htmlNewsletters/'+ htmlNewsletterFileNames[i], {encoding:'utf8', flag:'r'})
      const markdownNewsletter = await applyMarkdown(data) 
      const date = getDateFromNewsletter(markdownNewsletter) 
      console.log('writing '+ date)
      fs.writeFileSync('../archive/markdownNewsletters/freshTest'+ date, markdownNewsletter)
      addNewsletterToDb(date, markdownNewsletter) 
  }
}

