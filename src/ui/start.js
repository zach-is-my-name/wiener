import blessed from 'neo-blessed';
import React from 'react'
import pkg from 'react-blessed';
import App from './components/App.js'
const { createBlessedRenderer } = pkg;
const render = createBlessedRenderer(blessed);
import https from 'https'
import fs from 'fs'
https.globalAgent.options.ca = fs.readFileSync('./certs/weekinethereumnews.com');


const screen = blessed.screen({
//  autoPadding: true,
  smartCSR: true,
  title: 'wiener',
  fullUnicode: true,
});

export function start (argObj) {
  render(<App  />, screen);
}

