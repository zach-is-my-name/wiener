import { createRequire } from 'module'
const require = createRequire(import.meta.url);
const StormDB = require("stormdb");
// start db with "./db.stormdb" storage location
const engine = new StormDB.localFileEngine("./db.stormdb");
const newsletters_db = new StormDB(engine);

// set default db value if db is empty
newsletters_db.default({ 
  newsletters: [
    {date: "", text: ""}
  ]  
   });

// add new entry
export function addNewsletter(date, text) {
  newsletters_db.get("newsletters").push({ date, text });
  newsletters_db.save()
}

export function loadNewsletter(dateString) {
  return newsletters_db.get("newsletters").find(obj => obj.date === dateString)
}
/* update username of first user
db.get("users")
  .get(0)
  .get("name")
  .set("jeff");

// save changes to db
db.save();
*/
