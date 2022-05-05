import _asyncToGenerator from "@babel/runtime/helpers/asyncToGenerator";
import _regeneratorRuntime from "@babel/runtime/regenerator";
import chalk from 'chalk';
import url from 'url';
import Crawler from 'crawler';
import fs from 'fs';
import { convertAndStore } from './convert1.js';
import { getUrlOfNewsletter, getNewsletterFromDate, getDateFromNewsletter } from './utilities.js';
export function checkAndFetchForwardFromLatest() {
  return _checkAndFetchForwardFromLatest.apply(this, arguments);
}

function _checkAndFetchForwardFromLatest() {
  _checkAndFetchForwardFromLatest = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3() {
    var start, storedNewsletters, urlNewestInArchive, callbackOuter, _callbackOuter, crawler;

    return _regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _callbackOuter = function _callbackOuter3() {
              _callbackOuter = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(error, res, done) {
                var newsletterInArchive, _newsletterInArchive, $, newsletterDate, nextUrl;

                return _regeneratorRuntime.wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        if (!error) {
                          _context2.next = 4;
                          break;
                        }

                        console.log(error);
                        _context2.next = 15;
                        break;

                      case 4:
                        $ = res.$;
                        newsletterDate = getDateFromNewsletter($.html()); //console.log(`${newsletterDate} is ${chalk.blue(res.statusCode)}`) 

                        if (res.statusCode !== 200) {
                          console.log(res.body);
                        }

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
                          _context2.next = 13;
                          break;
                        }

                        _context2.next = 13;
                        return convertAndStore($.html());

                      case 13:
                        nextUrl = $('.nav-next').children('a').attr('href');

                        if (nextUrl) {
                          crawler.queue([{
                            uri: nextUrl,
                            rateLimit: 2500,
                            callback: function () {
                              var _callback = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(error, res, done) {
                                var _newsletterInArchive2, _$, _newsletterDate, _nextUrl;

                                return _regeneratorRuntime.wrap(function _callee$(_context) {
                                  while (1) {
                                    switch (_context.prev = _context.next) {
                                      case 0:
                                        console.log("callback inner");

                                        if (!error) {
                                          _context.next = 5;
                                          break;
                                        }

                                        console.log(error);
                                        _context.next = 15;
                                        break;

                                      case 5:
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
                                          _context.next = 13;
                                          break;
                                        }

                                        _context.next = 13;
                                        return convertAndStore(_$.html());

                                      case 13:
                                        _nextUrl = _$('.nav-next').children('a').attr('href');

                                        if (_nextUrl) {
                                          crawler.queue(_nextUrl);
                                        }

                                      case 15:
                                        done();

                                      case 16:
                                      case "end":
                                        return _context.stop();
                                    }
                                  }
                                }, _callee);
                              }));

                              function callback(_x4, _x5, _x6) {
                                return _callback.apply(this, arguments);
                              }

                              return callback;
                            }()
                          }]);
                        }

                      case 15:
                        done();
                        console.log("checkAndGetForwardFromLatest() complete");

                      case 17:
                      case "end":
                        return _context2.stop();
                    }
                  }
                }, _callee2);
              }));
              return _callbackOuter.apply(this, arguments);
            };

            callbackOuter = function _callbackOuter2(_x, _x2, _x3) {
              return _callbackOuter.apply(this, arguments);
            };

            console.log("Getting Forward from Latest");
            storedNewsletters = fs.readdirSync('./archive/markdownNewsletters/freshTest').sort(function (a, b) {
              return new Date(b) - new Date(a);
            });

            if (!storedNewsletters.length) {
              _context3.next = 12;
              break;
            }

            _context3.next = 7;
            return getUrlOfNewsletter(getNewsletterFromDate(storedNewsletters.slice().shift()));

          case 7:
            urlNewestInArchive = _context3.sent;
            console.log("newest in archive:", urlNewestInArchive);
            start = urlNewestInArchive;
            _context3.next = 13;
            break;

          case 12:
            start = 'https://weekinethereumnews.com';

          case 13:
            crawler = new Crawler({
              rateLimit: 2500,
              callback: callbackOuter
            });
            crawler.queue(start);

          case 15:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _checkAndFetchForwardFromLatest.apply(this, arguments);
}