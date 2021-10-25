import React from 'react';
const {useState, useEffect, useRef} = require('react');
const importJsx = require('import-jsx');
const blessed =  require('blessed');
const {render} = require('react-blessed');
const {renderMarkdown} = require('./renderMarkdown')
import Cursor from './Cursor'

function InnerButton() {
  return(
    <button>{props.children}</button>
  )
}

