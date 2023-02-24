import React from 'react';
import chalk from 'chalk';
var text = "\n?      ............... help\nq      ............... quit (usually)  \nCtrl-c ............... quit (always) \nesc    ............... back\n\nMove\nj / up ......................... up\nk / down ....................... down\nh / l .......................... left/right\nw / b .......................... 10 chars. right/left\n{ / } .......................... 10 chars. up/down \ng / home  ...................... top  \nG / end   ...................... bottom \n0  ............................. begin. line\n$  ............................. end line\nCtrl-u / Pg Up.................. 20 chars. up/down\nCtrl-d / Pg Dn ................. 20 chars. up/down\n\nNav\n0-99  ........................ type link ref #  \nenter ........................ confirm typed link ref # /\n                               follow link ref # under cursor                   \n                               (opens link in default browser)\nH (shift-h) .................. goto prev. newsletter\nL (shift-l) .................. goto next newsletter\nS (shift-s) .................. search page\nCtrl-h / backspace............ goto most recent newsletter in archive \n\n\nSearch Page \n\n  Search Box\nesc   ........................ exit search\nenter ........................ focus results\n\n  Search Results\nj/k   ......................... up/down results\nenter ......................... select result (goto newsletter)\n\n$ wienr --help \n\n$ wienr --version\n\n$ wienr --bug\n";
function HelpPage(_ref) {
  var helpPageHidden = _ref.helpPageHidden,
    ctrDispatch = _ref.ctrDispatch;
  var handleKeyPress = function handleKeyPress(ch, key) {
    setImmediate(function () {
      if (key.full === 'escape') {
        ctrDispatch({
          type: "toggleHelpPage"
        });
      }
    });
  };
  return /*#__PURE__*/React.createElement("box", {
    top: "top",
    left: "15%",
    width: "100%",
    height: "100%",
    focused: true,
    hidden: helpPageHidden,
    onKeypress: handleKeyPress,
    content: text,
    scrollable: true,
    alwaysScroll: true,
    keys: true,
    vi: true
  });
}
export default HelpPage;
export { text };
//# sourceMappingURL=HelpPage.js.map