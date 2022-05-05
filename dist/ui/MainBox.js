import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import React from 'react';
import Cursor from "./Cursor.js";
import { useState, useEffect, useRef, useCallback } from 'react';
import { useKeyHandler, useClickHandler, //useUpdateArchive,
useGetWien, useStateWithCallbackLazy, //useScroll,
useMouseClick } from './customHooks/index.js';

var MainBox = function MainBox(props) {
  var _useState = useState(null),
      _useState2 = _slicedToArray(_useState, 2),
      renderObj = _useState2[0],
      setRenderObj = _useState2[1];

  var mainBoxRef = useRef(null);
  var cursorRef = useRef(null);
  var isFirstRender = useRef(true);
  var scrollToScrollHeightFlag = useRef(false);
  var scrollToZeroFlagRef = useRef(false);

  var _useState3 = useState(0),
      _useState4 = _slicedToArray(_useState3, 2),
      cursorTop = _useState4[0],
      setCursorTop = _useState4[1];

  var _useState5 = useState(0),
      _useState6 = _slicedToArray(_useState5, 2),
      cursorLeft = _useState6[0],
      setCursorLeft = _useState6[1];

  var _useState7 = useState(false),
      _useState8 = _slicedToArray(_useState7, 2),
      wasMouseClicked = _useState8[0],
      toggleWasMouseClicked = _useState8[1];

  var _useState9 = useState(false),
      _useState10 = _slicedToArray(_useState9, 2),
      stateCallbackFlag = _useState10[0],
      setStateCallbackFlag = _useState10[1];

  var _useState11 = useState("latest"),
      _useState12 = _slicedToArray(_useState11, 2),
      mode = _useState12[0],
      setMode = _useState12[1]; //useUpdateArchive()
  //return render object 
  //setRenderObj(useGetWien(props.argObj))


  return /*#__PURE__*/React.createElement("box", {
    top: "top",
    left: "left",
    width: "100%",
    height: "100%",
    focused: true,
    keyable: true,
    input: true,
    onKeypress: function onKeypress(e) {
      return keyHandler(e, mainBoxRef, scrollToScrollHeightFlag, scrollToZeroFlagRef);
    },
    mouse: true,
    onClick: function onClick() {
      return clickHandler(mainBoxRef);
    },
    scrollable: true,
    ref: mainBoxRef,
    tags: true,
    content: renderObj && renderObj.text
  }, /*#__PURE__*/React.createElement(Cursor, {
    cursorRef: cursorRef,
    cursorTop: cursorTop,
    cursorLeft: cursorLeft
  }));
};

export default MainBox;