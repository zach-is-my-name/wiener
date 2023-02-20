import blessed from 'blessed';
import React from 'react'
import {render} from 'react-blessed';
import App from './components/App.js'
import https from 'https'
import {cert} from '../../certs/weekinethereumnews.com.js'
https.globalAgent.options.ca = cert 


const screen = blessed.screen({
//  autoPadding: true,
  smartCSR: true,
  title: 'wiener',
  fullUnicode: true,
  handleUncaughtExceptions: true,
  ignoreDockContrast: true,
  dockBorders:true,
  ignoreDockContrast: true
});

screen.key(['q', 'C-c' ], (ch, key) => {
    process.exit(0)
});

export function start () {

  render(<App  />, screen);
}
