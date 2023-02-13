import React, {useEffect, useRef}from 'react';

function PopUpBox(props) {
  const boxRef = useRef(null) 
  useEffect(() => {
    if (!props.popUpBoxHidden) {
      boxRef.current?.focus()
      boxRef.current?.key('escape', function(ch, key) {
        props.ctrDispatch({type: "clearPopUpMessage"})
      })
     setTimeout(() => props.ctrDispatch({type: "clearPopUpMessage"}), 2000)
    }
  }, [])

  return (
    <> 
    <box
    border={{type: 'line'}} 
    top={"center"}
    width={"25%"}
    left={"center"}
    height={"15%"}
    content={props.popUpMessage}
    ref={boxRef} 
    >
    </box>
    </> 
  )
}

export default PopUpBox 

