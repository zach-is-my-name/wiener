import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import React, { useLayoutEffect, useEffect, useState, useRef } from 'react';
import { useSearchWien } from '../customHooks/useSearchWien.js';
function SearchPage(_ref) {
  var searchPageHidden = _ref.searchPageHidden,
    setDateFromSearch = _ref.setDateFromSearch,
    setLineFromSearch = _ref.setLineFromSearch,
    ctrDispatch = _ref.ctrDispatch;
  var isMounted = useRef(false);
  var textBoxRef = useRef(null);
  var listRef = useRef(null);
  var _useState = useState(""),
    _useState2 = _slicedToArray(_useState, 2),
    query = _useState2[0],
    setQuery = _useState2[1];
  var _useState3 = useState([]),
    _useState4 = _slicedToArray(_useState3, 2),
    items = _useState4[0],
    setItems = _useState4[1];
  var _useState5 = useState([]),
    _useState6 = _slicedToArray(_useState5, 2),
    dateIndex = _useState6[0],
    setDateIndex = _useState6[1];
  var _useState7 = useState('textBox'),
    _useState8 = _slicedToArray(_useState7, 2),
    focus = _useState8[0],
    setFocus = _useState8[1];
  useEffect(function () {
    isMounted.current = true;
    return function () {
      isMounted.current = false;
    };
  }, []);
  useEffect(function () {
    if (focus === 'textBox' && !searchPageHidden) {
      textBoxRef.current.focus();
    } else if (focus === 'list' && !searchPageHidden) {
      listRef.current.pick(function () {});
    }
  }, [focus, searchPageHidden]);
  var handleKeyPressTextbox = function handleKeyPressTextbox(ch, key) {
    setImmediate(function () {
      if (key.name === 'enter') {
        setFocus("list");
      } else if (key.full === 'C-c') {
        process.exit(0);
      } else if (isMounted.current === true) {
        useSearchWien(textBoxRef.current.value, setItems, setDateIndex, ctrDispatch, isMounted);
      }
      if (key.name === 'escape') {
        ctrDispatch({
          type: "exitSearchPage"
        });
      }
    });
  };
  var handleSelect = function handleSelect(item, index) {
    if (items.length) {
      var res = dateIndex.find(function (obj) {
        return obj.index === index;
      });
      var date = res.date,
        line = res.line;
      setDateFromSearch(date);
      setLineFromSearch(line);
      ctrDispatch({
        type: "loadFromSearch"
      });
      ctrDispatch({
        type: "toggleRenderSearch"
      });
    }
  };
  return /*#__PURE__*/React.createElement("form", {
    onReset: function onReset() {
      return ctrDispatch({
        type: "toggleRenderSearch"
      });
    },
    left: "1%",
    top: "5%",
    width: "99%",
    hidden: searchPageHidden,
    height: "99%",
    name: "form_"
  }, /*#__PURE__*/React.createElement("box", {
    top: "5%",
    width: "80%",
    height: 3,
    left: "center",
    border: {
      type: 'line'
    },
    style: {
      border: {
        fg: 'white'
      }
    }
  }, "Search:", /*#__PURE__*/React.createElement("textbox", {
    ref: textBoxRef,
    top: "5%",
    left: "10%",
    width: "70%",
    onKeypress: handleKeyPressTextbox,
    inputOnFocus: true,
    keys: true,
    mouse: true,
    name: "thin-textBox"
  })), /*#__PURE__*/React.createElement("list", {
    height: "85%",
    top: "13%",
    width: "80%",
    left: "center",
    onKeypress: function onKeypress(ch, key) {
      if (key === 'escape') {
        ctrDispatch({
          type: "exitSearchPage"
        });
      } else if (key.full === 'C-c') {
        process.exit(0);
      }
    },
    items: items,
    onSelect: handleSelect,
    onCancel: function onCancel() {
      return ctrDispatch({
        type: "exitSearchPage"
      });
    },
    keys: true,
    vi: true,
    name: "list",
    border: {
      type: 'line'
    },
    style: {
      selected: {
        fg: 'black',
        bg: 'yellow'
      },
      border: {
        fg: 'white'
      }
    },
    ref: listRef
  }));
}
export default SearchPage;
//# sourceMappingURL=SearchPage.js.map