import {_logger} from '../devLog/logger.js';
import {addNewsletterToDb} from '../db/db.js'
import {applyMarkdown} from './applyMarkdown.js'
import {getDateFromNewsletter, getUrlOfNewsletter} from '../utilities.js'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat.js'
dayjs.extend(customParseFormat)
import chalk from 'chalk'

export async function convertAndStore(htmlNewsletter, prevUrl, nextUrl) {
  const markdownNewsletter = await applyMarkdown(htmlNewsletter) 
  const date = await getDateFromNewsletter(markdownNewsletter) 
  const url = getUrlOfNewsletter(markdownNewsletter) 

  if (dayjs(date, 'M-D-YYYY').isValid() === true) {
    const addedNewsletterObj = await addNewsletterToDb(date, markdownNewsletter, url, prevUrl, nextUrl) 
    _logger.info({addedNewsletterObj})
    return addedNewsletterObj
  } else { console.log("invalid date format")}
}

//async function writeFile(date, markdownNewsletter, isCurrent) {
//  if (!isCurrent) {
//    let filename =  './archive/markdownNewsletters/freshTest/'+ date
//    fs.writeFile(filename, markdownNewsletter, { flag: "wx" }, function(err) {
//      if (err) {
//        console.log("file " + filename + " already exists, testing next");
//        //filename = filename + "0";
//        //writeFile();
//      } else {
//        console.log("Succesfully written " + filename);
//      }
//    });
//  } else {
//    let filename =  './archive/markdownNewsletters/freshTest/currentNewsletters/'+ date
//    fs.writeFile(filename, markdownNewsletter, { flag: "wx" }, function(err) {
//      if (err) {
//        console.log("file " + filename + " already exists, testing next");
//        //filename = filename + "0";
//        //writeFile();
//      }
//      else {
//        console.log("Succesfully written " + filename);
//      }
//    });

//  }
//}

//export async function convertAndStoreCurrent(newsletter) {
//  const markdownNewsletter = await applyMarkdown(newsletter) 
//  const date = await getDateFromNewsletter(markdownNewsletter) 
//  //writeFile(date, markdownNewsletter, true)
//  //console.log(chalk.green('written %s'), date)
//  addNewsletterToDb(date, markdownNewsletter) 
//}

