  const followLinkUnderCursor = useCallback(async () => {
    const lines = mainBoxRef.current.getScreenLines()
    if (cursorTop >= lines.length) {
      return
    }
 }, [])

