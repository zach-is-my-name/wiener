const https = require('https');
const fs = require('fs');
const axios = require('axios');
const cheerio = require('cheerio');
const hermit = require('hermit');

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

async function showHtml() {
	const html = await getLatestWein()
  hermit(html, function(err, res) {
		console.log(err || res)
	})
}

showHtml();


















