import meow from 'meow'
import {start} from './ui/start.js';
import {text} from './ui/components/HelpPage.js'

const help = `
Week in Ethereum News Reader 

$ wienr

-  Read  
-  Search archive 
-  Jog recent 
-  Launch urls
-  (auto-updates)

----------------------------
${text}

`   

const cli = meow(help, {
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
  start()
}
