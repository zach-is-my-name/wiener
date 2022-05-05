import React from 'react';
import LinkButton from './LinkButton';
import LinkText from './LinkText';

function ButtonBox(props) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(LinkText, {
    linkText: props.linkText
  }), /*#__PURE__*/React.createElement(LinkButton, {
    url: props.url
  }));
  /* 
     <layout height={"100%"} width={"100%"} border={{type: 'line', fg: 'red'} }>
     </layout>
   
  */
}

export default ButtonBox;