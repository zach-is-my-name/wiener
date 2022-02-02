#! /usr/bin/env node
import meow from 'meow'
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

export const argObj = {input: cli.input[0], flags: cli.flags}

const main = async () => {

//require("@babel/register")({
 // presets: [["@babel/preset-env"], ["@babel/preset-react"]],
//});

};

main(); 
//require("./App");
//require("./archive/convert")
