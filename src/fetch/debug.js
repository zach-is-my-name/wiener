#!/usr/bin/env node
import {resolve} from 'import-meta-resolve'
import { join, dirname } from 'path'
import { Low, JSONFile } from 'lowdb'
import { fileURLToPath } from 'url'

async function debug() {
  const __dirname = dirname(fileURLToPath(await resolve("../db/db.json", import.meta.url)));
  const file = join(__dirname, 'db.json')
  const adapter = new JSONFile(file)
  const db = new Low(adapter)
  await db.read()

  db.data ||= { newsletters: [ ] }
  const { newsletters } = db.data
  const storedNewsletters = newsletters.sort((a, b) => new Date(b.date) - new Date(a.date))

  const mapped = storedNewsletters.map(obj => ({date: obj.date, url:obj.url, previous: obj.prevUrl}))

  console.log(mapped)
}

debug()
