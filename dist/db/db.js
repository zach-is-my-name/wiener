import _asyncToGenerator from "@babel/runtime/helpers/asyncToGenerator";
import _regeneratorRuntime from "@babel/runtime/regenerator";
import { _logger, logger2 } from '../devLog/logger.js';
import { join, dirname } from 'path';
import { Low, JSONFile } from 'lowdb';
import { fileURLToPath } from 'url';

var __dirname = dirname(fileURLToPath(import.meta.url)); // Use JSON file for storage


var file = join(__dirname, 'db.json');
var adapter = new JSONFile(file);
var db = new Low(adapter); //_logger.info({"meta-import": fileURLToPath(import.meta.url)})
// add new entry

export function addNewsletterToDb(_x, _x2, _x3, _x4, _x5) {
  return _addNewsletterToDb.apply(this, arguments);
}

function _addNewsletterToDb() {
  _addNewsletterToDb = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(date, text, url, prevUrl, nextUrl) {
    var addedNewsletter;
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
            db.data.newsletters.unshift({
              date: date,
              text: text,
              url: url,
              prevUrl: prevUrl,
              nextUrl: nextUrl
            });
            _context.next = 6;
            return db.write();

          case 6:
            _context.next = 8;
            return db.read();

          case 8:
            addedNewsletter = db.data.newsletters.shift();
            return _context.abrupt("return", addedNewsletter);

          case 10:
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

            return _context2.abrupt("return", storedNewsletters.shift());

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

export function getDateFromLatestInArchive() {
  return _getDateFromLatestInArchive.apply(this, arguments);
}

function _getDateFromLatestInArchive() {
  _getDateFromLatestInArchive = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3() {
    var newsletters, storedNewsletters, date;
    return _regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return db.read();

          case 2:
            db.data || (db.data = {
              newsletters: []
            });
            newsletters = db.data.newsletters;
            storedNewsletters = newsletters.sort(function (a, b) {
              return new Date(b.date) - new Date(a.date);
            });
            date = storedNewsletters.shift().date; //_logger.info({dateLatestInArchive:date, dirname:__dirname })

            return _context3.abrupt("return", date);

          case 7:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _getDateFromLatestInArchive.apply(this, arguments);
}