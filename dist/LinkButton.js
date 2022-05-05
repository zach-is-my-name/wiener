import React from 'react';

function LinkButton(props) {
  return /*#__PURE__*/React.createElement("button", {
    align: "left",
    hidden: true,
    autoPadding: true,
    border: {
      type: 'line',
      fg: 'green'
    }
  }, props.url);
}

export default LinkButton;