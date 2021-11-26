import React from 'react';
const {useState, useEffect, useRef} = require('react');
const importJsx = require('import-jsx');
import blessed from 'neo-blessed';
const {render} = require('react-blessed');
import winston, {createLogger, transports}  from 'winston';



  function Cursor(props) {
  
    return (
    <box width={1}
         height={1}
         ref={props.cursorRef}
         top={props.cursorTop}
         left={props.cursorLeft}
         style ={{fg: 'white', bg: 'white'}}>
      {null}
    </box>
    )
  }                 

export default Cursor
