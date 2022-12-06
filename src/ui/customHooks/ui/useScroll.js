import {useEffect} from 'react'

export function useScroll(refs, state, dispatch, lineFromSearch, setLineFromSearch) {
  const [{mainBoxRef, scrollToZeroFlag, scrollToScrollHeightFlagRef}] = refs

  const {cursorLeft, cursorTop} = state 
  
  useEffect(() => {
    if (lineFromSearch?.length) {
      const lines = mainBoxRef.current?.getScreenLines()
      const i = lines.findIndex(el => el === lineFromSearch)
       mainBoxRef.current?.scrollTo(i);
       dispatch({type: "setCursorTop", payload: i})
       setLineFromSearch(null);
    }
  }, [lineFromSearch])

  useEffect(() => {
    mainBoxRef.current?.scrollTo(cursorTop);

    if (scrollToScrollHeightFlagRef.current) {
     
      mainBoxRef?.current?.scrollTo(mainBoxRef.current?.getScrollHeight())
    } else if (scrollToZeroFlag?.current) {

      mainBoxRef?.current?.scrollTo(0)
    }

  }, [cursorLeft, cursorTop])
}

