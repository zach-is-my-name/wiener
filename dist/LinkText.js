import React from 'react';

function LinkText(props) {
  return /*#__PURE__*/React.createElement("element", {
    align: "left",
    hidden: false,
    autoPadding: true,
    border: {
      type: 'line',
      fg: 'red'
    }
  }, props.linkText);
}

export default LinkText;