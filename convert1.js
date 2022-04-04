import {addNewsletterToDb} from './db.js'
import {applyMarkdown} from './applyMarkdown.js'
import {getDateFromNewsletter} from './utilities.js'
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
      fs.writeFileSync('./markdownNewsletters/freshTest'+ date, markdownNewsletter)
      addNewsletterToDb(date, markdownNewsletter) 
  }
}

async function writeFile(date, markdownNewsletter, isCurrent) {
  if (!isCurrent) {
    let filename =  './archive/markdownNewsletters/freshTest/'+ date
    fs.writeFile(filename, markdownNewsletter, { flag: "wx" }, function(err) {
      if (err) {
        console.log("file " + filename + " already exists, testing next");
        //filename = filename + "0";
        //writeFile();
      } else {
        console.log("Succesfully written " + filename);
      }
    });
  } else {
    let filename =  './archive/markdownNewsletters/freshTest/currentNewsletters/'+ date
    fs.writeFile(filename, markdownNewsletter, { flag: "wx" }, function(err) {
      if (err) {
        console.log("file " + filename + " already exists, testing next");
        //filename = filename + "0";
        //writeFile();
      }
      else {
        console.log("Succesfully written " + filename);
      }
    });

  }
}

export async function convertAndStore(newsletter) {
//  console.trace()
  const markdownNewsletter = await applyMarkdown(newsletter) 
  const date = await getDateFromNewsletter(markdownNewsletter) 
  if (dayjs(date, 'M-D-YYYY').isValid() === true) {
    //fs.writeFileSync('./archive/markdownNewsletters/freshTest/'+ date, markdownNewsletter)
    writeFile(date, markdownNewsletter, false)
    //console.log(chalk.green('written %s'), date)
    //addNewsletterToDb(date, markdownNewsletter) 
  } else { console.log("invalid date format", markdownNewsletter)}
}

export async function convertAndStoreCurrent(newsletter) {
  console.trace()
  const markdownNewsletter = await applyMarkdown(newsletter) 
  const date = await getDateFromNewsletter(markdownNewsletter) 
  //fs.writeFileSync('./archive/markdownNewsletters/freshTest/'+ date, markdownNewsletter)
  writeFile(date, markdownNewsletter, true)
  //console.log(chalk.green('written %s'), date)
  //addNewsletterToDb(date, markdownNewsletter) 
}

