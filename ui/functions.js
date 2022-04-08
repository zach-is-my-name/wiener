  const clickHandler = (mouse) => {
    const { x, y } = mouse
    setCursorLeft(x)
    setCursorTop((mainBoxRef.current?.childBase + y))
    toggleWasMouseClicked(state => !state)
  }

  export function followLinkUnderCursor()  {
    // check if the chunk under the cursor is a markdown link
            
    const lines = mainBoxRef.current?.getScreenLines()
    if (cursorTop >= lines.length) {
      return
    }
    const before = lines.slice(0, cursorTop)
    const cursorIndex = blessed.stripTags(before.join('')).length + cursorLeft
    const cursorLine = blessed.stripTags(lines[cursorTop])
    if (cursorLeft <= cursorLine.length) {
      const text = blessed.stripTags(lines.join(''))
      let match = regexLink.exec(text)
      logger2.info({text}) 
      while (match) {
        const start = match.index
        const end = start + match[0].length

        if (start <= cursorIndex && cursorIndex < end) {
          // jump to the link destination
          openLink(match[1])
          break
        }

        match = regexLink.exec(text)
      }
      toggleWasMouseClicked(false)}
    }

  export function keyHandler(ch, key) {
    logger2.info({scrollPerc:mainBoxRef.current?.getScrollPerc(), scrollIndex:mainBoxRef.current?.getScroll() })
    if (key.full === 'escape' || key.full === 'q' || key.full === 'C-c') {
      return process.exit(0);

    } else if (key.full === 'enter') {
        await followLinkUnderCursor()
    } else if (key.full === 'H') {
        await newsletterBack()
    } else if (key.full === 'L') {
        await newsletterForward() 
    } else {
        updateCoordinate(key.full)
    }

    function nextCursorPosition( current, forward, maxLength, adjustment )  {
      let position = current + (forward ? 1 : -1)
      position = position < 0 ? 0 : position
      position =
        position > maxLength - adjustment ? maxLength - adjustment : position

      return position
    }
    function nextTenXCursorPosition( current, forward, maxLength, adjustment )  {
      let position = current + (forward ? 10 : -10)
      position = position < 0 ? 0 : position
      position =
        position > maxLength - adjustment ? maxLength - adjustment : position

      return position
    }

    function nextTwentyYCursorPosition( current, forward, maxLength, adjustment )  { 
      let position = current + (forward ? 10 : -10)
      position = position < 0 ? 0 : position
      position =
        position > maxLength - adjustment ? maxLength - adjustment : position

      return position
    }

    function updateCoordinate (input)  {
      if (input === 'j' || input === 'k') {
        setCursorTop(nextCursorPosition(
          cursorTop,
          input === 'j',
          mainBoxRef.current?.getScrollHeight(),
          1,
        ))
        mainBoxRef.current?.scrollTo(cursorTop)
      } else if (input === 'h' || input === 'l') {
        setCursorLeft(nextCursorPosition(
          cursorLeft,
          input === 'l',
          mainBoxRef.current?.width,
          3,
        ))
      } else if  (input === 'w' || input === 'b') {
        setCursorLeft(nextTenXCursorPosition(
          cursorLeft,
          input === 'w',
          mainBoxRef.current?.width,
          9,
        ))
      } else if (input === '{' || input === '}') {
        setCursorTop(nextTwentyYCursorPosition(
          cursorTop,
          input === '{',
          mainBoxRef.current?.getScrollHeight(),
          9,
        ))
      }  else if (input === 'g') {
        setCursorTop(0)
        setCursorLeft(0)
        setStateCallbackFlag(true)
      } else if (input === 'S-g') {
        setCursorTop(mainBoxRef.current?.getScreenLines().length - 1)
        setCursorLeft(0)
        setStateCallbackFlag(true)
      } else if (input === '0') {
        setCursorLeft(0)
      } else if (input === '$') {
        setCursorLeft((mainBoxRef.current?.width))
        
      } else if (input === "x") {
        mainBoxRef.current?.setScrollPerc(100)
      } else if (input === 'C-d') {
        setCursorTop((cursorTop + mainBoxRef.current?.height) - 2)
        if (cursorTop > mainBoxRef.current?.getScrollHeight()) {
          setCursorTop(mainBoxRef.current?.getScrollHeight() - 1)
        }
        scrollToScrollHeightFlag.current = true;
        setStateCallbackFlag(true)
      } else if (input === 'C-u') {
        setCursorTop(cursorTop - (mainBoxRef.current?.height)-2)
        if (cursorTop < 0) {
          setCursorTop(0)
        }
        scrollToZeroFlag.current = true
        setStateCallbackFlag(true)
      }
    }
  }
