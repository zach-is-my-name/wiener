import {_logger, logger2} from '../../devLog/logger.js' 
import React from 'react';
import {useState, useEffect} from 'react'  
import https from 'https'
import fs from 'fs'
https.globalAgent.options.ca = fs.readFileSync('./certs/weekinethereumnews.com');
import blessed from 'neo-blessed';
import pkg from 'react-blessed';
const { createBlessedRenderer } = pkg;
import {argObj} from '../../index.js'
const render = createBlessedRenderer(blessed);
import {useHasInternet} from '../customHooks/useHasInternet.js' 
import {useHasLatestInArchive} from '../customHooks/useHasLatestInArchive.js'  
import MainBox from './MainBox.js' 


function App() {
const hasInternet = useHasInternet()

const boolHasLatestInArchive = useHasLatestInArchive()

  return (
      <MainBox argObj={argObj} hasInternet={hasInternet} hasLatestInArchive={boolHasLatestInArchive } />
  )
}

const screen = blessed.screen({
//  autoPadding: true,
  smartCSR: true,
  title: 'wiener',
  fullUnicode: true,
});

function start(argObj) {
  render(<App  />, screen);
}

export {start}
