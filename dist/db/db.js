import _asyncToGenerator from "@babel/runtime/helpers/asyncToGenerator";
import _regeneratorRuntime from "@babel/runtime/regenerator";
import { join, dirname } from 'path';
import { Low, JSONFile } from 'lowdb';
import { fileURLToPath } from 'url';

var __dirname = dirname(fileURLToPath(import.meta.url)); // Use JSON file for storage


var file = join(__dirname, 'db.json');
var adapter = new JSONFile(file);
var db = new Low(adapter); // add new entry

export function addNewsletterToDb(_x, _x2, _x3, _x4, _x5) {
  return _addNewsletterToDb.apply(this, arguments);
}

function _addNewsletterToDb() {
  _addNewsletterToDb = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(date, text, url, prevUrl, nextUrl) {
    var newsletters;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return db.read();

          case 2:
            db.data || (db.data = {
              newsletters: []
            });
            newsletters = db.data.newsletters;
            newsletters.push({
              date: date,
              text: text,
              url: url,
              prevUrl: prevUrl,
              nextUrl: nextUrl
            });
            _context.next = 7;
            return db.write();

          case 7:
            return _context.abrupt("return", true);

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _addNewsletterToDb.apply(this, arguments);
}

export function loadNewsletterFromDb(_x6) {
  return _loadNewsletterFromDb.apply(this, arguments);
}

function _loadNewsletterFromDb() {
  _loadNewsletterFromDb = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(dateString) {
    var newsletters, storedNewsletters;
    return _regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return db.read();

          case 2:
            db.data || (db.data = {
              newsletters: []
            });
            newsletters = db.data.newsletters;
            storedNewsletters = newsletters.sort(function (a, b) {
              return new Date(b.date) - new Date(a.date);
            });

            if (!(dateString.length === 0)) {
              _context2.next = 7;
              break;
            }

            return _context2.abrupt("return", storedNewsletters.pop());

          case 7:
            return _context2.abrupt("return", storedNewsletters.find(function (obj) {
              return obj.date === dateString;
            }));

          case 8:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _loadNewsletterFromDb.apply(this, arguments);
}