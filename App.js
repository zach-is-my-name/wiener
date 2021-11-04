import React from 'react';
import MainBox from './MainBox.js'
const {useState, useEffect, useRef} = require('react');
const importJsx = require('import-jsx');
const blessed =  require('blessed');
const {render} = require('react-blessed');
const {renderMarkdown} = require('./renderMarkdown')

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
  autoPadding: true,
  smartCSR: true,
  title: 'wiener',
});

screen.log()


const component = render(<App />, screen);

