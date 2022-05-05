import React from 'react';

function LinkText(props) {
  return(
    <element align={"left"} hidden={false} autoPadding={true} border={{type: 'line', fg: 'red'} }>{props.linkText}</element>
  )
}

export default LinkText

