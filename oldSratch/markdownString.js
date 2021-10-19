   const markdownString = ( `Week in Ethereum News                               

# ["link", {text: "Week in Ethereum News", url:"https://weekinethereumnews.com/" }]

## ["link", {text: "Week in Ethereum News

October 16, 2021", url:"https://weekinethereumnews.com/week-in-ethereum-news-october-16-2021/" }]

###### Eth News and Links

Mainnet execution layer

    * Latest core devs call ["link", {text: "video", url:"https://www.youtube.com/watch?v=BTtwbvZZpfs&t=293s" }]. Notes from ["link", {text: "Tim Beiko", url:"https://twitter.com/timbeiko/status/1449047538103767044" }]:     * Aim for code to switch off PoW forever to be ready by Feb 2022
        * Arrow Glacier upgrade around 8 Dec (block 13,773,000) delays difficulty bomb to around June 2022 (offset 10,700,000) with buffer for longer rollout of PoW switch off if needed and/or large hash rate changes
        * OpenEthereum client is deprecated and won’t support PoW switch off
    * ["link", {text: "Calculating", url:"https://tjayrush.medium.com/adventures-in-difficulty-bombing-837890476630" }] the difficulty bomb offset for Arrow Glacier upgrade
    * Geth ["link", {text: "v1.10.10", url:"https://github.com/ethereum/go-ethereum/releases/tag/v1.10.10" }]: bug fixes
    * Erigon ["link", {text: "v2021.10.03", url:"https://github.com/ledgerwatch/erigon/releases/tag/v2021.10.03" }]: state cache on remote RPC daemons

EIPs/Standards

    * ["link", {text: "EIP4361", url:"https://github.com/ethereum/EIPs/blob/27b5497268bab4449cbe815ae9812388005d763b/EIPS/eip-4361.md" }]: Sign-In with Ethereum; project website: ["link", {text: "login.xyz", url:"https://login.xyz/" }]
    * ["link", {text: "EIP4363", url:"https://github.com/ethereum/EIPs/blob/556533cbe1257d570da179a20ccf1f2dcd4ff224/eip-4363.md" }]: Transaction index OpCode

Proof of stake consensus layer

    * Pithos public testnet (switch off PoW):     * Joining ["link", {text: "instructions", url:"https://github.com/parithosh/consensus-deployment-ansible/blob/master/README.md" }]
        * ["link", {text: "Video", url:"https://www.youtube.com/watch?v=mn8ZNrhTzLI" }] of setup on new Ubuntu installation
        * ["link", {text: "Explorer", url:"https://pithos-explorer.ethdevops.io/" }]
    * Recap of ["link", {text: "Amphora week", url:"https://blog.ethereum.org/2021/10/15/amphora-merge-milestone/" }] in Greece, execution and consensus layer client teams major milestone to switch off PoW forever
    * ["link", {text: "Annotated", url:"https://github.com/ethereum/annotated-spec/blob/master/merge/beacon-chain.md" }] beacon chain spec
    * Consensus layer specs ["link", {text: "v1.1.3", url:"https://github.com/ethereum/consensus-specs/releases/tag/v1.1.3" }]
    * Beacon chain API spec ["link", {text: "v2.1", url:"https://github.com/ethereum/beacon-APIs/releases/tag/v2.1.0" }]
    * Nimbus ["link", {text: "v1.5.1", url:"https://github.com/status-im/nimbus-eth2/releases/tag/v1.5.1" }]:users of v1.5.0 need to update, fix for deposit contract sync issue
    * Vitalik’s ["link", {text: "two-slot proposer/builder separation", url:"https://ethresear.ch/t/two-slot-proposer-builder-separation/10980" }] proposal for beacon chain
    * Stereum ["link", {text: "1.8", url:"https://stereum.net/ethereum-node-setup-1-8/" }] (beacon chain client installer): update for security fixes from audit
    * Péter’s ["link", {text: "minority client", url:"https://github.com/karalabe/minority" }]: orchestrator to only accept a state change if majority of multiple execution/consensus clients agree

Layer2

    * Demo of ["link", {text: "Uniswap v2 fork", url:"https://medium.com/matter-labs/unisync-a-port-of-uniswap-v2-on-the-zkevm-b12954748504" }] (Solidity contracts & dapp) on zkEVM testnet
    * zkSync Reddit ["link", {text: "AMA", url:"https://www.reddit.com/r/ethereum/comments/q8q822/ama_were_matter_labs_the_team_behind_zksync_the/" }]
    * ["link", {text: "Arbitrum Nitro", url:"https://medium.com/offchainlabs/arbitrum-nitro-sneak-preview-44550d9054f5" }] upgrade preview: runs on WASM, replaces custom EVM emulator with Geth, estimated 20-50x execution speed increase
    * zkevm-circuits ["link", {text: "v0.0.1", url:"https://github.com/appliedzkp/zkevm-circuits/releases/tag/v0.0.1" }]: first release, implements PUSHX, POP, ADD, SUB, LT, GT opcodes



### This newsletter is made possible thanks to ["link", {text: "Celer Network", url:"https://www.celer.network/" }]’s ["link", {text: "cBridge", url:"https://cbridge.celer.network/#/transfer" }]!

![Celer](https://weekinethereumnews.com/wp-content/uploads/2020/11/Screenshot-from-2020-11-22-15-36-32.png)


Celer Network is a layer-2 scaling platform that brings fast, secure and low-cost blockchain applications. Celer cBridge 1.0 is now live on mainnet. Users are now able to use cBridge to ["link", {text: "instantly transfer tokens across 10 different chains and optimistic rollups", url:"https://cbridge.celer.network/" }]. 

Since launch, cBridge has witnessed doubling weekly volume growth and reached over $500m total transaction volume today. 

Transfer between EVM chains and rollups instantly: ["link", {text: "cbridge.celer.network", url:"https://cbridge.celer.network/" }]



Stuff for developers

    * ["link", {text: "Replit", url:"https://blog.replit.com/solidity" }] (web based IDE) adds Solidity support: no setup, built in testnet, contract live editing (hot reloading), shareable dapps and contracts
    * ["link", {text: "Hardhat VSCode extension", url:"https://medium.com/nomic-labs-blog/hardhat-vscode-9de29467fc26" }] coming in 2022
    * ["link", {text: "EthernautDAO challenges", url:"https://github.com/ethernautdao/challenges" }]: complete challenges whilst learning Solidity and web3 development
    * ["link", {text: "Jolly Roger", url:"https://jolly-roger.eth.link/" }]: updated dapp template using Hardhat, Svelte and The Graph
    * ["link", {text: "Storage layout discovery", url:"https://blog.euler.finance/brute-force-storage-layout-discovery-in-erc20-contracts-with-hardhat-7ff9342143ed" }] in ERC20 contracts by brute force using Hardhat
    * Prysmatic Labs’ ["link", {text: "software design principles", url:"https://medium.com/prysmatic-labs/software-design-principles-applied-to-go-48c1dacfc37f" }] applied to Go
    * ["link", {text: "EthTx", url:"https://ethtx.info/" }] v.0.3.1: improved proxy processing, uses 4byte directory for unknown signatures, ENS aware 
    * ["link", {text: "topic0", url:"https://github.com/wmitsuda/topic0" }]: database of hashes to event log signatures, for log decoding, extracted from Sourcify verified contracts
    * ["link", {text: "RICKS", url:"https://github.com/FrankieIsLost/RICKS" }] NFT fractionalization implementation, but with deterministic buyout, on-demand auction and a staking pool
    * ["link", {text: "Guide to designing NFT launches", url:"https://www.paradigm.xyz/2021/10/a-guide-to-designing-effective-nft-launches/" }]: focus on unexploitable fairness, avoid race conditions and consider cost-efficiency; reference implementation
    * Circom ["link", {text: "v2.0", url:"https://blog.iden3.io/circom-2-is-released.html" }] (zero-knowledge circuit compiler), rewritten in Rust, 10x faster compilation
    * ["link", {text: "rk4-starknet", url:"https://github.com/guiltygyoza/rk4-starknet" }] (Cairo): Runge-Kutta 4th Order Method, precursor to on chain physics engine
    * MACI ["link", {text: "v1", url:"https://medium.com/privacy-scaling-explorations/release-announcement-maci-1-0-c032bddd2157" }]: contracts and zk circuits to build collusion resistant voting and quadratic funding platforms; v1 has improved developer experience and lower gas costs for users

Security

    * Indexed Finance ~$16 million ["link", {text: "exploit", url:"https://ndxfi.medium.com/indexed-attack-post-mortem-b006094f0bdc" }], approximated value of two pools was manipulated, ["link", {text: "MEV bot", url:"https://twitter.com/bertcmiller/status/1448728068353368069" }] made two ~$2 million arbs
    * Lido and RocketPool deposit frontrunning ["link", {text: "postmortem", url:"https://medium.com/immunefi/rocketpool-lido-frontrunning-bug-fix-postmortem-e701f26d7971" }]
    * Tincho from OpenZeppelin: ["link", {text: "strategies for safer governance systems", url:"https://blog.openzeppelin.com/smart-contract-security-guidelines-4-strategies-for-safer-governance-systems/" }]
    * ["link", {text: "Recovery of funds", url:"https://twitter.com/hexonaut/status/1449059591443165185" }] sent to mainnet contract address on Arbitrum

Ecosystem

    * ["link", {text: "Legacy transactions", url:"https://twitter.com/trent_vanepps/status/1448728441075949573" }] overpay $1-3 million a day, ~40% of transactions
    * ["link", {text: "ENS", url:"https://medium.com/the-ethereum-name-service/major-refresh-of-nft-images-metadata-for-ens-names-963090b21b23" }] updates NFT images, supports avatar as background image, using new metadata service
    * ["link", {text: "MetaMask opens .eth ENS websites", url:"https://twitter.com/brantlymillegan/status/1447608175805485069" }] with forward slash suffix e.g. vitalik.eth/
    * Phishing site opens ["link", {text: "fake MetaMask popup tab", url:"https://twitter.com/MyCrypto/status/1446688191021346822" }]
    * GasNow style ["link", {text: "gas estimation", url:"https://etherchain.org/tools/gasnow" }], with heatmap and compatible API
    * ETHOnline 2021 ["link", {text: "videos", url:"https://www.youtube.com/playlist?list=PLXzKMXK2aHh63KtTQ0wUWbFOR7hL9RpKM" }]

Enterprise

    * ["link", {text: "CAA signs 0xb1", url:"https://www.hollywoodreporter.com/business/digital/caa-signs-nft-0xb1-1235028362/" }] NFT collector for partnerships with blue chip brands

Application layer

    * DeFi ["link", {text: "v2.0", url:"https://thedefiant.io/olympusdao-uniswap-defi-2-0-liquidity-mining/" }]: experiments in protocol controlled liquidity as an alternative to liquidity mining (DeFi v1.0)
    * ["link", {text: "volmex.finance", url:"https://blog.volmex.finance/volmex-finance-v1-is-live-on-arbitrum/" }] v1 live on Arbitrum
    * ["link", {text: "Futureswap V4", url:"https://medium.com/futureswap/futureswap-v4-mainnet-beta-launch-89beef3c6a0d" }] beta on Arbitrum, trades 90% cheaper, executing in ~0.05 seconds
    * ["link", {text: "dYdX Solo", url:"https://dydx.exchange/blog/layer-1-wind-down" }] on mainnet winding down, close only mode from Nov 1
    * ["link", {text: "Pods", url:"https://blog.pods.finance/introducing-pods-3b08c90add0c" }] on-chain options protocol live on mainnet
    * ["link", {text: "Fuse", url:"https://twitter.com/RariCapital/status/1446490546218979329" }] allows permissionless pools
    * ["link", {text: "USM", url:"https://twitter.com/usmfum/status/1447437647727763456" }] stable token: minimalist ERC20 system, ownerless and immutable, consisting of a stable token and a volatile token
    * ["link", {text: "Umbra", url:"https://www.scopelift.co/blog/umbra-out-of-beta" }] stealth address payments out of beta, setup now single transaction
    * ["link", {text: "Gnosis Safe", url:"https://twitter.com/arbitrum/status/1448011308075470849" }] live on Arbitrum
    * ["link", {text: "Blitnauts", url:"https://blitmap.mirror.xyz/KrZT0ub7DqaLyEim5phEffpcNJboKdRHdBM5FgeAylc" }] released into public domain (CC0)
    * TikTok’s first NFT is Curtis Roach’s ["link", {text: "Bored in the House", url:"https://tiktok.immutable.com/auction/curtisroach" }]
    * Sotheby’s ["link", {text: "Metaverse", url:"http://metaverse.sothebys.com" }] curated NFT marketplace



### Job Listings

    * ["link", {text: "Senior Engineer @Gitcoin", url:"https://angel.co/company/gitcoin/jobs" }] – build the future of public goods funding!
    * Lodestar (consensus client) hiring ["link", {text: "TypeScript protocol engineer", url:"https://jobs.smartrecruiters.com/ChainSafeSystemsInc/743999774954864-protocol-engineer-lodestar-backend-typescript-" }]
    * ["link", {text: "Team Lead", url:"https://ethereum.bamboohr.com/jobs/view.php?id=43&source=weekinethnews" }] for the Ecosystem Support Program at the Ethereum Foundation
    * Ethereum Foundation: ["link", {text: "Research Intern", url:"https://ethereum.bamboohr.com/jobs/view.php?id=45&source=weekinethnews" }], read/think/write with Josh Stark

Reach people experienced with Ethereum.  $420 for two issues (~75 character limit), payable in ETH/DAI/USDC to abcoathup.eth. Questions? abcoathup at-gmail



Regulation/business/tokens

    * a16z agenda for policy makers: ["link", {text: "how to win the future", url:"https://a16z.com/wp-content/uploads/2021/10/How-to-Win-the-Future-Deck.pdf" }] (PDF deck), jurisdictional harmonization, protocol standards, regulatory sandboxes/safe harbors, 21st century regulation, clear tax rules, unlock DAOs, digital infrastructure strategy and align with sustainability
    * Coinbase’s ["link", {text: "digital asset policy proposal", url:"https://github.com/coinbase/digital-asset-policy-proposal" }], single US regulator, transparency via disclosure requirements, protect against fraud & market manipulation, promote efficiency, resiliency, interoperability and fair competition
    * US SEC Commissioner Peirce’s ["link", {text: "take on Wild West", url:"https://www.sec.gov/news/speech/peirce-2021-10-08" }] and crypto regulation, what do the people (beneficiaries of regulation) want
    * ["link", {text: "US CFTC orders Tether to pay $41 million", url:"https://www.cftc.gov/PressRoom/PressReleases/8450-21" }] over claims that USDT was fully backed by USD
    * ["link", {text: "Guide to incorporating", url:"https://medium.com/@megan_knab/so-you-want-to-incorporate-a-web3-company-d0bfb599d457" }] a web3 company
    * Divergence Ventures ["link", {text: "farmed for retroactive airdrop", url:"https://juliankoh.medium.com/ribbon-divergence-ventures-653b03788612" }] of DeFi project they invested in, funds were returned
    * ["link", {text: "Steam updates onboarding rules", url:"https://partner.steamgames.com/doc/gettingstarted/onboarding?l=english" }] to not allow apps that issue or exchange crypto/NFTs
    * ["link", {text: "Coinbase NFT", url:"https://blog.coinbase.com/coinbase-nft-is-coming-soon-join-the-waitlist-today-for-early-access-cc7bac29fd72" }] late 2021, initially US only, 2 million email addresses on waitlist

General

    * Snowden: ["link", {text: "CDBCs will ransom our future", url:"https://edwardsnowden.substack.com/p/cbdcs" }]
    * Ben Thompson: Death and birth of ["link", {text: "technological revolutions", url:"https://stratechery.com/2021/the-death-and-birth-of-technological-revolutions/" }]
    * Proving the ["link", {text: "security of Schnorr multi/threshold signatures", url:"https://eprint.iacr.org/2021/1375" }]



Follow ["link", {text: "@WeekinEthNews", url:"https://twitter.com/WeekInEthNews" }] to find out what the most clicked links are. Follow ["link", {text: "@evan_van_ness", url:"https://twitter.com/evan_van_ness" }] and ["link", {text: "@abcoathup", url:"https://twitter.com/abcoathup" }] to get most of the week’s news in real time.

Permalink for this week’s issue: ["link", {text: "https://weekinethereumnews.com/week-in-ethereum-news-october-16-2021/", url:"https://weekinethereumnews.com/week-in-ethereum-news-october-16-2021/" }]



###### Dates of Note

Upcoming dates of note (new/changes in bold):

    * Oct 18 – ["link", {text: "ENS online workshop", url:"https://medium.com/the-ethereum-name-service/ens-online-workshop-october-2021-ec1fb049b77f" }] (applications closed)
    * Oct 20-21 – ["link", {text: "LisCon", url:"https://liscon.org/" }] (Lisbon)
    * Oct 22-24 – ["link", {text: "ETH Lisbon", url:"https://ethlisbon.org/" }] hackathon
    * Oct 25 – Dec 13 – ["link", {text: "Gitcoin DAO Global hackathon", url:"https://gitcoin.co/hackathon/dao-global/onboard" }] (virtual)
    * Oct 27 – Beacon chain upgrade to Altair ["link", {text: "epoch 74240", url:"https://blog.ethereum.org/2021/10/05/altair-announcement/" }] 
    * Oct 28-29 – ["link", {text: "ETH Portland", url:"https://2021.ethportland.com/" }] hackathon
    * Dec ~8 – ["link", {text: "arrow glacier", url:"https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/arrow-glacier.md" }] upgrade, block 13,773,000
    * Nov 1-4 – ["link", {text: "NFT.NYC", url:"https://www.nft.nyc/" }] sold out
    * Mar 28-30 – ["link", {text: "ETHDubai", url:"https://www.ethdubai.xyz/" }]

Did you get forwarded this newsletter? ["link", {text: "Sign up", url:"https://weekinethereum.substack.com/subscribe#about" }] to receive it weekly

["link", {text: "RSS", url:"https://weekinethereumnews.com/feed/" }]`)

//console.log(typeof markdownString)

markdownString. 



