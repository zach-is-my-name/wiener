
export function useScroll(isFirstRenderRef, mainBoxRef, scrollToZeroFlagRef, scrollToScrollHeightFlagRef) {
  useEffect(() => {
    if (isFirstRenderRef.current) {
      isFirstRenderRef.current = false
    }
    mainBoxRef.current?.scrollTo(cursorTop);
    if (scrollToScrollHeightFlagRef.current) {
      mainBoxRef.current?.scrollTo(mainBoxRef.currrent?.getScrollHeight())
    } else if (scrollToZeroFlagRef.current) {
      mainBoxRef.current?.scrollTo(0)
    }
    return () => {
      setStateCallbackFlag(false)
      scrollToScrollHeightFlagRef.current = false 
      scrollToZeroFlagRef.current = false
    }
  }, [cursorLeft, cursorTop, stateCallbackFlag]
  )
}

