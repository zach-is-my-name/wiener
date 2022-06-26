import blessed from 'neo-blessed';
import {logger2, _logger} from '../../../devLog/logger.js' 
import {parse, stringify, toJSON, fromJSON} from 'flatted';

import open from 'open'
export function useKeyHandler(refs, state, dispatch) {
  const [{mainBoxRef, scrollToScrollHeightFlag, scrollToZeroFlagRef}] = refs
  const {cursorTop, cursorLeft} = state 
  async function keyHandler(ch, key) {
    logger2.info(stringify({cursorTop, cursorLeft, scrollIndex: mainBoxRef?.current.getScroll()}))
    // _logger.info("e", e)
    // logger2.info(stringify({arguments}))
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

    function updateCoordinate(input)  {
      if (input === 'j' || input === 'k') {
        dispatch({type: "setCursorTop", payload: nextCursorPosition(
          cursorTop,
          input === 'j',
          mainBoxRef.current?.getScrollHeight(),
          1,
        )})
        mainBoxRef.current?.scrollTo(cursorTop)
      } else if (input === 'h' || input === 'l') {
        dispatch({type:"setCursorLeft", payload: nextCursorPosition(
          cursorLeft,
          input === 'l',
          mainBoxRef.current?.width,
          3,
        )})
      } else if  (input === 'w' || input === 'b') {
        dispatch({type:"setCursorLeft", payload: nextTenXCursorPosition(
          cursorLeft,
          input === 'w',
          mainBoxRef.current?.width,
          9,
        )})

      } else if (input === '{' || input === '}') {
        dispatch({type: "setCursorTop", payload: nextTwentyYCursorPosition(
          cursorTop,
          input === '{',
          mainBoxRef.current?.getScrollHeight(),
          9,
        )})

      }  else if (input === 'g') {
        dispatch({type:"setCursorTop", payload:0}) 
        mainBoxRef.current?.scrollTo(cursorTop)
          logger2.info(stringify({cursorTop, cursorLeft, scrollIndex: mainBoxRef?.current.getScroll()}))
        // dispatch({type: "setCursorLeft", payload: 0})
        // dispatch({type: "setStateCallbackFlag"})
        if (cursorTop > mainBoxRef.current?.getScrollHeight()) {
          scrollToScrollHeightFlag.current = true;
        } 
      } else if (input === 'S-g') {
        dispatch({type:"setCursorTop", payload: mainBoxRef.current.getScreenLines().length - 2})
        mainBoxRef.current?.scrollTo(cursorTop)
        // dispatch({type: "setStateCallbackFlag"})

      } else if (input === '0') {
        dispatch({type:"setCursorLeft", payload: 0})
        
      } else if (input === '$') {
        logger2.info(stringify({mainBoxWidth: mainBoxRef.current?.width}))
        dispatch({type:"setCursorLeft", payload: mainBoxRef.current?.width - 1})

      } else if (input === "x") {
        mainBoxRef.current?.setScrollPerc(100)

      } else if (input === 'C-d') {
        dispatch({type: "setCursorTop", payload: (cursorTop + mainBoxRef.current?.height)})

        if (cursorTop > mainBoxRef.current?.getScrollHeight()) {
          dispatch({type: "setCursorTop", payload: mainBoxRef.current?.getScrollHeight() - 1})
          scrollToScrollHeightFlag.current = true;
          //mainBoxRef.current?.scrollTo(cursorTop)
        }
        mainBoxRef.current?.scrollTo(cursorTop)
        dispatch({type: "setStateCallbackFlag"})
      } else if (input === 'S-g') {
        setCursorTop(mainBoxRef.current?.getScreenLines().length - 1)
        mainBoxRef.current?.scrollTo(cursorTop)
          logger2.info(stringify({cursorTop, cursorLeft, scrollIndex: mainBoxRef?.current.getScroll()}))
        setCursorLeft(0)
        setStateCallbackFlag(true)
      } else if (input === 'C-u') {
        dispatch({type:"setCursorTop", payload: cursorTop - (mainBoxRef.current?.height)-2})
        if (cursorTop > mainBoxRef.current?.getScrollHeight()) {
          scrollToScrollHeightFlag.current = true;
        } 

        if (cursorTop < 0) {
          dispatch({type:"setCursorTop", payload:0})
        }
        scrollToZeroFlagRef.current = true
        dispatch({type: "setStateCallbackFlag", payload: true})
      }
    }
  }

  function followLinkUnderCursor()  {
    const regexLink = /(https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b[-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gm
    // check if the chunk under the cursor is a markdown link
    logger2.info(stringify({getScreenLines: mainBoxRef?.current.getScreenLines().length})) 
    const lines = mainBoxRef?.current.getScreenLines()
    if (cursorTop >= lines?.length) {
      return
    }
    const before = lines?.slice(0, cursorTop)
    const cursorIndex = blessed.stripTags(before?.join('')).length + cursorLeft
    const cursorLine = blessed.stripTags(lines[cursorTop])
    if (cursorLeft <= cursorLine.length) {
      const text = blessed.stripTags(lines.join(''))
      let match = regexLink.exec(text)
      logger2.info(stringify({text})) 
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
  return [{followLinkUnderCursor, keyHandler}] 
}
