   const markdown = `Week in Ethereum News                               

# <ButtonBox url={https://weekinethereumnews.com/} ref={link-N}><LinkButton>Week in Ethereum News</LinkButton></ButtonBox>

## <ButtonBox url={https://weekinethereumnews.com/week-in-ethereum-news-october-23-2021/} ref={link-N}><LinkButton>Week in Ethereum News

October 23, 2021</LinkButton></ButtonBox>

###### Eth News and Links

Mainnet execution layer

    * PoW switch off <ButtonBox url={https://github.com/ethereum/pm/issues/402} ref={link-N}><LinkButton>community call</LinkButton></ButtonBox> November 5, for infrastructure providers and application developers
    * Geth <ButtonBox url={https://github.com/ethereum/go-ethereum/releases/tag/v1.10.11} ref={link-N}><LinkButton>v1.10.11</LinkButton></ButtonBox>: fixes pending transaction retrieval RPC and snapshot corruption bug
    * <ButtonBox url={https://notes.ethereum.org/@gballet/Sy-a6T5St} ref={link-N}><LinkButton>Stateless Ethereum cheat sheet</LinkButton></ButtonBox>: current state of verkle trees, address space extension and state networks
    * Piper Merriam’s <ButtonBox url={https://snakecharmers.ethereum.org/the-aperture-vol-2/} ref={link-N}><LinkButton>Aperture Portal Network update</LinkButton></ButtonBox>: State Network testnet coming, agreed on a wire protocol, considering using libp2p and an ultra light client in the browser

EIPs/Standards

    * Summary of EIPs for <ButtonBox url={https://blog.spruceid.com/ethereum-identity-review-of-eips-over-time/} ref={link-N}><LinkButton>signing and identity</LinkButton></ButtonBox>, informing EIP4361 Sign-in with Ethereum

Proof of Stake consensus layer

    * UPDATE YOUR NODES BEFORE OCT 27. 
      Danny Ryan’s <ButtonBox url={https://blog.ethereum.org/2021/10/19/finalized-no-30/} ref={link-N}><LinkButton>Finalized</LinkButton></ButtonBox> reminder: if you don’t update, you’ll get penalties
        * Teku <ButtonBox url={https://github.com/ConsenSys/teku/releases/tag/21.10.1} ref={link-N}><LinkButton>v21.10.1</LinkButton></ButtonBox>: support different ports for TCP and UDP, fixes Windows incompatibility introduced in v21.10.0
        * Lighthouse <ButtonBox url={https://github.com/sigp/lighthouse/releases/tag/v2.0.1} ref={link-N}><LinkButton>v2.0.1</LinkButton></ButtonBox>: fix for discovery that could cause unexpected shutdown
        * Prysm <ButtonBox url={https://github.com/prysmaticlabs/prysm/releases/tag/v2.0.2} ref={link-N}><LinkButton>v2.0.2</LinkButton></ButtonBox>: bug fixes
        * Nimbus <ButtonBox url={https://github.com/status-im/nimbus-eth2/releases/tag/v1.5.2} ref={link-N}><LinkButton>v1.5.2</LinkButton></ButtonBox>: fixes and optimizations
    * 46% nodes ready for Altair upgrade (<ButtonBox url={https://www.nodewatch.io/} ref={link-N}><LinkButton>nodewatch.io</LinkButton></ButtonBox>)
    * Visualization of <ButtonBox url={https://twitter.com/sproulM_/status/1451065804183662592} ref={link-N}><LinkButton>client diversity</LinkButton></ButtonBox> change over time.  It got worse in the last year, but is now slowly improving.
    * Latest <ButtonBox url={https://hackmd.io/@benjaminion/eth2_news/https%3A%2F%2Fhackmd.io%2F%40benjaminion%2Fwnie2_211022} ref={link-N}><LinkButton>What’s New in Eth2</LinkButton></ButtonBox>
    * <ButtonBox url={https://youtu.be/5vGxLoTUqaQ?t=68} ref={link-N}><LinkButton>PoS implementers call</LinkButton></ButtonBox>. Notes from <ButtonBox url={https://hackmd.io/@benjaminion/HyjI-xy8K} ref={link-N}><LinkButton>Ben Edgington</LinkButton></ButtonBox>: teams working on issues and stability of Pithos testnet, Prysm can now sync with Pithos, beacon chain upgrade as part of PoW switch off needs a name
    * Pithos testnet <ButtonBox url={https://pithos.consensus-monitor.stokes.io/} ref={link-N}><LinkButton>consensus monitor</LinkButton></ButtonBox>
    * Three <ButtonBox url={https://arxiv.org/abs/2110.10086} ref={link-N}><LinkButton>reorg and liveness attacks</LinkButton></ButtonBox> on staking fork choice rule

Layer2

    * <ButtonBox url={https://twitter.com/optimismpbc/status/1451339513964359682} ref={link-N}><LinkButton>Optimism upgrade</LinkButton></ButtonBox> to EVM equivalence delayed until November 11
    * Celer cBridge <ButtonBox url={https://twitter.com/celernetwork/status/1450249124331155458} ref={link-N}><LinkButton>v2.0 testnet</LinkButton></ButtonBox>: improved user experience and LPs have option not to run a cBridge node, mainnet mid November
    * <ButtonBox url={https://ethresear.ch/t/springrollup-a-zk-rollup-that-allows-a-sender-to-batch-an-unlimited-number-of-transfers-with-only-6-bytes-of-calldata-per-batch/11033} ref={link-N}><LinkButton>Springrollup</LinkButton></ButtonBox> proposal for zk rollup where sender can batch unlimited number of transfers with only 6 bytes of calldata
    * <ButtonBox url={https://ethresear.ch/t/why-you-can-build-a-private-uniswap-with-weak-secrecy-in-zkrollup/11031} ref={link-N}><LinkButton>Private AMM</LinkButton></ButtonBox> proposal with weak secrecy using a zkRollup
    * Comparison of <ButtonBox url={https://medium.com/@cpbuckland88/fraud-proofs-and-virtual-machines-2826a3412099} ref={link-N}><LinkButton>Arbitrum and Optimism’s fraud proofs</LinkButton></ButtonBox> 
    * Systematisation of knowledge of <ButtonBox url={https://stonecoldpat.github.io/images/validatingbridges.pdf} ref={link-N}><LinkButton>validating bridges</LinkButton></ButtonBox> [PDF]



### This newsletter is made possible thanks to <ButtonBox url={https://nexusmutual.io/} ref={link-N}><LinkButton>Nexus Mutual</LinkButton></ButtonBox>!

![Nexus Mutual](https://weekinethereumnews.com/wp-content/uploads/2021/07/Screenshot-from-2021-07-30-18-52-32.png)


Yield farming or deploying on L2? Nexus Mutual’s Protocol Cover keeps you protected. Coverage includes all L2 deployments in addition to the regular main chain coverage. What about multi-chain? We’ve got you covered for that as well.

Sleep without worrying.  <ButtonBox url={https://app.nexusmutual.io/cover} ref={link-N}><LinkButton>Get coverage</LinkButton></ButtonBox> today. 



Stuff for developers

    * js-ethereum-cryptography <ButtonBox url={https://github.com/ethereum/js-ethereum-cryptography/releases/tag/v0.2.0} ref={link-N}><LinkButton>v0.2.0</LinkButton></ButtonBox>: cryptographic primitives, 15x smaller with 3 dependencies, experimental, awaiting security audit
    * <ButtonBox url={https://github.com/paulrberg/prb-proxy} ref={link-N}><LinkButton>prb-proxy</LinkButton></ButtonBox>: execute multiple calls in one transaction, modern DSProxy with deterministic proxy addresses and 3rd party permissions
    * <ButtonBox url={https://github.com/FrankieIsLost/smart-batched-auction} ref={link-N}><LinkButton>smart-batched-auction</LinkButton></ButtonBox> for ERC721, implementation of Paradigm’s NFT launch design
    * <ButtonBox url={https://github.com/wighawag/template-ethereum-contracts} ref={link-N}><LinkButton>template-ethereum-contracts</LinkButton></ButtonBox>: Solidity template with Hardhat deploy, updated with dapptools tests
    * <ButtonBox url={https://github.com/starkware-industries/starkex-clientlib-js} ref={link-N}><LinkButton>starkex-clientlib-js</LinkButton></ButtonBox>: JavaScript wrapper of StarkEx API
    * <ButtonBox url={https://github.com/Shard-Labs/starknet-devnet/} ref={link-N}><LinkButton>starknet-devnet</LinkButton></ButtonBox>: Flask wrapper of Starknet dummy network
    * <ButtonBox url={https://blog.tryethernal.com/ethernal-is-going-open-source/} ref={link-N}><LinkButton>Ethernal</LinkButton></ButtonBox> block explorer for private chains, open sourced, adds free and paid ($20/mo) hosted tiers
    * <ButtonBox url={https://github.com/Anish-Agnihotri/pool-sniper} ref={link-N}><LinkButton>pool-sniper</LinkButton></ButtonBox>: Uniswap v2 pool creation sniper
    * <ButtonBox url={https://ethresear.ch/t/13-dev-takeaways-from-developing-the-usm-stablecoin/11020} ref={link-N}><LinkButton>13 lessons</LinkButton></ButtonBox> from developing USM stable token

Security

    * Polygon Plasma bridge <ButtonBox url={https://medium.com/immunefi/polygon-double-spend-bug-fix-postmortem-2m-bounty-5a1db09db7f1} ref={link-N}><LinkButton>double spend vulnerability</LinkButton></ButtonBox>:
        * $2 million bounty paid
        * Exit transaction could be resubmitted 223 times
        * ~$850 million was at risk
    * Unlock Protocol’s <ButtonBox url={https://unlock-protocol.com/blog/udt-disclosure} ref={link-N}><LinkButton>UDT vulnerability</LinkButton></ButtonBox>, token could be burnt for any address, contract has since been upgraded
    * <ButtonBox url={https://hackmd.io/@d1ll0n/Hyd-uCuBK} ref={link-N}><LinkButton>Indexed Finance</LinkButton></ButtonBox> identified attacker, details being provided to law enforcement after expiry of request to return 90% of funds
    * Hot wallet <ButtonBox url={https://steviep.xyz/txt/compromised} ref={link-N}><LinkButton>private key committed to Git</LinkButton></ButtonBox>: NFTs rescued via gasless private zero ETH sales and using Flashbots

Ecosystem

    * <ButtonBox url={https://www.gasprice.io/} ref={link-N}><LinkButton>gasprice.io</LinkButton></ButtonBox>: gas price estimates with visualizations of recent and monthly prices and transaction pool analysis
    * ETHOnline <ButtonBox url={https://twitter.com/ethglobal/status/1449883260457209857} ref={link-N}><LinkButton>finalists</LinkButton></ButtonBox>
    * LisCon <ButtonBox url={https://vimeo.com/user155155490} ref={link-N}><LinkButton>videos</LinkButton></ButtonBox>
    * Parity 2017 multisig hack of 153k ETH now worth ~$600 million, <ButtonBox url={https://medium.com/parity-hack-trace/a-message-to-the-ethereum-community-and-parity-multisig-wallet-hacker-3596bbc4fd38} ref={link-N}><LinkButton>hacker asked to return 90%</LinkButton></ButtonBox> of funds

Enterprise

    * <ButtonBox url={https://www.ap.org/press-releases/2021/ap-chainlink-to-bring-trusted-data-onto-leading-blockchains} ref={link-N}><LinkButton>Associated Press</LinkButton></ButtonBox> providing economic, sports and election data via Chainlink
    * Facebook’s <ButtonBox url={https://scontent.fmel14-2.fna.fbcdn.net/v/t39.2365-6/245645778_229514682497390_5814575696636412345_n.pdf?_nc_cat=102&ccb=1-5&_nc_sid=ad8a9d&_nc_ohc=vMfQUa02-cIAX8jNxEr&_nc_ht=scontent.fmel14-2.fna&oh=318c76fab87d62faa88d1a9dfe135627&oe=61744796} ref={link-N}><LinkButton>Novi</LinkButton></ButtonBox> [PDF] wallet piloting in US and Guatemala with USDP (Paxos) held in <ButtonBox url={https://blog.coinbase.com/coinbase-to-power-crypto-custody-for-facebooks-novi-90dc8d3f5830} ref={link-N}><LinkButton>Coinbase Custody</LinkButton></ButtonBox>

Application layer

    * DeFi has <ButtonBox url={https://twitter.com/defipulse/status/1450846435688202248} ref={link-N}><LinkButton>$100 billion in TVL</LinkButton></ButtonBox>
    * <ButtonBox url={https://twitter.com/PoolTogether_/status/1449050529146064904} ref={link-N}><LinkButton>PoolTogether v4</LinkButton></ButtonBox>: single prize pool across Ethereum and sidechains, rather than siloed
    * <ButtonBox url={https://worldcoin.org/how-it-works} ref={link-N}><LinkButton>Worldcoin</LinkButton></ButtonBox>: iris scans using zk proofs (Semaphore) on Hubble optimistic rollup 
    * Kwenta testnet <ButtonBox url={https://blog.kwenta.io/kwenta-decentralized-perpetual-futures-competition-is-now-live/} ref={link-N}><LinkButton>futures trading competition</LinkButton></ButtonBox>
    * <ButtonBox url={https://grants.gtcdao.net} ref={link-N}><LinkButton>Decentralized Gitcoin Grants</LinkButton></ButtonBox>: quadratic funding grants protocol
    * <ButtonBox url={https://blog.sismo.io/what-is-sismo-part-1-zk-badges-73e7031bacda} ref={link-N}><LinkButton>Sismo</LinkButton></ButtonBox>: aggregate reputation on public profile without giving away all your accounts using zk attestations
    * <ButtonBox url={https://twitter.com/iblamenfts/status/1450769400370384899} ref={link-N}><LinkButton>Paperhands</LinkButton></ButtonBox>: check current floor price of NFTs you sold
    * <ButtonBox url={https://www.producthunt.com/posts/tellie} ref={link-N}><LinkButton>Tellie</LinkButton></ButtonBox>: creator sites with token gated content
    * <ButtonBox url={https://medium.com/lexdaoism/when-daos-get-real-managing-real-property-on-a-blockchain-83f43f55da53} ref={link-N}><LinkButton>DAO</LinkButton></ButtonBox> owning and managing a real life farm



### Job Listings

    * <ButtonBox url={https://ethereum.bamboohr.com/jobs/view.php?id=43&source=weekinethnews} ref={link-N}><LinkButton>Team Lead</LinkButton></ButtonBox> for the Ecosystem Support Program at the Ethereum Foundation
    * <ButtonBox url={https://angel.co/company/gitcoin/jobs} ref={link-N}><LinkButton>Senior Engineer @Gitcoin</LinkButton></ButtonBox> – build the future of public goods funding!
    * Solidity is <ButtonBox url={https://ethereum.bamboohr.com/jobs/view.php?id=40&source=weekinethnews} ref={link-N}><LinkButton>hiring a C++ dev</LinkButton></ButtonBox>
    * Nomic Labs hiring a <ButtonBox url={https://nomiclabs.notion.site/Senior-Software-Engineer-Hardhat-VSCode-23cfe4ccf56846ada207c83e3a2830c3} ref={link-N}><LinkButton>Tech Lead for Hardhat VSCode</LinkButton></ButtonBox>

Reach people experienced with Ethereum.  $420 for two issues (~75 character limit), payable in ETH/DAI/USDC to abcoathup.eth.  Questions? abcoathup at-gmail



Regulation/business/tokens

    * <ButtonBox url={https://ag.ny.gov/press-release/2021/attorney-general-james-directs-unregistered-crypto-lending-platforms-cease} ref={link-N}><LinkButton>New York Attorney General</LinkButton></ButtonBox> directs two lending platforms to cease activities in New York and three others to provide info on their activities; <ButtonBox url={https://twitter.com/lefterisjp/status/1450121889368641537} ref={link-N}><LinkButton>failure to redact names</LinkButton></ButtonBox> suggests Nexo was sent a cease letter and Celsius was sent an info request
    * Australian Senate committee <ButtonBox url={https://www.aph.gov.au/Parliamentary_Business/Committees/Senate/Financial_Technology_and_Regulatory_Technology/AusTechFinCentre/Final_report/section?id=committees%2freportsen%2f024747%2f78047} ref={link-N}><LinkButton>crypto regulation recommendations</LinkButton></ButtonBox> covering regulatory structure for DAOs, capital gains tax events and CDBCs
    * <ButtonBox url={https://twitter.com/TimSweeneyEpic/status/1449146317129895938} ref={link-N}><LinkButton>Epic</LinkButton></ButtonBox> welcomes games making use of blockchain (unlike Steam)
    * NFTs more efficient at <ButtonBox url={https://twitter.com/sershokunin/status/1450477846590332929?s=20} ref={link-N}><LinkButton>signaling cultural fluency</LinkButton></ButtonBox> than traditional art
    * PleasrDAO purchased <ButtonBox url={https://pleasr.mirror.xyz/PTzSIYe6LbNW55i_Jo4S_fgqIiDp3d7YblpikQ1iRks} ref={link-N}><LinkButton>Wu-Tang Clan’s unreleased album</LinkButton></ButtonBox> from US DoJ

General

    * ECFFT on the BN254 base field <ButtonBox url={https://solvable.group/posts/ecfft-bn254/} ref={link-N}><LinkButton>implemented in Rust</LinkButton></ButtonBox>
    * <ButtonBox url={https://blog.google/threat-analysis-group/phishing-campaign-targets-youtube-creators-cookie-theft-malware/} ref={link-N}><LinkButton>Google Threat Analysis Group</LinkButton></ButtonBox>: phishers target YouTube creators with cookie theft non-persistent malware in a smash-and-grab
    * New York Times: <ButtonBox url={https://www.nytimes.com/interactive/2021/10/15/style/sneaker-bots.html} ref={link-N}><LinkButton>Sneaker flippers</LinkButton></ButtonBox> using bots
    * Argentina’s <ButtonBox url={https://therecord.media/hacker-steals-government-id-database-for-argentinas-entire-population/} ref={link-N}><LinkButton>National Registry of Persons</LinkButton></ButtonBox> allegedly hacked, identity data of entire country could be at risk
    * 3.1 million <ButtonBox url={https://twitter.com/haveibeenpwned/status/1451650181552750594} ref={link-N}><LinkButton>email addresses from CoinMarketCap</LinkButton></ButtonBox> were being traded



Follow <ButtonBox url={https://twitter.com/WeekInEthNews} ref={link-N}><LinkButton>@WeekinEthNews</LinkButton></ButtonBox> to find out what the most clicked links are. Follow <ButtonBox url={https://twitter.com/evan_van_ness} ref={link-N}><LinkButton>@evan_van_ness</LinkButton></ButtonBox> and <ButtonBox url={https://twitter.com/abcoathup} ref={link-N}><LinkButton>@abcoathup</LinkButton></ButtonBox> to get most of the week’s news in real time.

Permalink for this week’s issue: <ButtonBox url={https://weekinethereumnews.com/week-in-ethereum-news-october-23-2021/} ref={link-N}><LinkButton>https://weekinethereumnews.com/week-in-ethereum-news-october-23-2021/</LinkButton></ButtonBox>



###### Dates of Note

Upcoming dates of note (new/changes in bold):

    * Oct 25 – Dec 13 – <ButtonBox url={https://gitcoin.co/hackathon/dao-global/onboard} ref={link-N}><LinkButton>Gitcoin DAO Global hackathon</LinkButton></ButtonBox> (virtual)
    * Oct 27 – Beacon chain upgrade to Altair <ButtonBox url={https://blog.ethereum.org/2021/10/05/altair-announcement/} ref={link-N}><LinkButton>epoch 74240</LinkButton></ButtonBox>; EthStaker viewing <ButtonBox url={https://twitter.com/superphiz/status/1450528521391157251} ref={link-N}><LinkButton>party</LinkButton></ButtonBox> 
    * Oct 28-29 – <ButtonBox url={https://2021.ethportland.com/} ref={link-N}><LinkButton>ETH Portland</LinkButton></ButtonBox> hackathon
    * Nov 1-4 – <ButtonBox url={https://www.nft.nyc/} ref={link-N}><LinkButton>NFT.NYC</LinkButton></ButtonBox>
    * Nov 5 – PoW switch off <ButtonBox url={https://github.com/ethereum/pm/issues/402} ref={link-N}><LinkButton>community call</LinkButton></ButtonBox>
    * Nov 11 – <ButtonBox url={https://twitter.com/optimismPBC/status/1451339513964359682} ref={link-N}><LinkButton>Optimism upgrade</LinkButton></ButtonBox>
    * Dec ~8 – <ButtonBox url={https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/arrow-glacier.md} ref={link-N}><LinkButton>Arrow Glacier</LinkButton></ButtonBox> upgrade block 13,773,000
    * Jan 24-26 – <ButtonBox url={https://cbr.stanford.edu/sbc22/} ref={link-N}><LinkButton>Science of Blockchain Conference</LinkButton></ButtonBox> (Stanford University)
    * Mar 28-30 – <ButtonBox url={https://www.ethdubai.xyz/} ref={link-N}><LinkButton>ETHDubai</LinkButton></ButtonBox>

Did you get forwarded this newsletter? <ButtonBox url={https://weekinethereum.substack.com/subscribe#about} ref={link-N}><LinkButton>Sign up</LinkButton></ButtonBox> to receive it weekly

<ButtonBox url={https://weekinethereumnews.com/feed/} ref={link-N}><LinkButton>RSS</LinkButton></ButtonBox>`

exports.markdown = markdown 

