#!/usr/bin/env node
import _asyncToGenerator from "@babel/runtime/helpers/asyncToGenerator";
import _regeneratorRuntime from "@babel/runtime/regenerator";
import chalk from 'chalk';
import url from 'url';
import got from 'got';
import cheerio from 'cheerio';
import { convertAndStore } from '../transform/convert.js';
import { getDateFromNewsletter, fetchPermaLinkCurrent, throttledGot } from '../utilities.js';
import { loadNewsletterFromDb, replaceBlankNextUrl } from '../db/db.js';
var reqCount;
export function fetchBackFromLocalLatest(_x) {
  return _fetchBackFromLocalLatest.apply(this, arguments);
}
function _fetchBackFromLocalLatest() {
  _fetchBackFromLocalLatest = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(dateLatestPub) {
    var targetUrl, count, storedNewsletters, newsletterObj, writtenNewsletterObj, fetchAndAdd, _fetchAndAdd;
    return _regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _fetchAndAdd = function _fetchAndAdd3() {
            _fetchAndAdd = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(url) {
              var fetchedNewsletter, $, $url, prevUrl, nextUrl, storedNewsletterObj;
              return _regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) switch (_context.prev = _context.next) {
                  case 0:
                    if (!url) {
                      _context.next = 25;
                      break;
                    }
                    _context.prev = 1;
                    _context.next = 4;
                    return throttledGot(url);
                  case 4:
                    fetchedNewsletter = _context.sent;
                    _context.next = 10;
                    break;
                  case 7:
                    _context.prev = 7;
                    _context.t0 = _context["catch"](1);
                    console.trace();
                  case 10:
                    reqCount++;
                    if (!(typeof fetchedNewsletter !== 'string')) {
                      _context.next = 13;
                      break;
                    }
                    return _context.abrupt("return", new Error("error on fetched newsletter, value: ".concat(fetchedNewsletter)));
                  case 13:
                    $ = cheerio.load(fetchedNewsletter);
                    $url = $('link[rel="canonical"]').attr('href');
                    if (!($url !== url)) {
                      _context.next = 17;
                      break;
                    }
                    return _context.abrupt("return", new Error("url wrong! debug!"));
                  case 17:
                    prevUrl = $('.nav-previous').children('a').attr('href');
                    nextUrl = $('.nav-next').children('a').attr('href');
                    !nextUrl ? nextUrl = "" : nextUrl = nextUrl;
                    url === "https://weekinethereumnews.com/january-4-2019/" ? prevUrl = "https://weekinethereumnews.com/december-28-2018/" : prevUrl = prevUrl;
                    _context.next = 23;
                    return convertAndStore(fetchedNewsletter, url, prevUrl, nextUrl);
                  case 23:
                    storedNewsletterObj = _context.sent;
                    return _context.abrupt("return", storedNewsletterObj);
                  case 25:
                    return _context.abrupt("return");
                  case 26:
                  case "end":
                    return _context.stop();
                }
              }, _callee, null, [[1, 7]]);
            }));
            return _fetchAndAdd.apply(this, arguments);
          };
          fetchAndAdd = function _fetchAndAdd2(_x2) {
            return _fetchAndAdd.apply(this, arguments);
          };
          _context2.next = 4;
          return fetchPermaLinkCurrent();
        case 4:
          targetUrl = _context2.sent;
          count = -1;
        case 6:
          if (!targetUrl) {
            _context2.next = 23;
            break;
          }
          _context2.next = 9;
          return loadNewsletterFromDb("all");
        case 9:
          storedNewsletters = _context2.sent;
          count++;
          newsletterObj = storedNewsletters.find(function (obj) {
            return obj.url === targetUrl;
          });
          if (!newsletterObj) {
            _context2.next = 16;
            break;
          }
          targetUrl = newsletterObj.prevUrl;
          _context2.next = 20;
          break;
        case 16:
          _context2.next = 18;
          return fetchAndAdd(targetUrl);
        case 18:
          writtenNewsletterObj = _context2.sent;
          targetUrl = writtenNewsletterObj.prevUrl;
        case 20:
          count++;
          _context2.next = 6;
          break;
        case 23:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return _fetchBackFromLocalLatest.apply(this, arguments);
}
//# sourceMappingURL=fetchBackFromLocalLatest.js.map