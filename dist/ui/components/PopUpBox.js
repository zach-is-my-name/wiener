import React, { useEffect, useRef } from 'react';
function PopUpBox(props) {
  var boxRef = useRef(null);
  useEffect(function () {
    if (!props.popUpBoxHidden) {
      var _boxRef$current, _boxRef$current2;
      (_boxRef$current = boxRef.current) === null || _boxRef$current === void 0 ? void 0 : _boxRef$current.focus();
      (_boxRef$current2 = boxRef.current) === null || _boxRef$current2 === void 0 ? void 0 : _boxRef$current2.key('escape', function (ch, key) {
        props.ctrDispatch({
          type: "clearPopUpMessage"
        });
      });
      setTimeout(function () {
        return props.ctrDispatch({
          type: "clearPopUpMessage"
        });
      }, 4000);
    }
  }, []);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("box", {
    border: {
      type: 'line'
    },
    top: "center",
    width: "25%",
    left: "center",
    height: "15%",
    content: props.popUpMessage,
    ref: boxRef
  }));
}
export default PopUpBox;
//# sourceMappingURL=PopUpBox.js.map