import { useEffect } from 'react';
import stripAnsi from 'strip-ansi';
export function useScroll(refs, state, dispatch, lineFromSearch, setLineFromSearch, loadState) {
  var mainBoxRef = refs.mainBoxRef,
    scrollToZeroFlag = refs.scrollToZeroFlag,
    scrollToScrollHeightFlagRef = refs.scrollToScrollHeightFlagRef;
  var cursorLeft = state.cursorLeft,
    cursorTop = state.cursorTop;
  useEffect(function () {
    if (lineFromSearch !== null && lineFromSearch !== void 0 && lineFromSearch.length && loadState === 'loadedFromSearch') {
      var _mainBoxRef$current, _mainBoxRef$current2;
      var lines = (_mainBoxRef$current = mainBoxRef.current) === null || _mainBoxRef$current === void 0 ? void 0 : _mainBoxRef$current.getScreenLines();
      lines = lines.map(function (line) {
        return stripAnsi(line);
      }).map(function (line) {
        return line.replace(/\[\d+\]/g, '');
      });
      var _lineFromSearch = lineFromSearch.replace(/\{[^}]+\}|\$\$.*?\$\$/g, '');
      var i = lines.findIndex(function (el) {
        return el === _lineFromSearch;
      });
      (_mainBoxRef$current2 = mainBoxRef.current) === null || _mainBoxRef$current2 === void 0 ? void 0 : _mainBoxRef$current2.scrollTo(i);
      dispatch({
        type: "setCursorTop",
        payload: i
      });
      setLineFromSearch(null);
    }
  }, [lineFromSearch, loadState]);
  useEffect(function () {
    var _mainBoxRef$current3;
    (_mainBoxRef$current3 = mainBoxRef.current) === null || _mainBoxRef$current3 === void 0 ? void 0 : _mainBoxRef$current3.scrollTo(cursorTop);
    if (scrollToScrollHeightFlagRef.current) {
      var _mainBoxRef$current4, _mainBoxRef$current5;
      mainBoxRef === null || mainBoxRef === void 0 ? void 0 : (_mainBoxRef$current4 = mainBoxRef.current) === null || _mainBoxRef$current4 === void 0 ? void 0 : _mainBoxRef$current4.scrollTo((_mainBoxRef$current5 = mainBoxRef.current) === null || _mainBoxRef$current5 === void 0 ? void 0 : _mainBoxRef$current5.getScrollHeight());
    } else if (scrollToZeroFlag !== null && scrollToZeroFlag !== void 0 && scrollToZeroFlag.current) {
      var _mainBoxRef$current6;
      mainBoxRef === null || mainBoxRef === void 0 ? void 0 : (_mainBoxRef$current6 = mainBoxRef.current) === null || _mainBoxRef$current6 === void 0 ? void 0 : _mainBoxRef$current6.scrollTo(0);
    }
  }, [cursorLeft, cursorTop]);
}
//# sourceMappingURL=useScroll.js.map