import meow from 'meow'
import figures, {mainSymbols} from 'figures';
import {start} from './ui/start.js';

const help = `
wienr is the (unofficial) Week in Ethereum News Reader

You can:
  - Get the latest newsletter ${figures.arrowRight} $ wienr 
  - Get previous newsletters ${figures.arrowRight} $ wienr ${figures.arrowRight} (see in app help: press 'h' ) 
  - Search *all* newsletters ${figures.arrowRight} $ wienr -s 'search terms'
`   

const cli = meow({
	flags: {
		search: {
			type: 'boolean',
			alias: 's'
		}
	}
});


try {
  start()
} catch(e) {
  throw new Error(e)
}
