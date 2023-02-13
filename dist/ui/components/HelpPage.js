import React from 'react';
import chalk from 'chalk';
var text = "\n?      ............... help\nq      ............... quit (usually)  \nCtrl-c ............... quit (always) \nesc    ............... back\n\nMove\nj / k .......................... up/down\nh / l .......................... left/right\nw / b .......................... 10 chars. right/left\n{ / } .......................... 10 chars. up/down \ng  ........................... top  \nG  ........................... bottom \n0  ........................... begin. line\n$  ........................... end line\nCtrl-u/Ctrl-d ................ 20 chars. up/down\n\nNav\n0-99  ........................ type link ref #  \nenter ........................ confirm typed link ref # / follow link ref # under cursor (opens link in default browser)\nH (shift-h) .................. goto prev. newsletter\nL (shift-l) .................. goto next newsletter\nS (shift-s) .................. search page\nCtrl-h / backspace........... goto most recent newsletter in archive \n\n\nSearch Page \n\n  Search Box\nesc   ........................ exit search\nenter ........................ focus results\n\n  Search Results\nj/k   ......................... up/down results\nenter ......................... select result (goto newsletter)";
function HelpPage(_ref) {
  var helpPageHidden = _ref.helpPageHidden;
  return /*#__PURE__*/React.createElement("box", {
    top: "top",
    left: "15%",
    width: "100%",
    height: "100%",
    hidden: helpPageHidden,
    content: text
  });
}
export default HelpPage;
export { text };
//# sourceMappingURL=HelpPage.js.map