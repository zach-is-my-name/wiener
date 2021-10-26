import React from 'react';
const {useState, useEffect, useRef} = require('react');
const importJsx = require('import-jsx');
const blessed =  require('blessed');
const {render} = require('react-blessed');


  function Cursor(props) {
    return (
    <box width={1}
         height={1}
         top={props.cursorTop}
         left={props.cursorLeft}
         style ={{fg: 'white', bg: 'white'}}>
    </box>
    )
  }                 

export default Cursor

























