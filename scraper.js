const https = require('https');
const fs = require('fs');
const axios = require('axios');
const cheerio = require('cheerio');
const hermit = require('hermit')

https.globalAgent.options.ca = fs.readFileSync('./certs/weekinethereumnews.com')
//const agent = new https.Agent({ ca: fs.readFileSync('./certs/weekinethereumnews.com') });

//const instance = axios.create({ httpsAgent: agent });
const rootUrl = 'https://weekinethereumnews.com'
async function getCert() {
  try {
    const response = await axios.get(rootUrl);
    const cert = response.request.res.socket.getPeerCertificate(false);
    console.log(cert)
    } catch (error) {
      console.log(error);
    }
}

//getCert();
//instance.get()
//  .then(response => console.log(reponse))

async function getLatestWein() {
  await axios.get('https://weekinethereumnews.com/')
     .then(response => {
        const html = response.data;      
        const $ = cheerio.load(html);
       hermit(html, function (err, res) {
	       console.log(html); 
       }); 
      })
     .catch(error =>  {
       console.log(error)
     })
}

getLatestWein();
