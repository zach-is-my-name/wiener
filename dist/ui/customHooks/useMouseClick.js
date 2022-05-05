export function useMouseClick(mainBoxRef) {
  useEffect(function () {
    if (wasMouseClicked) {
      followLinkUnderCursor(mainBoxRef);
    }
  }, [wasMouseClicked, cursorLeft, cursorTop]);
}