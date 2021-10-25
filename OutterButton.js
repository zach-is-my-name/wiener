import React from 'react';
const {useState, useEffect, useRef} = require('react');
const importJsx = require('import-jsx');
const blessed =  require('blessed');
const {render} = require('react-blessed');
const {renderMarkdown} = require('./renderMarkdown')
import Cursor from './Cursor'

function OutterButton() {

  return (
    <button 
      top={linkButtonTop}
      left={linkButtonLeft}
      onPress={()=> linkButtonPress()}
      height={3}
      width='shrink' 
      focused={linkButtonFocused}
      mouse 
      tags
      hidden={linkButtonHide} 
    >
      {props.children}
    </button>)
  )

}

























