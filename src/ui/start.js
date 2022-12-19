import blessed from 'blessed';
import React from 'react'
import {render} from 'react-blessed';
import App from './components/App.js'
import https from 'https'
import fs from 'fs'
https.globalAgent.options.ca = fs.readFileSync('./certs/weekinethereumnews.com');


const screen = blessed.screen({
//  autoPadding: true,
  smartCSR: true,
  title: 'wiener',
  fullUnicode: true,
  handleUncaughtExceptions: false,
  ignoreDockContrast: true,
  dockBorders:true,
  ignoreDockContrast: true
});

screen.key(['q', 'C-c', 'C-e', 'enter', 'C-enter'], (ch, key) => {
    process.exit(0)
});

export function start () {
  render(<App  />, screen);
}
   // render(Hello)

