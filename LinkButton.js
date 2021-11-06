import React from 'react';

function LinkButton(props) {
  return(
    <button align={"left"} hidden={true} autoPadding={true}  border={{type: 'line', fg: 'green'} } >{props.url}</button>
  )
}

export default LinkButton
