import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
import { useReducer } from 'react';
var initialState = {
  cursorTop: 0,
  cursorLeft: 0,
  wasMouseClicked: false,
  openLinkIndex: false,
  linkLine: null,
  initialRefNum: null
};
function reducer(state, action) {
  switch (action.type) {
    case 'setCursorTop':
      return _objectSpread(_objectSpread({}, state), {}, {
        cursorTop: action.payload
      });
    case 'setCursorLeft':
      return _objectSpread(_objectSpread({}, state), {}, {
        cursorLeft: action.payload
      });
    case 'toggleWasMouseClicked':
      return _objectSpread(_objectSpread({}, state), {}, {
        wasMouseClicked: !state.wasMouseClicked
      });
    case 'openLinkBox':
      return _objectSpread(_objectSpread({}, state), {}, {
        openLinkIndex: action.payload.openLinkIndex,
        linkLine: action.payload.line
      });
    case 'closeLinkBox':
      return _objectSpread(_objectSpread({}, state), {}, {
        openLinkIndex: false
      });
    case 'openRefBox':
      return _objectSpread(_objectSpread({}, state), {}, {
        initialRefNum: action.payload
      });
    case 'closeRefBox':
      return _objectSpread(_objectSpread({}, state), {}, {
        initialRefNum: null
      });
    default:
      throw new Error("UI reducer error");
  }
}
export function useUIReducer() {
  var _useReducer = useReducer(reducer, initialState),
    _useReducer2 = _slicedToArray(_useReducer, 2),
    state = _useReducer2[0],
    dispatch = _useReducer2[1];
  return [state, dispatch];
}
//# sourceMappingURL=useUIReducer.js.map