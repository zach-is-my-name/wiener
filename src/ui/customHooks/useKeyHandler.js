import open from "open"

export function useKeyHandler(mainBoxRef, scrollToScrollHeightFlagRef, scrollToZeroFlagRef, ) { 
  async function keyHandler(e, ch, key) {
    console.log("e", e)
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
        dispatch({type: "setCursorTop", payload: nextCursorPosition(
          state.cursorTop,
          input === 'j',
          mainBoxRef.current?.getScrollHeight(),
          1,
        )})
        mainBoxRef.current?.scrollTo(state.cursorTop)
      } else if (input === 'h' || input === 'l') {
        dispatch({type:"setCursorLeft", payload: nextCursorPosition(
          state.cursorLeft,
          input === 'l',
          mainBoxRef.current?.width,
          3,
        )})
      } else if  (input === 'w' || input === 'b') {
        dispatch({type:"setCursorLeft", payload: nextTenXCursorPosition(
          state.cursorLeft,
          input === 'w',
          mainBoxRef.current?.width,
          9,
        )})
      } else if (input === '{' || input === '}') {
        dispatch({type: "setCursorTop", payload: nextTwentyYCursorPosition(
          state.cursorTop,
          input === '{',
          mainBoxRef.current?.getScrollHeight(),
          9,
        )})
      }  else if (input === 'g') {
        dispatch({type:"setCursorTop", payload:0})
        dispatch({type: "setCursorLeft", payload: 0})
        dispatch({type: "setStateCallbackFlag"})
      } else if (input === 'S-g') {
        dispatch({type:"setCursorTop", payload: mainBoxRef.current?.getScreenLines().length - 1})
        dispatch({type:"setCursorLeft", payload: 0})
        dispatch({type: "setStateCallbackFlag"})
      } else if (input === '0') {
        dispatch({type:"setCursorLeft", payload: 0})
      } else if (input === '$') {
        dispatch({type:"setCursorLeft", payload: mainBoxRef.current?.width})
      } else if (input === "x") {
        mainBoxRef.current?.setScrollPerc(100)
      } else if (input === 'C-d') {
        dispatch({type: "setCursorTop", payload: (state.cursorTop + mainBoxRef.current?.height) - 2})
        if (state.cursorTop > mainBoxRef.current?.getScrollHeight()) {
          dispatch({type: "setCursorTop", payload: mainBoxRef.current?.getScrollHeight() - 1})
        }
        scrollToScrollHeightFlagRef.current = true;
        dispatch({type: "setStateCallbackFlag"})
      } else if (input === 'S-g') {
      } else if (input === 'C-u') {
        dispatch({type:"setCursorTop",payload: state.cursorTop - (mainBoxRef.current?.height)-2})
        if (state.cursorTop < 0) {
          dispatch({type:"setCursorTop", payload:0})
        }
        scrollToZeroFlag.current = true
        dispatch({type: "setStateCallbackFlag", payload: true})
      }
    }
  }

  function followLinkUnderCursor(mainBoxRef)  {
    // check if the chunk under the cursor is a markdown link
            
    const lines = mainBoxRef.current?.getScreenLines()
    if (state.cursorTop >= lines.length) {
      return
    }
    const before = lines.slice(0, state.cursorTop)
    const cursorIndex = blessed.stripTags(before.join('')).length + state.cursorLeft
    const cursorLine = blessed.stripTags(lines[state.cursorTop])
    if (state.cursorLeft <= cursorLine.length) {
      const text = blessed.stripTags(lines.join(''))
      let match = regexLink.exec(text)
      logger2.info({text}) 
      while (match) {
        const start = match.index
        const end = start + match[0].length

        if (start <= cursorIndex && cursorIndex < end) {
          // jump to the link destination
          open(match[1])
          break
        }

        match = regexLink.exec(text)
      }
      dispatch({type: "toggleWasMouseClicked"})
    }
    }
}
