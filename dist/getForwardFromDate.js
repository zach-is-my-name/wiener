import _asyncToGenerator from "@babel/runtime/helpers/asyncToGenerator";
import _regeneratorRuntime from "@babel/runtime/regenerator";
import { getUrlOfNewsletter, getNewsletterFromDate, getDateFromNewsletter, getPermaLinkFowardFromPage } from './utilities.js';
import { convertAndStore } from './convert1.js';
import Crawler from 'crawler';
export function getForwardFromDate(_x) {
  return _getForwardFromDate.apply(this, arguments);
}

function _getForwardFromDate() {
  _getForwardFromDate = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3(startDate) {
    var newsletterFromDate, startDateUrl, crawledPreviousGlobal, crawler;
    return _regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            newsletterFromDate = getNewsletterFromDate(startDate);
            startDateUrl = getUrlOfNewsletter(newsletterFromDate);
            crawler = new Crawler({
              rateLimit: 2500,
              callback: function () {
                var _callback = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(error, res, done) {
                  var $, nextUrl;
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
                          console.log("Scanning... ", res.request.uri);
                          $ = res.$;
                          nextUrl = $('a[rel=next]').attr('href');

                          if (!nextUrl) {
                            _context2.next = 11;
                            break;
                          }

                          crawler.queue([{
                            uri: nextUrl,
                            callback: function () {
                              var _callback2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(error, res, done) {
                                var _$, _nextUrl;

                                return _regeneratorRuntime.wrap(function _callee$(_context) {
                                  while (1) {
                                    switch (_context.prev = _context.next) {
                                      case 0:
                                        if (!error) {
                                          _context.next = 4;
                                          break;
                                        }

                                        console.log(error);
                                        _context.next = 10;
                                        break;

                                      case 4:
                                        console.log("Scanning... ", res.request.uri); //crawledPreviousGlobal = true 

                                        _$ = res.$;
                                        _context.next = 8;
                                        return convertAndStore(_$.html());

                                      case 8:
                                        _nextUrl = _$('a[rel=next]').attr('href');

                                        if (_nextUrl) {
                                          crawler.queue(_nextUrl);
                                        }

                                      case 10:
                                        done();

                                      case 11:
                                      case "end":
                                        return _context.stop();
                                    }
                                  }
                                }, _callee);
                              }));

                              function callback(_x5, _x6, _x7) {
                                return _callback2.apply(this, arguments);
                              }

                              return callback;
                            }()
                          }]);
                          _context2.next = 15;
                          break;

                        case 11:
                          if (!(!nextUrl && crawledPreviousGlobal)) {
                            _context2.next = 15;
                            break;
                          }

                          _context2.next = 14;
                          return convertAndStore($.html());

                        case 14:
                          crawledPreviousGlobal = false;

                        case 15:
                          done();

                        case 16:
                        case "end":
                          return _context2.stop();
                      }
                    }
                  }, _callee2);
                }));

                function callback(_x2, _x3, _x4) {
                  return _callback.apply(this, arguments);
                }

                return callback;
              }()
            });
            crawler.queue(startDateUrl);

          case 4:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _getForwardFromDate.apply(this, arguments);
}