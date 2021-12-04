import React from 'react';
import MainBox from './MainBox.js'
const {useState, useEffect, useRef} = require('react');
const importJsx = require('import-jsx');
const {renderMarkdown} = require('./renderMarkdown')
import blessed from 'neo-blessed';
import {createBlessedRenderer} from 'react-blessed';

const render = createBlessedRenderer(blessed);

function App(props) {

  const [linkButtonRendered, setLinkButtonRendered] = useState(false)
  const [linkButtonFocused, setLinkButtonFocus] = useState(false) 
  const [linkButtonTop, setLinkButtonTop] = useState(0)
  const [linkButtonLeft, setLinkButtonLeft] = useState(0)
  const [linkButtonHide, setLinkButtonHide] = useState(false)

    return (
      <MainBox />
    );
}

const screen = blessed.screen({
//  autoPadding: true,
  smartCSR: true,
  title: 'wiener',
  fullUnicode: true,
});


const component = render(<App />, screen);

