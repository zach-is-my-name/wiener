import _asyncToGenerator from "@babel/runtime/helpers/asyncToGenerator";
import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import _regeneratorRuntime from "@babel/runtime/regenerator";
import { _logger } from '../../devLog/logger.js';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import rateLimit from 'axios-rate-limit';
import { loadNewsletterFromDb } from '../../db/db.js';
import { applyMarkdown } from '../../transform/applyMarkdown.js';
import { convertAndStore } from '../../transform/convert.js';
import { fetchDateFromHtml } from '../../utilities.js';
export function useGetWien(runHookString, dispatch, debugCount) {
  var _useState = useState(null),
      _useState2 = _slicedToArray(_useState, 2),
      newsletterObj = _useState2[0],
      setNewsletterObj = _useState2[1];

  useEffect(function () {
    dispatch({
      type: "debugAdd"
    });

    if (runHookString === "fetchLatest") {
      _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
        var http, _yield$http$get, data, date;

        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                http = rateLimit(axios.create(), {
                  maxRequests: 1,
                  perMilliseconds: 2500
                });
                _context.next = 3;
                return http.get('http://weekinethereumnews.com');

              case 3:
                _yield$http$get = _context.sent;
                data = _yield$http$get.data;
                date = convertAndStore(data);
                _context.t0 = setNewsletterObj;
                _context.next = 9;
                return loadNewsletterFromDb(date);

              case 9:
                _context.t1 = _context.sent;
                (0, _context.t0)(_context.t1);

              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    } else if (runHookString === "loadArchiveMostRecent") {
      _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2() {
        return _regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.t0 = setNewsletterObj;
                _context2.next = 3;
                return loadNewsletterFromDb("");

              case 3:
                _context2.t1 = _context2.sent;
                (0, _context2.t0)(_context2.t1);

              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }))();
    } else {
      _logger.info("loading", {
        pass: debugCount
      });
    }

    return function () {
      if (runHookString.length) dispatch({
        type: "getHook",
        payload: ""
      });
    };
  }, [runHookString]);

  if (newsletterObj && Object.keys(newsletterObj).length) {
    return newsletterObj;
  } else {
    return null;
  }
}