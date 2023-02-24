import _defineProperty from "@babel/runtime/helpers/defineProperty";
import blessed from 'blessed';
import React from 'react';
import { render } from 'react-blessed';
import App from './components/App.js';
import https from 'https';
import { cert } from '../../certs/weekinethereumnews.com.js';
https.globalAgent.options.ca = cert;
var screen = blessed.screen(_defineProperty({
  //  autoPadding: true,
  smartCSR: true,
  title: 'wiener',
  fullUnicode: true,
  handleUncaughtExceptions: true,
  ignoreDockContrast: true,
  dockBorders: true
}, "ignoreDockContrast", true));
screen.key(['q', 'C-c'], function (ch, key) {
  process.exit(0);
});
export function start() {
  render( /*#__PURE__*/React.createElement(App, null), screen);
}
//# sourceMappingURL=start.js.map