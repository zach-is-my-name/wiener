import React from 'react';
const {useState, useEffect, useRef} = require('react');
const importJsx = require('import-jsx');
const blessed =  require('blessed');
const {render} = require('react-blessed');
const {renderMarkdown} = require('./renderMarkdown')
import Cursor from './Cursor'
import LinkButton from './LinkButton'

function ButtonBox(props) {

  return (
    <box 
      onPress={linkBoxPress}
      height={3}
      width='shrink' 
      focused={linkButtonFocused}
      mouse 
      tags={true}
      hidden={linkButtonHide} 
      ref={props.ref} 
      url={props.url}
    >
      {props.children}
      <LinkButton url={props} / > 
    </box>
  )
  

}

export default ButtonBox























