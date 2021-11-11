#!/usr/bin/env node




const markdown = ` Week in Ethereum News                               

# {"linkText":"Week in Ethereum News","url":"https://weekinethereumnews.com/"}

## {"linkText":"Week in Ethereum News  \nOctober 30, 2021","url":"https://weekinethereumnews.com/week-in-ethereum-news-october-30-2021/"}

###### Eth News and Links

Mainnet execution layer

    * Latest {"linkText":"core devs call video","url":"https://youtu.be/5cOWjMAuReI"}. Notes from {"linkText":"Tim Beiko","url":"https://twitter.com/TimBeiko/status/1454188180609986564"}:     * client teams reworking Amphora prototypes into their core codebase
        * Discussion of small tweaks to EIP1559 for PoS (EIP4396)
        * Ethereum {"linkText":"statelessness roadmap","url":"https://notes.ethereum.org/Yn_mwNa2SeeQHnKsRgekKg"} discussion
    * {"linkText":"Bayesian network modeling","url":"https://consensys.net/blog/research-development/measuring-the-health-of-the-ecosystem-in-a-stateless-ethereum"} of Stateless Ethereum`




function debug() {

const processString = require('react-process-string')

let config = [{
  regex: /\{"(linkText":".+?)","url":"(https?:\/\/.+?)"\}/gm,
  fn: (key, result) => `${result[2]}`
}]

const processed = processString(config)(markdown)

console.log(processed)
}

debug()

