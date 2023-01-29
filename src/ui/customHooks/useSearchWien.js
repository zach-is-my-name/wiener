import cliTruncate from 'cli-truncate'
import fs from 'fs'
import chalk from 'chalk';
import stripAnsi from 'strip-ansi'
import Fuse from 'fuse.js'
import { join, dirname } from 'path'
import { Low, JSONFile } from 'lowdb'
import { fileURLToPath } from 'url'

// const __dirname = dirname(fileURLToPath(import.meta.url)); production db file
const __dirname = '/home/zmg/Tinker/wiener/src/db/'
const file = join(__dirname, 'db.json')
const adapter = new JSONFile(file)
const db = new Low(adapter)

await db.read()

export function useSearchWien(textBoxInput, setItems, setDateIndex) {
  const options = {
    includeMatches: true,
    findAllMatches: true,
    minMatchCharLength: 3,
    threshold: 0.2,
    ignoreLocation: true,
    shouldSort: false,
    keys: ['text']
  }
  let newsletters
  if (db.data?.newsletters && db.data.newsletters.length) {
   newsletters = db.data.newsletters 
  } else {
    newsletters = []
  }
  const index = Fuse.createIndex(options.keys, newsletters) 
  const fuse = new Fuse(newsletters, options, index)
  let searchResults = fuse.search(textBoxInput) || []

  setItems(searchResults.map((resObj, index) => hlQueryMatch(resObj, index)))

  setDateIndex(searchResults.map((resObj, index) => ({index, date: resObj.item.date, line: resObj.matches[0].value })))
}

function hlQueryMatch (resObj, index) {
  let {date} = resObj.item
  let {value} = resObj.matches[0]
  let indexStart, indexEnd, sliceEnd, fragment, hlFragment
  value = cliTruncate(_stripAnsi(value).trim(), 70, {position: "end"}); 
  [indexStart, indexEnd] = resObj.matches[0].indices[0]
  sliceEnd = indexEnd + 1
  fragment =  value.slice(indexStart, sliceEnd)
  hlFragment = chalk.bgAnsi256(103)(fragment);
  value = value.replace(fragment, hlFragment, value)
  return `${date}:  ${value}` 
}

function _stripAnsi(string) {
  return stripAnsi(string)
}

function removeMdLinks(string, value, index) {
  return string.replace(/\[([^\[]+)\](\(.*\))/,'$1' )
}


