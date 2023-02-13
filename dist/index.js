import meow from 'meow';
import { start } from './ui/start.js';
import { text } from './ui/components/HelpPage.js';
var help = "\nWeek in Ethereum News Reader \n\n$ wienr\n\n-  Read  \n-  Search archive \n-  Jog recent \n-  Launch urls\n-  (auto-updates)\n\n----------------------------\n".concat(text, "\n\n");
var cli = meow(help, {
  flags: {
    help: {
      type: 'boolean',
      alias: 'h'
    }
  }
});
if (cli.flags.help) {
  console.log(cli.help);
  process.exit(0);
} else {
  start();
}
//# sourceMappingURL=index.js.map