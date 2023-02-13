import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import cliTruncate from 'cli-truncate';
import fs from 'fs';
import chalk from 'chalk';
import stripAnsi from 'strip-ansi';
import Fuse from 'fuse.js';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
var __dirname = dirname(fileURLToPath(import.meta.url)); //production db file
var file = join(__dirname, 'db.json');
var adapter = new JSONFile(file);
var db = new Low(adapter);
await db.read();
export function useSearchWien(textBoxInput, setItems, setDateIndex) {
  var _db$data;
  var options = {
    includeMatches: true,
    findAllMatches: true,
    minMatchCharLength: 3,
    threshold: 0.2,
    ignoreLocation: true,
    shouldSort: false,
    keys: ['text']
  };
  var newsletters;
  if ((_db$data = db.data) !== null && _db$data !== void 0 && _db$data.newsletters && db.data.newsletters.length) {
    newsletters = db.data.newsletters;
  } else {
    newsletters = [];
  }
  var index = Fuse.createIndex(options.keys, newsletters);
  var fuse = new Fuse(newsletters, options, index);
  var searchResults = fuse.search(textBoxInput) || [];
  setItems(searchResults.map(function (resObj, index) {
    return hlQueryMatch(resObj, index);
  }));
  setDateIndex(searchResults.map(function (resObj, index) {
    return {
      index: index,
      date: resObj.item.date,
      line: resObj.matches[0].value
    };
  }));
}
function hlQueryMatch(resObj, index) {
  var date = resObj.item.date;
  var value = resObj.matches[0].value;
  var indexStart, indexEnd, sliceEnd, fragment, hlFragment;
  value = cliTruncate(_stripAnsi(value).trim(), 70, {
    position: "end"
  });
  var _resObj$matches$0$ind = _slicedToArray(resObj.matches[0].indices[0], 2);
  indexStart = _resObj$matches$0$ind[0];
  indexEnd = _resObj$matches$0$ind[1];
  sliceEnd = indexEnd + 1;
  fragment = value.slice(indexStart, sliceEnd);
  hlFragment = chalk.bgAnsi256(103)(fragment);
  value = value.replace(fragment, hlFragment, value);
  return "".concat(date, ":  ").concat(value);
}
function _stripAnsi(string) {
  return stripAnsi(string);
}
function removeMdLinks(string, value, index) {
  return string.replace(/\[([^\[]+)\](\(.*\))/, '$1');
}
//# sourceMappingURL=useSearchWien.js.map