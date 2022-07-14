import React from 'react';

function Cursor(props) {
  let cursorTop, cursorLeft
  if (props.savedCursorPos) {
    cursorTop = props.savedCursorPos.top
    cursorLeft = props.savedCursorPos.left
  } else {
    cursorTop = props.cursorTop
    cursorLeft = props.cursorLeft 

  }
  return (
    <box 
    top={cursorTop}
    left={cursorLeft}
    width={1}
    height={1}
    ref={props.cursorRef}
    style ={{fg: 'white', bg: 'white'}}>
    {null}
    </box>
  )
}                 

export default Cursor
