import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import React from 'react';
import Cursor from "./Cursor.js";
import LinkBox from "./LinkBox.js";
import HelpPage from './HelpPage.js';
import SearchPage from './SearchPage.js';
import RefBox from './RefBox.js';
import PopUpBox from './PopUpBox.js';
import { useEffect, useState } from 'react';
import { useUiHooks } from '../customHooks/ui/useUiHooks.js';
import { useTransformText } from '../customHooks/ui/useTransformText.js';
var MainBox = function MainBox(props) {
  var _useUiHooks = useUiHooks(props.ctrDispatch, props.lineFromSearch, props.setLineFromSearch, props.loadState),
    _useUiHooks2 = _slicedToArray(_useUiHooks, 4),
    handlers = _useUiHooks2[0],
    dispatch = _useUiHooks2[1],
    refs = _useUiHooks2[2],
    state = _useUiHooks2[3];
  var _useTransformText = useTransformText(props.renderText, props.message, props.ctrDispatch),
    _useTransformText2 = _slicedToArray(_useTransformText, 2),
    text = _useTransformText2[0],
    linkArray = _useTransformText2[1];
  var _useState = useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    mainBoxHidden = _useState2[0],
    setMainBoxHidden = _useState2[1];
  var _useState3 = useState(""),
    _useState4 = _slicedToArray(_useState3, 2),
    linkUrl = _useState4[0],
    setLinkUrl = _useState4[1];
  var _useState5 = useState(true),
    _useState6 = _slicedToArray(_useState5, 2),
    linkBoxHidden = _useState6[0],
    setLinkBoxHidden = _useState6[1];
  var _useState7 = useState(true),
    _useState8 = _slicedToArray(_useState7, 2),
    refBoxHidden = _useState8[0],
    setRefBoxHidden = _useState8[1];
  var _useState9 = useState(true),
    _useState10 = _slicedToArray(_useState9, 2),
    popUpBoxHidden = _useState10[0],
    setPopUpBoxHidden = _useState10[1];
  useEffect(function () {
    // logger.debug("linkArray", linkArray.map((link, index) => index + "-" + link  ))
  }, [linkArray]);
  useEffect(function () {
    var _props$popUpMessage;
    if ((_props$popUpMessage = props.popUpMessage) !== null && _props$popUpMessage !== void 0 && _props$popUpMessage.length) {
      setPopUpBoxHidden(false);
    } else {
      setPopUpBoxHidden(true);
    }
  }, [props.popUpMessage]);
  useEffect(function () {
    if (typeof state.openLinkIndex === 'number' && state.openLinkIndex >= 0 && linkArray.length) {
      setLinkUrl(linkArray[state.openLinkIndex]);
      setLinkBoxHidden(false);
    } else {
      setLinkBoxHidden(true);
    }
  }, [state.openLinkIndex, linkArray]);
  useEffect(function () {
    if (state.initialRefNum) {
      setRefBoxHidden(false);
    } else {
      setRefBoxHidden(true);
    }
  }, [state.initialRefNum]);
  useEffect(function () {
    if (props.helpPageHidden === false || props.searchPageHidden === false) {
      setMainBoxHidden(true);
    } else if (props.helpPageHidden === true || props.searchPageHidden === true) {
      setMainBoxHidden(false);
    }
  }, [props.helpPageHidden, props.searchPageHidden]);
  var linkBox = /*#__PURE__*/React.createElement(LinkBox, {
    linkLine: state.linkLine,
    linkBoxRef: refs.linkBoxRef,
    hidden: linkBoxHidden,
    linkUrl: linkUrl,
    dispatch: dispatch
  });
  var refBox = /*#__PURE__*/React.createElement(RefBox, {
    mainBoxRef: refs.mainBoxRef,
    initialRefNum: state.initialRefNum,
    linkArray: linkArray.length && linkArray || [],
    hidden: refBoxHidden,
    dispatch: dispatch
  });
  var searchPage = /*#__PURE__*/React.createElement(SearchPage, {
    searchPageHidden: props.searchPageHidden,
    setLineFromSearch: props.setLineFromSearch,
    setDateFromSearch: props.setDateFromSearch,
    ctrDispatch: props.ctrDispatch
  });
  var popUpBox = /*#__PURE__*/React.createElement(PopUpBox, {
    popUpMessage: props.popUpMessage,
    popUpBoxHidden: popUpBoxHidden,
    setPopUpBoxHidden: setPopUpBoxHidden,
    ctrDispatch: props.ctrDispatch
  });
  var helppage = /*#__PURE__*/React.createElement(HelpPage, {
    helpPageHidden: props.helpPageHidden,
    ctrDispatch: props.ctrDispatch
  });
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("box", {
    top: "top",
    left: "left",
    width: "100%",
    height: "100%",
    focused: props.searchPageHidden && props.helpPageHidden && linkBoxHidden,
    hidden: mainBoxHidden,
    keyable: true,
    input: true,
    scrollable: true,
    mouse: true,
    tags: true,
    onKeypress: handlers.keyHandler,
    onClick: handlers.clickHandler,
    ref: refs.mainBoxRef,
    name: "mainbox",
    fullUnicode: true,
    forceUnicode: true,
    content: text
  }, /*#__PURE__*/React.createElement(Cursor, {
    cursorRef: refs.cursorRef,
    cursorTop: state.cursorTop,
    cursorLeft: state.cursorLeft,
    savedCursorPos: props.savedCursorPos
  })), props.searchPageHidden === false ? searchPage : null, props.helpPageHidden === false ? helppage : null, linkBoxHidden === false ? linkBox : null, refBoxHidden === false ? refBox : null, popUpBoxHidden === false ? popUpBox : null);
};
export default MainBox;
//# sourceMappingURL=MainBox.js.map