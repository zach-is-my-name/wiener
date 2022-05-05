import { createRequire } from 'module';

var require = createRequire(import.meta.url);

var StormDB = require("stormdb"); // start db with "./db.stormdb" storage location


var engine = new StormDB.localFileEngine("./db.stormdb");
var newsletters_db = new StormDB(engine); // set default db value if db is empty

newsletters_db["default"]({
  newsletters: [{
    date: "",
    text: ""
  }]
}); // add new entry

export function addNewsletterToDb(date, text) {
  newsletters_db.get("newsletters").push({
    date: date,
    text: text
  });
  newsletters_db.save();
}
export function loadNewsletter(dateString) {
  return newsletters_db.get("newsletters").find(function (obj) {
    return obj.date === dateString;
  });
}
/* update username of first user
db.get("users")
  .get(0)
  .get("name")
  .set("jeff");

// save changes to db
db.save();
*/