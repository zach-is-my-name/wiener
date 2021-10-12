const https = require('https');
const fs = require('fs');
const axios = require('axios');
const cheerio = require('cheerio');
const TurndownService = require('turndown');
const  marked = require('marked');
const TerminalRenderer = require('marked-terminal');

//turndown 
const turndownOptions = {
  headingStyle: 'atx',
  bulletListMarker: '*',
	linkStyle: 'referenced',
}
const turndownFilter = ['script', 'footer', 'style', 'nav', 'center'];
const turndownService = new TurndownService(turndownOptions);
turndownService.remove(turndownFilter);

//marked
marked.setOptions({
  // Define custom renderer
  renderer: new TerminalRenderer(reflowText: true, )
});
{}

https.globalAgent.options.ca = fs.readFileSync('./certs/weekinethereumnews.com')

async function getCert() {

	const rootUrl = 'https://weekinethereumnews.com'

  try {
    const response = await axios.get(rootUrl);
    const cert = response.request.res.socket.getPeerCertificate(false);
    //console.log(cert)
    } catch (error) {
      console.log(error);
    }
}

async function getLatestWein() {
  const {data} = await axios.get('https://weekinethereumnews.com/');
	return data;
}

async function markupRender() {
	const html = await getLatestWein()
  const markdown = turndownService.turndown(html)
  console.log(marked(markdown))
}

markupRender();


















