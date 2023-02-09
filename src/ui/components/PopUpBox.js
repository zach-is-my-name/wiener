import React from 'react';

function PopUpBox(props) {
  const handleKeyPress = (ch, key) => {
    /* logger.debug("keypress: ", key)*/
    setImmediate(() => {
       if (key.full === 'C-c') {
        process.exit(0)
      }
      if (key.name === 'escape' || key.name === 'c' || key.name === 'C'){
        props.ctrDispatch({type: "clearPopUpMessage"})
        props.setPopUpBoxHidden(true)
      } 
    })
  }

  return (
    <> 
    <box
    border={{type: 'line'}} 
    top={"center"}
    width={"25%"}
    left={"center"}
    height={"15%"}
    content={props.popUpMessage}
    onKeypress={handleKeyPress}
    >
    </box>
    </> 
  )
}

export default PopUpBox 
