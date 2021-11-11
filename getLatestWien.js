const https = require('https');
const fs = require('fs');
const axios = require('axios');


https.globalAgent.options.ca = fs.readFileSync('./certs/weekinethereumnews.com');

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

export async function getLatestWien() {
  const {data} = await axios.get('https://weekinethereumnews.com/');
	return data;
}

