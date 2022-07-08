import stripAnsi from 'strip-ansi'
import {addNewsletterToDb, loadNewsletterFromDb} from './src/db/db.js'


(async () => {
  const newsletters = await loadNewsletterFromDb("all")  
  const res = newsletters.map(obj => obj.text.map(line=> stripAnsi(line))) 
  console.log(res) 

}
)()

