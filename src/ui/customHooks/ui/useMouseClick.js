import {useEffect} from 'react'

export function useMouseClick([{mainBoxRef}], {wasMouseClicked, cursorLeft, cursorTop},  dispatch, followLinkUnderCursor)  { 

  useEffect(() => {
    (async () => {
    if (wasMouseClicked) {
      await followLinkUnderCursor()
    } })()
  }, [wasMouseClicked, cursorLeft, cursorTop])

  const clickHandler = (mouse) => {
    const { x, y } = mouse
    dispatch({type:"setCursorLeft", payload: x})
    dispatch({type:"setCursorTop", payload: mainBoxRef.current?.childBase + y})
    dispatch({type:"toggleWasMouseClicked"})
  }
  return [ {clickHandler} ] 
}

