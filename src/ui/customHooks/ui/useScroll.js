import {useEffect} from 'react'
import stripAnsi from 'strip-ansi'

export function useScroll(refs, state, dispatch, lineFromSearch, setLineFromSearch, loadState) {
  const {mainBoxRef, scrollToZeroFlag, scrollToScrollHeightFlagRef} = refs

  const {cursorLeft, cursorTop} = state 

  
  useEffect(() => {
    if (lineFromSearch?.length && loadState === 'loadedFromSearch') {
      let lines = mainBoxRef.current?.getScreenLines()
      lines = lines.map(line => stripAnsi(line)).map(line => line.replace(/\[\d+\]/g, ''))
      let _lineFromSearch = lineFromSearch.replace(/\{[^}]+\}|\$\$.*?\$\$/g, '')
      const i = lines.findIndex(el => el === _lineFromSearch)
      mainBoxRef.current?.scrollTo(i);
      dispatch({type: "setCursorTop", payload: i})
      setLineFromSearch(null);
    }
  }, [lineFromSearch, loadState])

  useEffect(() => {
    mainBoxRef.current?.scrollTo(cursorTop);

    if (scrollToScrollHeightFlagRef.current) {
     
      mainBoxRef?.current?.scrollTo(mainBoxRef.current?.getScrollHeight())
    } else if (scrollToZeroFlag?.current) {

      mainBoxRef?.current?.scrollTo(0)
    }

  }, [cursorLeft, cursorTop])
}
