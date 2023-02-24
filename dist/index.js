#!/usr/bin/env node
import meow from 'meow';
import { start } from './ui/start.js';
import { text } from './ui/components/HelpPage.js';
import chalk from 'chalk';
import boxen from 'boxen';
import open from 'open';
var _text = boxen(text, {
  width: 80,
  padding: 1,
  borderStyle: 'classic'
});
var version = '1.0.10';
var help = "\n".concat(_text, "\n\n").concat(chalk.blue('Week in Ethereum News Reader'), "\n\n").concat(chalk.blue('$'), " wienr\n\n-  Read  \n-  Search archive \n-  Jog recent \n-  Launch urls\n-  (auto-updates)\n\n").concat(chalk.blue('$'), " wienr --help \n").concat(chalk.blue('$'), " wienr --version \n").concat(chalk.blue('$'), " wienr --bug (report)\n");
var cli = meow(help, {
  flags: {
    help: {
      type: 'boolean',
      alias: 'h'
    },
    version: {
      type: 'boolean',
      alias: 'v'
    },
    bug: {
      type: 'boolean',
      alias: 'b'
    }
  },
  version: "wienr version: " + version
});
if (cli.flags.help) {
  console.log(cli.help);
  process.exit(0);
} else if (cli.flags.version) {
  console.log(version);
  process.exit(0);
} else if (cli.flags.bug) {
  open('https://github.com/zach-is-my-name/wiener/issues/new');
  console.log("Thanks for filing a bug report. Form opened in default browser");
  setTimeout(function () {
    process.exit(0);
  }, 1000);
} else {
  start();
}
//# sourceMappingURL=index.js.map