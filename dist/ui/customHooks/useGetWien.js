import _asyncToGenerator from "@babel/runtime/helpers/asyncToGenerator";
import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import _regeneratorRuntime from "@babel/runtime/regenerator";
import React, { useEffect, useState } from 'react';
import got from 'got';
import cheerio from 'cheerio';
import { loadNewsletterFromDb } from '../../db/db.js';
import { convertAndStore } from '../../transform/convert.js';
import { fetchPermaLinkCurrent } from '../../utilities.js';
export function useGetWien(loadState, ctrDispatch, hasLatestInArchive, hasInternet, dateFromSearch, setDateFromSearch, dateLatestPub) {
  var _useState = useState(null),
    _useState2 = _slicedToArray(_useState, 2),
    newsletterObj = _useState2[0],
    setNewsletterObj = _useState2[1];
  var _useState3 = useState(null),
    _useState4 = _slicedToArray(_useState3, 2),
    adjacentDates = _useState4[0],
    setAdjacentDates = _useState4[1];
  useEffect(function () {
    var _adjacentDates$nextUr, _adjacentDates$prevUr;
    if (loadState === "fetchLatest") {
      _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
        var data, _url, $, url, prevUrl, nextUrl, nlo;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return fetchPermaLinkCurrent();
            case 3:
              _url = _context.sent;
              _context.next = 6;
              return got(_url).text();
            case 6:
              data = _context.sent;
              _context.next = 13;
              break;
            case 9:
              _context.prev = 9;
              _context.t0 = _context["catch"](0);
              console.trace();
              return _context.abrupt("return");
            case 13:
              $ = cheerio.load(data);
              url = $('link[rel="canonical"]').attr('href');
              prevUrl = $('.nav-previous').children('a').attr('href');
              nextUrl = $('.nav-next').children('a').attr('href');
              !nextUrl ? nextUrl = "" : nextUrl = nextUrl;
              setAdjacentDates({
                prevUrl: prevUrl,
                nextUrl: nextUrl
              });
              _context.next = 21;
              return convertAndStore(data, url, prevUrl, nextUrl);
            case 21:
              nlo = _context.sent;
              setNewsletterObj(nlo);
              ctrDispatch({
                type: "loadedFromFetchLatest"
              });
            case 24:
            case "end":
              return _context.stop();
          }
        }, _callee, null, [[0, 9]]);
      }))();
    } else if (loadState === "getArchiveMostRecent") {
      _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2() {
        var nlo, prevUrl, nextUrl;
        return _regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return loadNewsletterFromDb("first");
            case 2:
              nlo = _context2.sent;
              if (nlo === "none") {
                ctrDispatch({
                  type: "none"
                });
              } else {
                if (nlo !== null && nlo !== void 0 && nlo.prevUrl) {
                  prevUrl = nlo.prevUrl;
                } else {
                  prevUrl = null;
                }
                if (nlo !== null && nlo !== void 0 && nlo.nextUrl) {
                  nextUrl = nlo.nextUrl;
                } else {
                  nextUrl = null;
                }
                setAdjacentDates({
                  prevUrl: prevUrl,
                  nextUrl: nextUrl
                });
                setNewsletterObj(nlo);
                ctrDispatch({
                  type: "loadedFromGetArchiveMostRecent"
                });
              }
            case 4:
            case "end":
              return _context2.stop();
          }
        }, _callee2);
      }))();
    } else if (loadState === "loadNextHook" && adjacentDates !== null && adjacentDates !== void 0 && (_adjacentDates$nextUr = adjacentDates.nextUrl) !== null && _adjacentDates$nextUr !== void 0 && _adjacentDates$nextUr.length) {
      _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3() {
        var nlo;
        return _regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return loadNewsletterFromDb("url", adjacentDates.nextUrl);
            case 2:
              nlo = _context3.sent;
              if (nlo.prevUrl.length) {
                _context3.next = 6;
                break;
              }
              ctrDispatch({
                type: "setPopUpMessage",
                payload: "Missing some newsletter data (prevUrl date)..."
              });
              return _context3.abrupt("return");
            case 6:
              setAdjacentDates({
                prevUrl: nlo.prevUrl,
                nextUrl: nlo.nextUrl
              });
              setNewsletterObj(nlo);
              ctrDispatch({
                type: "loadedFromNextButton"
              });
            case 9:
            case "end":
              return _context3.stop();
          }
        }, _callee3);
      }))();
    } else if (loadState === "loadNextHook" && newsletterObj.date === dateLatestPub) {
      ctrDispatch({
        type: "setPopUpMessage",
        payload: "Already at most recent published"
      });
      return;
    } else if (loadState === "loadPrevHook" && adjacentDates !== null && adjacentDates !== void 0 && (_adjacentDates$prevUr = adjacentDates.prevUrl) !== null && _adjacentDates$prevUr !== void 0 && _adjacentDates$prevUr.length) {
      _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee4() {
        var nlo;
        return _regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return loadNewsletterFromDb("url", adjacentDates.prevUrl);
            case 2:
              nlo = _context4.sent;
              if (!(nlo.nextUrl.length === 0)) {
                _context4.next = 8;
                break;
              }
              ctrDispatch({
                type: "setPopUpMessage",
                payload: "Missing some newsletter data (nextUrl date)"
              });
              return _context4.abrupt("return");
            case 8:
              setAdjacentDates({
                prevUrl: nlo.prevUrl,
                nextUrl: nlo.nextUrl
              });
              setNewsletterObj(nlo);
              ctrDispatch({
                type: "loadedFromBackButton"
              });
            case 11:
            case "end":
              return _context4.stop();
          }
        }, _callee4);
      }))();
    } else if (loadState === 'loadFromSearch' && dateFromSearch !== null && dateFromSearch !== void 0 && dateFromSearch.length) {
      _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee5() {
        var nlo;
        return _regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return loadNewsletterFromDb("date", dateFromSearch);
            case 2:
              nlo = _context5.sent;
              if (nlo.date.length) {
                _context5.next = 5;
                break;
              }
              throw new Error();
            case 5:
              setAdjacentDates({
                prevUrl: nlo.prevUrl,
                nextUrl: nlo.nextUrl
              });
              setNewsletterObj(nlo);
              setDateFromSearch("");
              ctrDispatch({
                type: "loadedFromSearch"
              });
            case 9:
            case "end":
              return _context5.stop();
          }
        }, _callee5);
      }))();
    } else if (loadState === "gotoLatestInArchive") {
      _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee6() {
        var nlo;
        return _regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return loadNewsletterFromDb("first");
            case 2:
              nlo = _context6.sent;
              setAdjacentDates({
                prevUrl: nlo.prevUrl,
                nextUrl: nlo.nextUrl
              });
              setNewsletterObj(nlo);
              ctrDispatch({
                type: "loadedFromGotoLatest"
              });
            case 6:
            case "end":
              return _context6.stop();
          }
        }, _callee6);
      }))();
    }
  }, [loadState, dateFromSearch]);
  return newsletterObj;
}
//# sourceMappingURL=useGetWien.js.map