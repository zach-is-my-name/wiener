import React from 'react';
import https from 'https';
import fs from 'fs';
https.globalAgent.options.ca = fs.readFileSync('./certs/weekinethereumnews.com');
import blessed from 'neo-blessed';
import pkg from 'react-blessed';
var createBlessedRenderer = pkg.createBlessedRenderer;
import { argObj } from '../index.js';
var render = createBlessedRenderer(blessed);
import MainBox from './MainBox.js';

function App() {
  return /*#__PURE__*/React.createElement(MainBox, null);
}

var screen = blessed.screen({
  //  autoPadding: true,
  smartCSR: true,
  title: 'wiener',
  fullUnicode: true
});

function start(argObj) {
  render( /*#__PURE__*/React.createElement(App, {
    argObj: argObj
  }), screen);
}

export { start };