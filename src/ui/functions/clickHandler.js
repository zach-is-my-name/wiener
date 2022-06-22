export function clickHandler(mainBoxRef) {
    const { x, y } = mouse
    setCursorLeft(x)
    setCursorTop((mainBoxRef.current?.childBase + y))
    toggleWasMouseClicked(state => !state)
  }





























