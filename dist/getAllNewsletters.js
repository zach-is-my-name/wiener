#!/usr/bin/env node
import _asyncToGenerator from "@babel/runtime/helpers/asyncToGenerator";
import _regeneratorRuntime from "@babel/runtime/regenerator";

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

import chalk from 'chalk';
import url from 'url';
import Crawler from 'crawler';
import fs from 'fs';
import { convertAndStore } from './convert1.js';
import { getUrlOfNewsletter, getNewsletterFromDate, fetchDateFromCurrentNewsletter, getDateFromNewsletter, fetchNewsletterFromDate, fetchPreceedingDateOfCurrentNewsletter, subsequentDate } from './utilities.js'; //import {updateForwardFromNewest} from './updateForwardFromNewest.js'

import dayjs from 'dayjs';
import path from 'path';
import duration from 'dayjs/plugin/duration.js';
dayjs.extend(duration);
var methods = ['log', 'warn', 'error'];
methods.forEach(function (methodName) {
  var originalMethod = console[methodName];

  console[methodName] = function () {
    var initiator = 'unknown place';

    try {
      throw new Error();
    } catch (e) {
      if (typeof e.stack === 'string') {
        var isFirst = true;

        var _iterator = _createForOfIteratorHelper(e.stack.split('\n')),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var line = _step.value;
            var matches = line.match(/^\s+at\s+(.*)/);

            if (matches) {
              if (!isFirst) {
                // first line - current function
                // second line - caller (what we are looking for)
                initiator = matches[1];
                break;
              }

              isFirst = false;
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      }
    }

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    originalMethod.apply(console, [].concat(args, ['\n', chalk.ansi256(237).dim("at ".concat(initiator))]));
  };
});
export function getAll() {
  return _getAll.apply(this, arguments);
}

function _getAll() {
  _getAll = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee4() {
    var errorCount, pass, loopGlobal, _loop, debugFile, currentDateNewsletters, sortFiles, _sortFiles, currentNewsletterDate;

    return _regeneratorRuntime.wrap(function _callee4$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _sortFiles = function _sortFiles3() {
              _sortFiles = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3(files) {
                return _regeneratorRuntime.wrap(function _callee3$(_context4) {
                  while (1) {
                    switch (_context4.prev = _context4.next) {
                      case 0:
                        return _context4.abrupt("return", files.sort(function (a, b) {
                          return new Date(b) - new Date(a);
                        }));

                      case 1:
                      case "end":
                        return _context4.stop();
                    }
                  }
                }, _callee3);
              }));
              return _sortFiles.apply(this, arguments);
            };

            sortFiles = function _sortFiles2(_x) {
              return _sortFiles.apply(this, arguments);
            };

            console.log("starting");
            errorCount = 0;
            pass = 0;
            _loop = /*#__PURE__*/_regeneratorRuntime.mark(function _loop() {
              var dateBeforeCurrent, storedNewsletters, dateGaps, gapNotNext, _iterator4, _step4, obj;

              return _regeneratorRuntime.wrap(function _loop$(_context3) {
                while (1) {
                  switch (_context3.prev = _context3.next) {
                    case 0:
                      pass++;
                      console.log("Iteration: ", pass); //if (pass >= 5) break

                      _context3.next = 4;
                      return fetchPreceedingDateOfCurrentNewsletter();

                    case 4:
                      dateBeforeCurrent = _context3.sent;
                      storedNewsletters = fs.readdirSync('./archive/markdownNewsletters/freshTest').sort(function (a, b) {
                        return new Date(b) - new Date(a);
                      });
                      console.log({
                        storedNewsletters: storedNewsletters
                      });

                      if (Boolean(storedNewsletters.find(function (file) {
                        return file === '8-28-2016';
                      }))) {
                        _context3.next = 13;
                        break;
                      }

                      _context3.t0 = storedNewsletters;
                      _context3.next = 11;
                      return fetchNewsletterFromDate('8-28-2016');

                    case 11:
                      _context3.t1 = _context3.sent;

                      _context3.t0.unshift.call(_context3.t0, _context3.t1);

                    case 13:
                      if (Boolean(storedNewsletters.find(function (file) {
                        return file === dateBeforeCurrent;
                      }))) {
                        _context3.next = 19;
                        break;
                      }

                      _context3.t2 = storedNewsletters;
                      _context3.next = 17;
                      return fetchNewsletterFromDate(dateBeforeCurrent);

                    case 17:
                      _context3.t3 = _context3.sent;

                      _context3.t2.unshift.call(_context3.t2, _context3.t3);

                    case 19:
                      dateGaps = storedNewsletters.map(function (element, index, array) {
                        return {
                          firstDate: element,
                          secondDate: array[index + 1],
                          spread: dayjs.duration(dayjs(element).diff(dayjs(array[index + 1]))).asDays()
                        };
                      }).filter(function (element) {
                        return element.spread >= 7;
                      });
                      console.log({
                        dateGaps: dateGaps
                      });

                      if (!dateGaps.length) {
                        _context3.next = 49;
                        break;
                      }

                      gapNotNext = dateGaps.filter(function (gapObj, index, array) {
                        var debug = {
                          index: index,
                          array: array
                        };
                        var next = subsequentDate(gapObj.secondDate, gapObj.secondDate);
                        var files = fs.readdirSync('./archive/markdownNewsletters/freshTest');
                        var sortedFiles = files.sort(function (a, b) {
                          return new Date(b) - new Date(a);
                        });
                        var nextInArchive = files.includes(next);
                        return gapObj.firstDate && gapObj.secondDate && gapObj.firstDate !== next && !nextInArchive;
                      });
                      loopGlobal = gapNotNext;
                      console.log({
                        gapNotNext: gapNotNext
                      });

                      if (!gapNotNext.length) {
                        _context3.next = 49;
                        break;
                      }

                      _iterator4 = _createForOfIteratorHelper(gapNotNext);
                      _context3.prev = 27;

                      _iterator4.s();

                    case 29:
                      if ((_step4 = _iterator4.n()).done) {
                        _context3.next = 41;
                        break;
                      }

                      obj = _step4.value;
                      _context3.prev = 31;
                      _context3.next = 34;
                      return fetchNewsletterFromDate(subsequentDate(obj.secondDate), false);

                    case 34:
                      _context3.next = 39;
                      break;

                    case 36:
                      _context3.prev = 36;
                      _context3.t4 = _context3["catch"](31);
                      throw new Error("problem fetching newsletter: ".concat(_context3.t4, " }"));

                    case 39:
                      _context3.next = 29;
                      break;

                    case 41:
                      _context3.next = 46;
                      break;

                    case 43:
                      _context3.prev = 43;
                      _context3.t5 = _context3["catch"](27);

                      _iterator4.e(_context3.t5);

                    case 46:
                      _context3.prev = 46;

                      _iterator4.f();

                      return _context3.finish(46);

                    case 49:
                    case "end":
                      return _context3.stop();
                  }
                }
              }, _loop, null, [[27, 43, 46, 49], [31, 36]]);
            });

          case 6:
            return _context5.delegateYield(_loop(), "t0", 7);

          case 7:
            if (loopGlobal.length) {
              _context5.next = 6;
              break;
            }

          case 8:
            currentDateNewsletters = fs.readdir('./archive/markdownNewsletters/currentNewsletters', function (err, files) {
              if (!err) {
                return sortFiles(files);
              } else {
                console.log(err);
              }
            });
            _context5.next = 11;
            return fetchDateFromCurrentNewsletter();

          case 11:
            currentNewsletterDate = _context5.sent;
            (function () {
              var _handleResidualCurrentNewsletters = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
                var notCurrent, i, _iterator2, _step2, file, _iterator3, _step3, _file;

                return _regeneratorRuntime.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        notCurrent = currentDateNewsletters.filter(function (date) {
                          return date !== currentNewsletterDate;
                        });

                        if (!notCurrent.length) {
                          _context.next = 30;
                          break;
                        }

                        _iterator2 = _createForOfIteratorHelper(notCurrent);
                        _context.prev = 3;

                        _iterator2.s();

                      case 5:
                        if ((_step2 = _iterator2.n()).done) {
                          _context.next = 18;
                          break;
                        }

                        file = _step2.value;
                        i++;
                        _context.prev = 8;
                        _context.next = 11;
                        return fetchNewsletterFromDate(file);

                      case 11:
                        _context.next = 16;
                        break;

                      case 13:
                        _context.prev = 13;
                        _context.t0 = _context["catch"](8);
                        throw new Error("problem fetching newsletter: ");

                      case 16:
                        _context.next = 5;
                        break;

                      case 18:
                        _context.next = 23;
                        break;

                      case 20:
                        _context.prev = 20;
                        _context.t1 = _context["catch"](3);

                        _iterator2.e(_context.t1);

                      case 23:
                        _context.prev = 23;

                        _iterator2.f();

                        return _context.finish(23);

                      case 26:
                        if (!(i !== notCurrent.length)) {
                          _context.next = 28;
                          break;
                        }

                        throw new Error("did not fetch all notCurrent", {
                          notCurrent: notCurrent
                        });

                      case 28:
                        _iterator3 = _createForOfIteratorHelper(notCurrent);

                        try {
                          for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
                            _file = _step3.value;
                            fs.unlinkSync(_file);
                          }
                        } catch (err) {
                          _iterator3.e(err);
                        } finally {
                          _iterator3.f();
                        }

                      case 30:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee, null, [[3, 20, 23, 26], [8, 13]]);
              }));

              function handleResidualCurrentNewsletters() {
                return _handleResidualCurrentNewsletters.apply(this, arguments);
              }

              return handleResidualCurrentNewsletters;
            })()()( /*#__PURE__*/function () {
              var _handleActualCurrentNewsletter = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2() {
                return _regeneratorRuntime.wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        fs.promises.readdir('./archive/markdownNewsletters/currentNewsletters').then(function (array) {
                          if (array.length !== 0) throw new Error("did not delete all currentNewsletters");
                        });

                        if (currentDateNewsletters.includes(currentNewsletterDate)) {
                          _context2.next = 4;
                          break;
                        }

                        _context2.next = 4;
                        return fetchNewsletterFromDate(currentNewsletterDate, true);

                      case 4:
                      case "end":
                        return _context2.stop();
                    }
                  }
                }, _callee2);
              }));

              function handleActualCurrentNewsletter() {
                return _handleActualCurrentNewsletter.apply(this, arguments);
              }

              return handleActualCurrentNewsletter;
            }())();

          case 13:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee4);
  }));
  return _getAll.apply(this, arguments);
}

process.on('unhandledRejection', function (error) {
  // Will print "unhandledRejection err is not defined"
  console.log('unhandledRejection', error);
});
getAll();

function finder() {
  var storedNewsletters = fs.readdirSync('./archive/markdownNewsletters/freshTest').sort(function (a, b) {
    return new Date(b) - new Date(a);
  });
  console.log({
    storedNewsletters: storedNewsletters,
    conditional: storedNewsletters.find(function (file) {
      return file === '8-28-2016';
    })
  });
} //finder()