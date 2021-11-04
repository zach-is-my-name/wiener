  const markdown = ` Week in Ethereum News                               

# {"linkText":"Week in Ethereum News","url":"https://weekinethereumnews.com/"}

## {"linkText":"Week in Ethereum News  \nOctober 30, 2021","url":"https://weekinethereumnews.com/week-in-ethereum-news-october-30-2021/"}

###### Eth News and Links

Mainnet execution layer

    * Latest {"linkText":"core devs call video","url":"https://youtu.be/5cOWjMAuReI"}. Notes from {"linkText":"Tim Beiko","url":"https://twitter.com/TimBeiko/status/1454188180609986564"}:     * client teams reworking Amphora prototypes into their core codebase
        * Discussion of small tweaks to EIP1559 for PoS (EIP4396)
        * Ethereum {"linkText":"statelessness roadmap","url":"https://notes.ethereum.org/Yn_mwNa2SeeQHnKsRgekKg"} discussion
    * {"linkText":"Bayesian network modeling","url":"https://consensys.net/blog/research-development/measuring-the-health-of-the-ecosystem-in-a-stateless-ethereum"} of Stateless Ethereum
    * UPDATE GETH: {"linkText":"security advisory","url":"https://github.com/ethereum/go-ethereum/security/advisories/GHSA-59hh-656j-3p7v"} for versions prior to v1.10.9, DoS vuln via maliciously crafted p2p message
    * Erigon {"linkText":"v2021.10.05","url":"https://github.com/ledgerwatch/erigon/releases/tag/v2021.10.05"}, upgrade immediately if using v2021.10.04, txpool v2 now default, better dev mode
        * Erigon to {"linkText":"transition out of alpha to beta","url":"https://github.com/ledgerwatch/erigon/wiki/Erigon-Beta-1-announcement"} with next release
    * Nethermind {"linkText":"v1.11.6","url":"https://github.com/NethermindEth/nethermind/releases/tag/1.11.6"}, better tracing, importing networking protocol fixes for eth/66
    * Tim Beiko’s {"linkText":"Core Devs Update","url":"https://tim.mirror.xyz/sR23jU02we6zXRgsF_oTUkttL83S3vyn05vJWnnp-Lc"}. Explains reasoning for delaying the difficulty bomb and a high-level explanation of the architecture to switch off PoW

EIPs/Standards

    * {"linkText":"EIP4396","url":"https://github.com/ethereum/EIPs/blob/186f930697148e0eb2b526d9f16b06bf2e4ae605/EIPS/eip-4396.md"}: Time-Aware Base Fee Calculation

Proof of Stake consensus layer

    * Beacon chain upgraded to {"linkText":"Altair","url":"https://twitter.com/dapplion/status/1453322075951845385"}: no issues and high participation
    * Proposal to {"linkText":"change fork choice rule","url":"https://ethresear.ch/t/change-fork-choice-rule-to-mitigate-balancing-and-reorging-attacks/11127"} to mitigate balancing and reorging attacks
    * {"linkText":"Validator priority fees","url":"https://twitter.com/trent_vanepps/status/1453085448482476037"} (post PoW switch off) can be sent to any address
    * {"linkText":"Consensus spec in Rust","url":"https://github.com/ralexstokes/ethereum_consensus"}, work in progress
    * Paper on {"linkText":"formalizing the beacon chain in Dafny","url":"https://arxiv.org/pdf/2110.12909v1.pdf"} [PDF]

Layer2

    * {"linkText":"Phonon","url":"https://blog.gridplus.io/worlds-first-phonon-transfer-601818203a0c"}: first hardware-enforced private off chain memecoin transaction  
    * StarkNet proof test transaction on {"linkText":"mainnet","url":"https://twitter.com/CairoLang/status/1453287662777929743"}
    * {"linkText":"Arbitrum ERC20 permissionless bridging","url":"https://twitter.com/arbitrum/status/1451661392281579530"} now open
    * {"linkText":"Hubble (optimistic rollup) explainer","url":"https://twitter.com/bkiepuszewski/status/1452292847194021901"}, being used by Worldcoin
    * Optimism {"linkText":"EVM equivalence","url":"https://medium.com/ethereum-optimism/introducing-evm-equivalence-5c2021deb306"} (and they {"linkText":"hired Proto","url":"https://twitter.com/protolambda/status/1453899762613334019"}!)



### This newsletter is made possible thanks to {"linkText":"Kwenta","url":"https://kwenta.io/"} by {"linkText":"Synthetix","url":"https://synthetix.io/"}!

![Kwenta](https://weekinethereumnews.com/wp-content/uploads/2021/04/IMG_20210418_190328_618-1024x512.jpg)


{"linkText":"Kwenta","url":"https://kwenta.io/"} enables traders to access real-world and derivative assets on-chain using the power of the Synthetix protocol. 

Long or short popular synthetic cryptocurrencies, commodities, forex, and equities without the limits or compromises of a centralized exchange. 

You can now also use {"linkText":"L2 Kwenta on Optimism","url":"https://blog.kwenta.io/everything-you-need-to-know-about-using-kwenta-on-l2/"} for low gas fees and blazing fast transactions!

Decentralized Perpetual Futures coming soon.



Stuff for developers

    * {"linkText":"Nomic Labs (HardHat) building","url":"https://medium.com/nomic-labs-blog/slang-rethnet-2ad465fd7880"} Rethnet (local EVM devnet written in Rust) and Slang (Solidity compiler aimed at devtools)
    * Remix IDE {"linkText":"v0.19.0","url":"https://medium.com/remix-ide/remix-v0-19-0-is-released-ab34453504f0?source=friends_link&sk=0944a9d494252154b287537aa03c0fee"}
    * solmate {"linkText":"v5.0.0","url":"https://twitter.com/transmissions11/status/1452035088481349633"} (Solidity contracts): SSTORE2, CREATE3, fixed point math library, flexible authorization and ERC20 permit replay protection
    * {"linkText":"Studio 721","url":"https://www.721.so/"}: configure, deploy and verify ERC721 NFT extending from OpenZeppelin Contracts, use at own risk and test on Rinkeby
    * New {"linkText":"Typechain releases","url":"https://github.com/dethcrypto/TypeChain/releases"}: exported Solidity structs, better error handling
    * {"linkText":"hardhat-shorthand","url":"https://hardhat.org/guides/shorthand.html"}: global npm package called hh that runs locally installed Hardhat with support for shell auto completion of tasks 
    * Etherscan adds {"linkText":"Solidity custom error messages","url":"https://twitter.com/etherscan/status/1452955443991494661"}
    * {"linkText":"ethers.js","url":"https://twitter.com/wslyvh/status/1453374517859045380"} supports getting ENS avatar from provider in single call
    * Guide to {"linkText":"NFT trait reveal using Pinata","url":"https://medium.com/pinata/how-to-prevent-nft-trait-sniping-in-your-pfp-project-506f17ff07d6"}
    * {"linkText":"honestnft-shenanigans","url":"https://github.com/Convex-Labs/honestnft-shenanigans"} (Python): NFT rarity tools, metadata download, rarity rank, rarity map, pull minting data and generate ks-test scores
    * Guide to {"linkText":"TrueBlocks chifra","url":"https://tjayrush.medium.com/calling-smart-contracts-with-chifra-state-call-ea03b8d35ea7"} to query contract values from the command line and build a history of the entire address/token
    * {"linkText":"trueblocks-plotter","url":"https://github.com/ScopeLift/trueblocks-plotter"}: plot historical data over a given timeframe using simple config file
    * {"linkText":"STARKs tutorial","url":"https://aszepieniec.github.io/stark-anatomy/"} with supporting Python code
    * {"linkText":"zk-NFT","url":"https://github.com/kevinz917/zk-NFT"}: allows users to prove, without revealing, ownership and metadata characteristics using zkSNARKs
    * samczsun’s {"linkText":"Pinball CTF","url":"https://rinkeby.etherscan.io/address/0xffb9205c84d0b209c215212a3cdfc50bf1cfb0e0#code"} on Rinkeby, {"linkText":"solution","url":"https://twitter.com/karmacoma_eth/status/1451625194380939270"} using symbolic execution

Security

    * CREAM v1 lending markets {"linkText":"exploited","url":"https://mudit.blog/cream-hack-analysis/"}, ~$130 million removed, not suitable for volatile price tokens such as yUSD Yearn Vault
    * {"linkText":"Aave to disable borrowing of xSushi/DPI","url":"https://twitter.com/AaveAave/status/1454119658840367114"} due to concern over the same bug, though safe under current conditions
    * Aztec $50k bug bounty for {"linkText":"double-spend vulnerability","url":"https://twitter.com/aztecnetwork/status/1453773879898378241"}, emulating non-native field operations
    * Ondo Finance {"linkText":"transposition bug","url":"https://twitter.com/ondofinance/status/1453606775530262537"}, ETH was incorrectly swapped for CVX and YGG, no customer funds lost

Ecosystem

    * {"linkText":"Data visualization of EIP1559 Eth burning over time","url":"https://twitter.com/Data_Always/status/1454166645203783691"} showing this week’s negative Eth issuance
    * {"linkText":"0xPARC","url":"https://0xparc.org/blog/program-for-applied-research"}: Program for Applied Research in Cryptography, a two year mandate to make zk dapps and zk tooling happen 
    * {"linkText":"Devcon Bogota in Q3 2022","url":"https://twitter.com/EFDevcon/status/1453783632208928770"}, hints at early 2022 event

 

Enterprise

    * {"linkText":"Adobe Content Credentials","url":"https://blog.adobe.com/en/publish/2021/10/26/adobe-unleashes-content-attribution-features-photoshop-beyond-max-2021.html"} displayed by NFT marketplaces to prove creator of the work
    * {"linkText":"McDonald’s USA giving away 10 NFTs","url":"https://corporate.mcdonalds.com/corpmcd/en-us/our-stories/article/OurStories.40-anniversary-mcrib.html"} for 40th anniversary of McRib
    * {"linkText":"The Economist","url":"https://www.economist.com/finance-and-economics/2021/10/26/how-the-auction-of-our-nft-cover-went"}{"linkText":"’s crypto cover","url":"https://www.economist.com/finance-and-economics/2021/10/26/how-the-auction-of-our-nft-cover-went"} sold as an NFT for 99.9ETH
    * Disney {"linkText":"Golden Moments NFT collection","url":"https://medium.com/veve-collectibles/veve-celebrates-disney-day-1314376a017a"} on VeVe (Immutable X)
    * {"linkText":"Bank of Israel trialed Ethereum","url":"https://en.globes.co.il/en/article-bank-of-israel-gets-its-hands-dirty-with-digital-currency-1001387854"} for CDBC

Application layer

    * {"linkText":"Uniswap passes $500 billion trading volume","url":"https://twitter.com/uniswap/status/1452673839654113291"} since launch, $2 billion trading volume on Arbitrum and Optimism
    * {"linkText":"Yield Protocol v2 beta","url":"https://medium.com/yield-protocol/yield-protocol-v2-is-live-in-beta-cf547f18cb5f"} live on mainnet
    * Simon de la Rouviere: {"linkText":"Decentralized Autonomous Artists","url":"https://blog.simondlr.com/posts/decentralized-autonomous-artists"}
    * {"linkText":"Moonshot zk applications","url":"https://gubsheep.substack.com/p/six-moonshot-zk-applications"}: MMO strategy games, secret data marketplaces, onchain Minecraft, machine learning oracles, trading card games and message boards
    * {"linkText":"NFT of 1 months lease","url":"https://mirror.xyz/puniaviision.eth/13EYhkOirEJNxpJB6PssN-2tLs6R1VRinhWc2mwLlbg"} on Manhattan apartment
    * {"linkText":"CryptoPunk bought by owner with flash loan","url":"https://twitter.com/larvalabs/status/1453903818308083720"} for $500 million, owner then repaid the loan



### Job Listings

    * Nomic Labs hiring {"linkText":"Tech Lead for Hardhat VSCode","url":"https://nomiclabs.notion.site/Senior-Software-Engineer-Hardhat-VSCode-23cfe4ccf56846ada207c83e3a2830c3"}
    * {"linkText":"Team Lead","url":"https://ethereum.bamboohr.com/jobs/view.php?id=43&source=weekinethnews"} for the Ecosystem Support Program at the Ethereum Foundation
    * Solidity is {"linkText":"hiring a C++ dev","url":"https://ethereum.bamboohr.com/jobs/view.php?id=40&source=weekinethnews"}

Reach people experienced with Ethereum.  $420 for two issues (~75 character limit), payable in ETH/DAI/USDC to abcoathup.eth.  Questions? abcoathup at-gmail



Regulation/business/tokens

    * {"linkText":"Ethereum Q3 financial results","url":"https://newsletter.banklesshq.com/p/the-state-of-ethereum-q3-2021"} by Bankless, year on year revenue up 511%
    * Potential {"linkText":"legal framework for DAOs","url":"https://a16z.com/wp-content/uploads/2021/10/DAO-Legal-Framework-Jennings-Kerr10.19.21-Final.pdf"} [PDF], register as unincorporated nonprofit associations in US states that recognize this
    * {"linkText":"Mirror Protocol founder suing US SEC","url":"https://twitter.com/0xfoobar/status/1451712126125428738"} for being served a subpoena at Mainnet
    * Jake Chervinsky tweet thread of {"linkText":"FATF updated crypto AML guidance","url":"https://twitter.com/jchervinsky/status/1453764246278483971"}, now even more vague
    * DeFi treasuries: {"linkText":"native tokens are not assets","url":"https://uncommoncore.co/a-new-mental-model-for-defi-treasuries/"} 
    * {"linkText":"Why DeFi summer was just the beginning","url":"https://twitter.com/kaiynne/status/1453475043128881162"}, a Kain Warwick thread, open, transparent & composable protocols will capture large amount of value

General

    * {"linkText":"UAParser.js JavaScript library","url":"https://therecord.media/malware-found-in-npm-package-with-millions-of-weekly-downloads/"} npm account hijacked and versions published with malware and crypto miner
    * {"linkText":"Google and Facebook alleged collusion","url":"https://twitter.com/PatrickMcGee_/status/1451619916994396164"} in online advertising



Follow {"linkText":"@WeekinEthNews","url":"https://twitter.com/WeekInEthNews"} to find out what the most clicked links are. Follow {"linkText":"@evan\_van\_ness","url":"https://twitter.com/evan_van_ness"} and {"linkText":"@abcoathup","url":"https://twitter.com/abcoathup"} to get most of the week’s news in real time.

Permalink for this week’s issue: {"linkText":"https://weekinethereumnews.com/week-in-ethereum-news-october-30-2021","url":"https://weekinethereumnews.com/week-in-ethereum-news-october-30-2021/"}



###### Dates of Note

Upcoming dates of note (new/changes in bold):

    * Oct 25 – Dec 13 – {"linkText":"Gitcoin DAO Global hackathon","url":"https://gitcoin.co/hackathon/dao-global/onboard"} (virtual)
    * Nov 1-4 – {"linkText":"NFT.NYC","url":"https://www.nft.nyc/"}
    * Nov 5 – PoW switch off {"linkText":"community call","url":"https://twitter.com/trent_vanepps/status/1452680694698856460"}
    * Nov 11 – {"linkText":"Optimism upgrade","url":"https://twitter.com/optimismPBC/status/1451339513964359682"}
    * Nov 16 – {"linkText":"Formal Verification in the Ethereum Ecosystem","url":"https://runtimeverification.com/events/formalverificationeth/"}
    * Dec ~8 – {"linkText":"Arrow Glacier","url":"https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/arrow-glacier.md"} upgrade block 13,773,000
    * Jan 24-26 – {"linkText":"Science of Blockchain Conference","url":"https://cbr.stanford.edu/sbc22/"} (Stanford University)
    * Feb 11-20 – {"linkText":"ETHDenver","url":"https://www.ethdenver.com/"}
    * Mar 28-30 – {"linkText":"ETHDubai","url":"https://www.ethdubai.xyz/"}

Did you get forwarded this newsletter? {"linkText":"Sign up","url":"https://weekinethereum.substack.com/subscribe#about"} to receive it weekly

{"linkText":"RSS","url":"https://weekinethereumnews.com/feed/"}`


