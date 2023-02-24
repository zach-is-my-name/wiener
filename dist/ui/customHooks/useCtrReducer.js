import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
import { useReducer, useState } from 'react';
var loadStates = ['fetchLatest', 'getArchiveMostRecent', 'loading', 'loadPrevHook', 'loadNextHook', 'none', 'gotoLatestInArchive', 'gotoLatestInArchive', 'loadFromSearch'];
var loadedStates = ['loadedFromSearch', 'loadedFromBackButton', 'loadedFromNextButton', 'loadedFromFetchLatest', 'loadedFromGotoLatest'];
export function useCtrReducer() {
  function reducer(prevState, action) {
    if (loadStates.includes(action.type)) {
      return _objectSpread(_objectSpread({}, prevState), {}, {
        loadState: action.type
      });
    } else if (loadedStates.includes(action.type)) {
      return _objectSpread(_objectSpread({}, prevState), {}, {
        loadState: action.type
      });
    } else if (action.type === 'setHasContinuity') {
      return _objectSpread(_objectSpread({}, prevState), {}, {
        hasContinuity: action.payload
      });
    } else if (action.type === 'setPopUpMessage') {
      return _objectSpread(_objectSpread({}, prevState), {}, {
        loadState: 'popUpMessage',
        popUpMessage: action.payload
      });
    } else if (action.type === 'clearPopUpMessage') {
      return _objectSpread(_objectSpread({}, prevState), {}, {
        popUpMessage: ""
      });
    } else if (action.type === 'toggleRenderSearch') {
      return _objectSpread(_objectSpread({}, prevState), {}, {
        searchPageHidden: !prevState.searchPageHidden
      });
    } else if (action.type === 'toggleHelpPage') {
      return _objectSpread(_objectSpread({}, prevState), {}, {
        helpPageHidden: !prevState.helpPageHidden
      });
    } else if (action.type === 'exitSearchPage') {
      return _objectSpread(_objectSpread({}, prevState), {}, {
        searchPageHidden: true
      });
    } else if (action.type === 'exitHelpPage') {
      return _objectSpread(_objectSpread({}, prevState), {}, {
        helpPageHidden: true
      });
    }
    return prevState;
  }
  var initialState = {
    loadState: false,
    helpPageHidden: true,
    searchPageHidden: true,
    popUpMessage: ""
  };
  var _useReducer = useReducer(reducer, initialState),
    _useReducer2 = _slicedToArray(_useReducer, 2),
    state = _useReducer2[0],
    ctrDispatch = _useReducer2[1];
  return [state, ctrDispatch];
}
//# sourceMappingURL=useCtrReducer.js.map