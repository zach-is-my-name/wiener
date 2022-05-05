export function useClickHandler() {
  function clickHandler(mainBoxRef) {
    var _mainBoxRef$current;

    var _mouse = mouse,
        x = _mouse.x,
        y = _mouse.y;
    setCursorLeft(x);
    setCursorTop(((_mainBoxRef$current = mainBoxRef.current) === null || _mainBoxRef$current === void 0 ? void 0 : _mainBoxRef$current.childBase) + y);
    toggleWasMouseClicked(function (state) {
      return !state;
    });
  }
}