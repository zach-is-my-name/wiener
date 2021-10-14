const blessed = require('blessed');

const boxOptions = {
  top: 'center',
  left: 'center',
  width: '100%',
  height: '100%',
  tags: true,
  scrollable: true,
  mouse: true,
}

const cursorOptions = {
  width: 1,
  height: 1,
  style: {
    fg: 'white',
    bg: 'white',
  },
}

const inputFieldOptions = {
  input: true,
  keys: true,
  top: 'center',
  left: 'center',
  width: '100%',
  height: 3,
  border: {
    type: 'line',
  },
}

exports.boxOptions = boxOptions;
exports.cursorOptions = cursorOptions;
exports.inputFieldOptions = inputFieldOptions;
