import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import React, { useState, useEffect } from 'react';
import MainBox from './MainBox.js';
import SearchPage from './SearchPage.js';
import HelpPage from './HelpPage.js';
import { useCtrReducer, useInitLoad, useGetWien, useUpdateNewsletters } from '../customHooks/index.js';
function App(props) {
  var _useState = useState(""),
    _useState2 = _slicedToArray(_useState, 2),
    dateFromSearch = _useState2[0],
    setDateFromSearch = _useState2[1];
  var _useState3 = useState(null),
    _useState4 = _slicedToArray(_useState3, 2),
    lineFromSearch = _useState4[0],
    setLineFromSearch = _useState4[1];
  var _useState5 = useState(""),
    _useState6 = _slicedToArray(_useState5, 2),
    message = _useState6[0],
    setMessage = _useState6[1];
  var _useCtrReducer = useCtrReducer(),
    _useCtrReducer2 = _slicedToArray(_useCtrReducer, 2),
    _useCtrReducer2$ = _useCtrReducer2[0],
    loadState = _useCtrReducer2$.loadState,
    helpPageHidden = _useCtrReducer2$.helpPageHidden,
    searchPageHidden = _useCtrReducer2$.searchPageHidden,
    popUpMessage = _useCtrReducer2$.popUpMessage,
    ctrDispatch = _useCtrReducer2[1];
  var _useInitLoad = useInitLoad(ctrDispatch, loadState),
    _useInitLoad2 = _slicedToArray(_useInitLoad, 3),
    dateLatestPub = _useInitLoad2[0],
    hasInternet = _useInitLoad2[1],
    hasLatestInArchive = _useInitLoad2[2];
  var _ref = useGetWien(loadState, ctrDispatch, hasLatestInArchive, hasInternet, dateFromSearch, setDateFromSearch, dateLatestPub) || {},
    text = _ref.text,
    date = _ref.date;
  useUpdateNewsletters(dateLatestPub, hasLatestInArchive, hasInternet, text);
  useEffect(function () {
    if (!hasInternet && loadState === 'none') {
      setTimeout(function () {
        return null;
      }, 5000);
      setMessage("Error: newsletter DB is empty and there is no internet. connect to internet to populate newsletter db");
    }
    if (loadState === 'loading') {
      setMessage("Loading...");
    }
  }, [hasInternet, loadState]);
  return /*#__PURE__*/React.createElement(MainBox, {
    setDateFromSearch: setDateFromSearch,
    setLineFromSearch: setLineFromSearch,
    lineFromSearch: lineFromSearch,
    searchPageHidden: searchPageHidden,
    renderText: text,
    ctrDispatch: ctrDispatch,
    helpPageHidden: helpPageHidden,
    message: message,
    popUpMessage: popUpMessage,
    loadState: loadState
  });
}
export default App;
//# sourceMappingURL=App.js.map