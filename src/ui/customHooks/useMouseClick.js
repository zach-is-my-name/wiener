export function useMouseClick(mainBoxRef)  { 
  useEffect(() => {
    if (wasMouseClicked) {
      followLinkUnderCursor(mainBoxRef)
    }
  }, [wasMouseClicked, cursorLeft, cursorTop]
  )
}

