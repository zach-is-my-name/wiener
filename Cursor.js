import React from 'react';
const {useState, useEffect, useRef} = require('react');
const importJsx = require('import-jsx');
import blessed from 'neo-blessed';
const {render} = require('react-blessed');


  function Cursor(props) {
    return (
    <box width={1}
         height={1}
         top={props.cursorTop}
         left={props.cursorLeft}
         style ={{fg: 'purple', bg: 'purple'}}>
    </box>
    )
  }                 

export default Cursor

























