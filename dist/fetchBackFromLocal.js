#!/usr/bin/env node
import _asyncToGenerator from "@babel/runtime/helpers/asyncToGenerator";
import _regeneratorRuntime from "@babel/runtime/regenerator";
import chalk from 'chalk';
import url from 'url';
import Crawler from 'crawler';
import fs from 'fs';
import { convertAndStore } from './convert1.js';
import { getUrlOfNewsletter, getNewsletterFromDate, getDateFromNewsletter } from './utilities.js';
/*
(function sorted() {
  const storedNewsletters = fs.readdirSync('./archive/markdownNewsletters/freshTest').sort((a, b) => new Date(b) - new Date(a))
  console.log(storedNewsletters.slice())
  console.log(storedNewsletters.slice().shift())
})()
*/

export function checkAndFetchBackFromLatest() {
  return _checkAndFetchBackFromLatest.apply(this, arguments);
}

function _checkAndFetchBackFromLatest() {
  _checkAndFetchBackFromLatest = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3() {
    var storedNewsletters, urlNewestInArchive, count, updateCrawler;
    return _regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            storedNewsletters = fs.readdirSync('./archive/markdownNewsletters/freshTest').sort(function (a, b) {
              return new Date(b) - new Date(a);
            });
            _context3.t0 = getUrlOfNewsletter;
            _context3.next = 4;
            return getNewsletterFromDate(storedNewsletters.slice().shift());

          case 4:
            _context3.t1 = _context3.sent;
            urlNewestInArchive = (0, _context3.t0)(_context3.t1);
            count = 0;
            updateCrawler = new Crawler({
              rateLimit: 2500,
              callback: function () {
                var _callback = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(error, res, done) {
                  var _newsletterInArchiveA, $, newsletterDate, newsletterInArchiveArray, prevUrl;

                  return _regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                      switch (_context2.prev = _context2.next) {
                        case 0:
                          if (!error) {
                            _context2.next = 4;
                            break;
                          }

                          console.log(error);
                          _context2.next = 19;
                          break;

                        case 4:
                          $ = res.$;
                          _context2.next = 7;
                          return getDateFromNewsletter($.html());

                        case 7:
                          newsletterDate = _context2.sent;
                          console.log({
                            newsletterDate: newsletterDate
                          });
                          console.log("Count: ", count);
                          count++;
                          newsletterInArchiveArray = storedNewsletters.find(function (fileName) {
                            return fileName === newsletterDate;
                          });

                          if ((_newsletterInArchiveA = newsletterInArchiveArray) !== null && _newsletterInArchiveA !== void 0 && _newsletterInArchiveA.length) {
                            console.log("".concat(newsletterDate, " In archive? ").concat(chalk.green('YES')));
                          }

                          if (!newsletterInArchiveArray) {
                            console.log("".concat(newsletterDate, " In archive?: ").concat(chalk.red('NO')));
                          }

                          if (newsletterInArchiveArray) {
                            _context2.next = 17;
                            break;
                          }

                          _context2.next = 17;
                          return convertAndStore($.html());

                        case 17:
                          prevUrl = $('.nav-previous').children('a').attr('href');

                          if (prevUrl) {
                            updateCrawler.queue([{
                              uri: prevUrl,
                              rateLimit: 2500,
                              callback: function () {
                                var _callback2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(error, res, done) {
                                  var _newsletterInArchiveA2, _$, _newsletterDate, _prevUrl;

                                  return _regeneratorRuntime.wrap(function _callee$(_context) {
                                    while (1) {
                                      switch (_context.prev = _context.next) {
                                        case 0:
                                          if (!error) {
                                            _context.next = 4;
                                            break;
                                          }

                                          console.log(error);
                                          _context.next = 16;
                                          break;

                                        case 4:
                                          _$ = res.$;
                                          _context.next = 7;
                                          return getDateFromNewsletter(_$.html());

                                        case 7:
                                          _newsletterDate = _context.sent;
                                          newsletterInArchiveArray = storedNewsletters.find(function (fileName) {
                                            return fileName === _newsletterDate;
                                          });

                                          if ((_newsletterInArchiveA2 = newsletterInArchiveArray) !== null && _newsletterInArchiveA2 !== void 0 && _newsletterInArchiveA2.length) {
                                            console.log("".concat(_newsletterDate, " In archive? ").concat(chalk.green('YES')));
                                          }

                                          if (!newsletterInArchiveArray) {
                                            console.log("".concat(_newsletterDate, " In archive?: ").concat(chalk.red('NO')));
                                          }

                                          if (newsletterInArchiveArray) {
                                            _context.next = 14;
                                            break;
                                          }

                                          _context.next = 14;
                                          return convertAndStore(_$.html());

                                        case 14:
                                          _prevUrl = _$('.nav-previous').children('a').attr('href');

                                          if (_prevUrl) {
                                            updateCrawler.queue(_prevUrl);
                                          }

                                        case 16:
                                          done();

                                        case 17:
                                        case "end":
                                          return _context.stop();
                                      }
                                    }
                                  }, _callee);
                                }));

                                function callback(_x4, _x5, _x6) {
                                  return _callback2.apply(this, arguments);
                                }

                                return callback;
                              }()
                            }]);
                          }

                        case 19:
                          done();

                        case 20:
                        case "end":
                          return _context2.stop();
                      }
                    }
                  }, _callee2);
                }));

                function callback(_x, _x2, _x3) {
                  return _callback.apply(this, arguments);
                }

                return callback;
              }()
            });
            updateCrawler.queue(urlNewestInArchive);

          case 9:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _checkAndFetchBackFromLatest.apply(this, arguments);
}

checkAndFetchBackFromLatest();