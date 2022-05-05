export function useScroll(isFirstRenderRef, mainBoxRef, scrollToZeroFlagRef, scrollToScrollHeightFlagRef) {
  useEffect(function () {
    var _mainBoxRef$current;

    if (isFirstRenderRef.current) {
      isFirstRenderRef.current = false;
    }

    (_mainBoxRef$current = mainBoxRef.current) === null || _mainBoxRef$current === void 0 ? void 0 : _mainBoxRef$current.scrollTo(cursorTop);

    if (scrollToScrollHeightFlagRef.current) {
      var _mainBoxRef$current2, _mainBoxRef$currrent;

      (_mainBoxRef$current2 = mainBoxRef.current) === null || _mainBoxRef$current2 === void 0 ? void 0 : _mainBoxRef$current2.scrollTo((_mainBoxRef$currrent = mainBoxRef.currrent) === null || _mainBoxRef$currrent === void 0 ? void 0 : _mainBoxRef$currrent.getScrollHeight());
    } else if (scrollToZeroFlagRef.current) {
      var _mainBoxRef$current3;

      (_mainBoxRef$current3 = mainBoxRef.current) === null || _mainBoxRef$current3 === void 0 ? void 0 : _mainBoxRef$current3.scrollTo(0);
    }

    return function () {
      setStateCallbackFlag(false);
      scrollToScrollHeightFlagRef.current = false;
      scrollToZeroFlagRef.current = false;
    };
  }, [cursorLeft, cursorTop, stateCallbackFlag]);
}