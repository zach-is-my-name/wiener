import React from 'react';



  function Cursor(props) {
  
    return (
    <box width={1}
         height={1}
         ref={props.cursorRef}
         top={props.cursorTop}
         left={props.cursorLeft}
         style ={{fg: 'white', bg: 'white'}}>
      {null}
    </box>
    )
  }                 

export default Cursor
