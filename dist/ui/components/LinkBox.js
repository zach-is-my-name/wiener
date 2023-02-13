import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { useEffect, useState, useRef, useLayoutEffect } from 'react';
import open from 'open';
function LinkBox(_ref) {
  var hidden = _ref.hidden,
    linkUrl = _ref.linkUrl,
    linkBoxRef = _ref.linkBoxRef,
    linkLine = _ref.linkLine,
    dispatch = _ref.dispatch;
  var formRef = useRef(null);
  var button1Ref = useRef(null);
  var button2Ref = useRef(null);
  var cancelPress = function cancelPress() {
    dispatch({
      type: "closeLinkBox"
    });
  };
  var openPress = function openPress(linkUrl) {
    open(linkUrl);
    dispatch({
      type: "closeLinkBox"
    });
  };
  var handleKeyPressLinkBox = function handleKeyPressLinkBox(ch, key) {
    setImmediate(function () {
      if (key.full === 'C-c') {
        process.exit(0);
      } else if (key.name === 'escape' || key.name === 'c' || key.name === 'C') {
        cancelPress();
      }
    });
  };
  useEffect(function () {
    if (!hidden && linkUrl.length) {
      var _formRef$current, _formRef$current2, _formRef$current3, _formRef$current4, _formRef$current5;
      (_formRef$current = formRef.current) === null || _formRef$current === void 0 ? void 0 : _formRef$current.focus();
      (_formRef$current2 = formRef.current) === null || _formRef$current2 === void 0 ? void 0 : _formRef$current2.key('escape', function (ch, key) {
        cancelPress();
      });
      (_formRef$current3 = formRef.current) === null || _formRef$current3 === void 0 ? void 0 : _formRef$current3.key('c', function (ch, key) {
        cancelPress();
      });
      (_formRef$current4 = formRef.current) === null || _formRef$current4 === void 0 ? void 0 : _formRef$current4.key('o', function (ch, key) {
        openPress(linkUrl);
        dispatch({
          type: "closeLinkBox"
        });
      });
      (_formRef$current5 = formRef.current) === null || _formRef$current5 === void 0 ? void 0 : _formRef$current5.key('O', function (ch, key) {
        openPress(linkUrl);
        dispatch({
          type: "closeLinkBox"
        });
      });
    }
  }, []);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("form", {
    left: "center",
    top: linkLine + 3,
    border: {
      type: 'line'
    },
    shrink: true,
    label: "esc to close",
    onKeypress: handleKeyPressLinkBox,
    hidden: hidden,
    ref: formRef,
    align: "center",
    onSubmit: function onSubmit() {
      return openPress(linkUrl);
    },
    onCancel: function onCancel() {
      return cancelPress();
    },
    height: 7
  }, /*#__PURE__*/React.createElement("text", {
    align: "center",
    top: 1,
    content: linkUrl
  }), /*#__PURE__*/React.createElement("box", {
    /*style={{border: {fg: 'cyan'}}} border={{type: 'line'}}*/name: "button-group",
    align: "center",
    left: "center",
    shrink: true,
    top: 3
  }, /*#__PURE__*/React.createElement("button", {
    keys: true,
    bottom: 0,
    left: "25%-3" /*border={{type: 'line'}}*/,
    shrink: true,
    content: "g(o)",
    onPress: function onPress() {
      var _formRef$current6;
      return (_formRef$current6 = formRef.current) === null || _formRef$current6 === void 0 ? void 0 : _formRef$current6.submit();
    },
    ref: button1Ref,
    mouse: true
  }), /*#__PURE__*/React.createElement("button", _defineProperty({
    keys: true,
    bottom: 0,
    left: "25%+3" /*border={{type:'line'}}*/,
    ref: button2Ref,
    shrink: true,
    onPress: function onPress() {
      var _formRef$current7;
      return (_formRef$current7 = formRef.current) === null || _formRef$current7 === void 0 ? void 0 : _formRef$current7.submit();
    },
    content: "(c)ancle"
  }, "onPress", cancelPress)))));
}
export default LinkBox;
//# sourceMappingURL=LinkBox.js.map