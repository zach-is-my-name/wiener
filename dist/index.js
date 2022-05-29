import meow from 'meow';
import figures, { mainSymbols } from 'figures';
import { start } from './ui/components/App.js';
var help = "\nwienr is the (unofficial) Week in Ethereum News Reader\n\nYou can:\n  - Get the latest newsletter ".concat(figures.arrowRight, " $ wienr \n  - Get previous newsletters ").concat(figures.arrowRight, " $ wienr ").concat(figures.arrowRight, " (see in app help: press 'h' ) \n  - Search *all* newsletters ").concat(figures.arrowRight, " $ wienr -s 'search terms'\n");
var cli = meow({
  flags: {
    search: {
      type: 'boolean',
      alias: 's'
    }
  }
});
export var argObj = {
  input: cli.input[0],
  flags: cli.flags
};
start(argObj);