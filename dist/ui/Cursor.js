import React from 'react';

function Cursor(props) {
  return /*#__PURE__*/React.createElement("box", {
    width: 1,
    height: 1,
    ref: props.cursorRef,
    top: props.cursorTop,
    left: props.cursorLeft,
    style: {
      fg: 'white',
      bg: 'white'
    }
  }, null);
}

export default Cursor;