import _asyncToGenerator from "@babel/runtime/helpers/asyncToGenerator";
import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import _regeneratorRuntime from "@babel/runtime/regenerator";
import React, { useEffect, useState } from 'react';
import { getDateLatestInArchive } from '../../db/db.js';
import { fetchDateCurrent, parseDate } from '../../utilities.js';
import { getArchiveLength } from '../../db/db.js';
export function useHasLatestInArchive(hasInternet, loadState) {
  var _useState = useState("loading"),
    _useState2 = _slicedToArray(_useState, 2),
    hasLatestInArchive = _useState2[0],
    setHasLatestInArchive = _useState2[1];
  var _useState3 = useState(null),
    _useState4 = _slicedToArray(_useState3, 2),
    dateLatestPub = _useState4[0],
    setDateLatestPub = _useState4[1];
  var _useState5 = useState(null),
    _useState6 = _slicedToArray(_useState5, 2),
    dateNumberFormat = _useState6[0],
    setDateNumberFormat = _useState6[1];
  var _useState7 = useState(null),
    _useState8 = _slicedToArray(_useState7, 2),
    dateWordFormat = _useState8[0],
    setDateWordFormat = _useState8[1];
  var _useState9 = useState(null),
    _useState10 = _slicedToArray(_useState9, 2),
    archiveLength = _useState10[0],
    setArchiveLength = _useState10[1];
  useEffect(function () {
    _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
      var _yield$fetchDateCurre, dateWordFormat, dateNumberFormat;
      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return fetchDateCurrent();
          case 2:
            _yield$fetchDateCurre = _context.sent;
            dateWordFormat = _yield$fetchDateCurre.dateWordFormat;
            dateNumberFormat = _yield$fetchDateCurre.dateNumberFormat;
            setDateWordFormat(dateWordFormat);
            setDateNumberFormat(dateNumberFormat);
            setDateLatestPub(dateNumberFormat);
          case 8:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }))();
  }, [dateNumberFormat, dateWordFormat]);
  useEffect(function () {
    if (hasLatestInArchive !== true) {
      _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2() {
        return _regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _context2.t0 = setArchiveLength;
              _context2.next = 3;
              return getArchiveLength();
            case 3:
              _context2.t1 = _context2.sent;
              (0, _context2.t0)(_context2.t1);
            case 5:
            case "end":
              return _context2.stop();
          }
        }, _callee2);
      }))();
    }
  }, [loadState]);
  useEffect(function () {
    if (hasLatestInArchive !== true && hasInternet === true) {
      _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3() {
        var latestArchiveDate, parsedLatestArchiveDate, parsedDateNumberFormat, hasLatestBool;
        return _regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return getDateLatestInArchive();
            case 2:
              latestArchiveDate = _context3.sent;
              if (Array.isArray(latestArchiveDate) && latestArchiveDate.length === 0) setHasLatestInArchive(false);
              parsedLatestArchiveDate = parseDate(latestArchiveDate);
              parsedDateNumberFormat = parseDate(dateNumberFormat);
              if (parsedLatestArchiveDate && parsedDateNumberFormat) {
                hasLatestBool = Boolean(dateNumberFormat === latestArchiveDate);
                setHasLatestInArchive(hasLatestBool);
              }
            case 7:
            case "end":
              return _context3.stop();
          }
        }, _callee3);
      }))();
    }
  }, [hasInternet, dateNumberFormat, hasLatestInArchive, archiveLength]);
  return {
    hasLatestInArchive: hasLatestInArchive,
    dateLatestPub: dateLatestPub
  };
}
//# sourceMappingURL=useHasLatestInArchive.js.map