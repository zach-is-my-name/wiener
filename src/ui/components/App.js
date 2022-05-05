import React from 'react';
 
import https from 'https'
import fs from 'fs'
https.globalAgent.options.ca = fs.readFileSync('./certs/weekinethereumnews.com');
import blessed from 'neo-blessed';
import pkg from 'react-blessed';
const { createBlessedRenderer } = pkg;
import {argObj} from '../index.js'
const render = createBlessedRenderer(blessed);
import MainBox from './MainBox.js' 


function App() {
  return (
      <MainBox  />
)
}

const screen = blessed.screen({
//  autoPadding: true,
  smartCSR: true,
  title: 'wiener',
  fullUnicode: true,
});

function start(argObj) {
  render(<App argObj={argObj} />, screen);
}

export {start}
