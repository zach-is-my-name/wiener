import {parse, stringify, toJSON, fromJSON} from 'flatted';
import {_logger, logger2, logger3, logger} from '../../../devLog/logger.js' 
logger.level = "debug"
import {useEffect} from 'react'

export function useScroll(refs, state, dispatch, lineFromSearch, setLineFromSearch) {
  const [{mainBoxRef, isFirstRender, scrollToZeroFlag, scrollToScrollHeightFlag}] = refs

  const {stateCallbackFlag, cursorLeft, cursorTop} = state 
  
  useEffect(() => {
    if (lineFromSearch) {
      mainBoxRef.current?.scrollTo(lineFromSearch);
      dispatch({type: "setCursorTop", payload: lineFromSearch})
      setLineFromSearch(null);
    }
  }, [lineFromSearch])

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
    }
    
  // logger2.info(stringify({ScrollToZeroFlag:scrollToZeroFlag?.current}))
    mainBoxRef.current?.scrollTo(cursorTop);

    if (scrollToScrollHeightFlag?.current) {

      mainBoxRef.current?.scrollTo(mainBoxRef.currrent.getScrollHeight())
    } else if (scrollToZeroFlag?.current) {

      mainBoxRef.current?.scrollTo(0)
    }

    // return () => {
    //   dispatch({type: "setStateCallbackFlag"})
    //   // scrollToScrollHeightFlag.current = false 
    //   scrollToZeroFlag.current = false
    // }
  }, [cursorLeft, cursorTop, stateCallbackFlag])
}

