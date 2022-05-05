import _asyncToGenerator from "@babel/runtime/helpers/asyncToGenerator";
import _regeneratorRuntime from "@babel/runtime/regenerator";
import fs from 'fs';
import chalk from 'chalk';
import Crawler from 'crawler';
import { getUrlOfNewsletter, getNewsletterFromDate, getDateFromNewsletter, dateGaps } from './utilities.js';
export function updateBackFromOldest() {
  return _updateBackFromOldest.apply(this, arguments);
}

function _updateBackFromOldest() {
  _updateBackFromOldest = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3() {
    var start, storedNewsletters, urlOldestInArchive, crawler;
    return _regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            console.log("".concat(chalk.magenta('Getting Backwards from Oldest...')));
            storedNewsletters = fs.readdirSync('./archive/markdownNewsletters/freshTest').sort(function (a, b) {
              return new Date(b) - new Date(a);
            });

            if (storedNewsletters.length) {
              urlOldestInArchive = getUrlOfNewsletter(getNewsletterFromDate(storedNewsletters.slice().pop()));
              console.log("oldest in archive:", urlOldestInArchive);
              start = urlOldestInArchive;
            } else {
              start = 'https://weekinethereumnews.com';
            }

            crawler = new Crawler({
              rateLimit: 2500,
              callback: function () {
                var _callback = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(error, res, done) {
                  var newsletterInArchive, _newsletterInArchive, $, newsletterDate, prevUrl, arrayOfDateGapObjs;

                  return _regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                      switch (_context2.prev = _context2.next) {
                        case 0:
                          if (!error) {
                            _context2.next = 4;
                            break;
                          }

                          console.log(error);
                          _context2.next = 14;
                          break;

                        case 4:
                          $ = res.$;
                          newsletterDate = getDateFromNewsletter($.html());
                          newsletterInArchive = storedNewsletters.find(function (fileName) {
                            return fileName === newsletterDate;
                          });

                          if ((_newsletterInArchive = newsletterInArchive) !== null && _newsletterInArchive !== void 0 && _newsletterInArchive.length) {
                            console.log("".concat(newsletterDate, " In archive? ").concat(chalk.green('YES')));
                          }

                          if (!newsletterInArchive) {
                            console.log("".concat(newsletterDate, " In archive?: ").concat(chalk.red('NO')));
                          }

                          if (newsletterInArchive) {
                            _context2.next = 12;
                            break;
                          }

                          _context2.next = 12;
                          return convertAndStore($.html());

                        case 12:
                          prevUrl = $('.nav-previous').children('a').attr('href');

                          if (prevUrl) {
                            crawler.queue([{
                              uri: prevUrl,
                              rateLimit: 2500,
                              callback: function () {
                                var _callback2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(error, res, done) {
                                  var _newsletterInArchive2, _$, _newsletterDate, _prevUrl;

                                  return _regeneratorRuntime.wrap(function _callee$(_context) {
                                    while (1) {
                                      switch (_context.prev = _context.next) {
                                        case 0:
                                          if (!error) {
                                            _context.next = 4;
                                            break;
                                          }

                                          console.log(error);
                                          _context.next = 14;
                                          break;

                                        case 4:
                                          _$ = res.$;
                                          _newsletterDate = getDateFromNewsletter(_$.html());
                                          newsletterInArchive = storedNewsletters.find(function (fileName) {
                                            return fileName === _newsletterDate;
                                          });

                                          if ((_newsletterInArchive2 = newsletterInArchive) !== null && _newsletterInArchive2 !== void 0 && _newsletterInArchive2.length) {
                                            console.log("".concat(_newsletterDate, " In archive? ").concat(chalk.green('YES')));
                                          }

                                          if (!newsletterInArchive) {
                                            console.log("".concat(_newsletterDate, " In archive?: ").concat(chalk.red('NO')));
                                          }

                                          if (newsletterInArchive) {
                                            _context.next = 12;
                                            break;
                                          }

                                          _context.next = 12;
                                          return convertAndStore(_$.html());

                                        case 12:
                                          _prevUrl = _$('.nav-previous').children('a').attr('href');

                                          if (_prevUrl) {
                                            crawler.queue(_prevUrl);
                                          }

                                        case 14:
                                          done();

                                        case 15:
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

                        case 14:
                          done();
                          arrayOfDateGapObjs = dateGaps();

                          if (arrayOfDateGapObjs.length) {
                            arrayOfDateGapObjs.forEach(function (dateGapObj) {
                              return getForwardFromDate(dateGapObj.b);
                            });
                          }

                          console.log("COMPLETE");

                        case 18:
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
            crawler.queue(start);

          case 5:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _updateBackFromOldest.apply(this, arguments);
}