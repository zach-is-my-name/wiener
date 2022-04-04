import React from 'react';
const https = require('https');
const fs = require('fs');
https.globalAgent.options.ca = fs.readFileSync('./certs/weekinethereumnews.com');
import blessed from 'neo-blessed';
import {createBlessedRenderer} from 'react-blessed';
import {argObj} from './index'
const render = createBlessedRenderer(blessed);


function App(props) {
  return  <MainBox ...props /> 
}

const screen = blessed.screen({
//  autoPadding: true,
  smartCSR: true,
  title: 'wiener',
  fullUnicode: true,
});

export function start(argObj) {
  render(<App argObj={argObj} />, screen);
}
