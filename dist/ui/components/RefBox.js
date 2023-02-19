import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import React, { useEffect, useState, useRef } from 'react';
import open from 'open';
function RefBox(_ref) {
  var _mainBoxRef$current;
  var initialRefNum = _ref.initialRefNum,
    dispatch = _ref.dispatch,
    linkArray = _ref.linkArray,
    mainBoxRef = _ref.mainBoxRef,
    hidden = _ref.hidden;
  var formRef = useRef(null);
  var textAreaRef = useRef(null);
  var _useState = useState(initialRefNum),
    _useState2 = _slicedToArray(_useState, 2),
    refNum = _useState2[0],
    setRefNum = _useState2[1];
  useEffect(function () {
    var _textAreaRef$current;
    (_textAreaRef$current = textAreaRef.current) === null || _textAreaRef$current === void 0 ? void 0 : _textAreaRef$current.setValue(refNum);
  }, [refNum]);
  var cancelPress = function cancelPress() {
    dispatch({
      type: "closeRefBox"
    });
  };
  var openPress = function openPress() {
    var linkIndex = parseInt(refNum, 10);
    if (typeof linkIndex === 'number') {
      var linkUrl = linkArray[linkIndex];
      open(linkUrl);
      dispatch({
        type: "closeRefBox"
      });
    } else {
      dispatch({
        type: "closeRefBox"
      });
    }
  };
  var handleKeyPressRefBox = function handleKeyPressRefBox(ch, key) {
    setImmediate(function () {
      if (key.full === 'escape') {
        dispatch({
          type: "closeRefBox"
        });
      }
      if (key.name === 'escape' || key.name === 'c' || key.name === 'C') {
        cancelPress();
      }
      if (["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(key.full)) {
        setRefNum(refNum + key.full);
      } else if (key.name === 'enter') {
        openPress();
      }
    });
  };
  useEffect(function () {
    if (!hidden) {
      var _formRef$current, _formRef$current2, _formRef$current3, _formRef$current4;
      (_formRef$current = formRef.current) === null || _formRef$current === void 0 ? void 0 : _formRef$current.focus();
      (_formRef$current2 = formRef.current) === null || _formRef$current2 === void 0 ? void 0 : _formRef$current2.key('escape', function (ch, key) {
        cancelPress();
      });
      (_formRef$current3 = formRef.current) === null || _formRef$current3 === void 0 ? void 0 : _formRef$current3.key('o', function (ch, key) {});
      (_formRef$current4 = formRef.current) === null || _formRef$current4 === void 0 ? void 0 : _formRef$current4.key('O', function (ch, key) {});
    }
  }, []);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("form", {
    left: "left",
    top: ((_mainBoxRef$current = mainBoxRef.current) === null || _mainBoxRef$current === void 0 ? void 0 : _mainBoxRef$current.height) - 1,
    onKeypress: handleKeyPressRefBox,
    hidden: hidden,
    ref: formRef,
    align: "left",
    onSubmit: function onSubmit() {
      return openPress();
    },
    onCancel: function onCancel() {
      return cancelPress();
    },
    content: "Enter link #:",
    height: 1,
    style: {
      bg: "blue",
      fg: "white"
    }
  }, /*#__PURE__*/React.createElement("textarea", {
    ref: textAreaRef,
    width: 4,
    style: {
      bg: "blue",
      fg: "white"
    },
    left: 15,
    content: initialRefNum
  })));
}
export default RefBox;
//# sourceMappingURL=RefBox.js.map