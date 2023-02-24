import React from 'react';
function Cursor(props) {
  var cursorTop, cursorLeft;
  if (props.savedCursorPos) {
    cursorTop = props.savedCursorPos.top;
    cursorLeft = props.savedCursorPos.left;
  } else {
    cursorTop = props.cursorTop;
    cursorLeft = props.cursorLeft;
  }
  return /*#__PURE__*/React.createElement("box", {
    top: cursorTop,
    left: cursorLeft,
    width: 1,
    height: 1,
    ref: props.cursorRef,
    style: {
      fg: 'white',
      bg: 'white'
    }
  }, null);
}
export default Cursor;
//# sourceMappingURL=Cursor.js.map