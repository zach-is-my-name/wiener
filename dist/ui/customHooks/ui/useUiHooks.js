import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import { useRef, useReducer } from 'react';
import { useKeyHandler, useScroll, useMouseClick, useUIReducer, useGetRefs } from '../index.js';
export function useUiHooks(ctrDispatch, lineFromSearch, setLineFromSearch, loadState) {
  var _useUIReducer = useUIReducer(),
    _useUIReducer2 = _slicedToArray(_useUIReducer, 2),
    state = _useUIReducer2[0],
    dispatch = _useUIReducer2[1];
  var refs = useGetRefs();
  var _useKeyHandler = useKeyHandler(refs, state, dispatch, ctrDispatch),
    _useKeyHandler2 = _slicedToArray(_useKeyHandler, 1),
    _useKeyHandler2$ = _useKeyHandler2[0],
    followLinkUnderCursor = _useKeyHandler2$.followLinkUnderCursor,
    keyHandler = _useKeyHandler2$.keyHandler;
  useScroll(refs, state, dispatch, lineFromSearch, setLineFromSearch, loadState);
  var _useMouseClick = useMouseClick(refs, state, dispatch, followLinkUnderCursor),
    _useMouseClick2 = _slicedToArray(_useMouseClick, 1),
    clickHandler = _useMouseClick2[0].clickHandler;
  return [{
    keyHandler: keyHandler,
    clickHandler: clickHandler
  }, dispatch, refs, state];
}
//# sourceMappingURL=useUiHooks.js.map