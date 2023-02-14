#!/usr/bin/env node
import meow from 'meow'
import {start} from './ui/start.js';
import {text} from './ui/components/HelpPage.js'
import chalk from 'chalk' 
import boxen from 'boxen' 
let _text = boxen(text, {width: 80, padding: 1, borderStyle: 'classic'})

const help = `
${_text}

${chalk.blue('Week in Ethereum News Reader')}

${chalk.blue('$')} wienr

-  Read  
-  Search archive 
-  Jog recent 
-  Launch urls
-  (auto-updates)

${chalk.blue('$')} wienr --help 
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
