#!/usr/bin/env node
'use strict';
import meow from 'meow'
import wienr from '.'
import figures, {mainSymbols} from 'figures';

const help = `
wienr is the (unofficial) Week in Ethereum News Reader

You can:
  - Get the latest newsletter ${figures.arrowRight} $ wienr 
  - Get previous newsletters ${figures.arrowRight} $ wienr ${figures.arrowRight} (see in app help: press 'h' ) 
  - Search *all* newsletters ${figures.arrowRight} $ wienr -s 'search terms'
`   

const cli = meow(
 {
	flags: {
		search: {
			type: 'boolean',
			alias: 's'
		}
	}
});

wiener(cli.input[0], cli.flags);
