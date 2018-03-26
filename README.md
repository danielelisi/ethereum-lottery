# Ethereum Lottery Dapp

**Live Demo: https://lottery-ethereum.herokuapp.com/**

Simple React app to interact with an Ethereum smart contract deployed on the Rinkeby Test Network.

Having the MetaMask browser extension installed and swithced to the Rinkeby test network, you can enter the lottery by sending an amount higher than > 0.01 ether.

The owner of the contract can pick a random winner from an array of players addresses stored in the smart contract. Then, The total balance of the contract is sent to the winner.


The smart contract address is: [0x69cf024821c9731af5088ab6bca036b5b5e1a1d4](https://rinkeby.etherscan.io/address/0x69cf024821c9731af5088ab6bca036b5b5e1a1d4) 

![lottery-demo](http://g.recordit.co/umCFBI0ZJc.gif)

## Installing

```
git clone https://github.com/danielelisi/ethereum-lottery.git
cd ethereum-lottery
yarn install
```

After the dependency installation, the post-install script compiles the Solidity contract and outputs the interface in src/lotteryInterface.json. To start the dev server run:

```
yarn start
```

## Running the tests

`yarn test-ethereum` to run the test script for the ethereum contract

## Deployment

Deploy on Heroku using the following buildpack for React projects:

```
heroku create --buildpack https://github.com/mars/create-react-app-buildpack.git` 
```

## Built With

* [Create-React-App](http://www.dropwizard.io/1.0.2/docs/) - Front End UI
* [Remix](http://remix.ethereum.org/) - Solidity Web IDE
* [Web3](https://github.com/ethereum/web3.js/) - Ethereum Javascript Library
* [METAMASK](https://metamask.io/) - Wallet browser extension
* [Heroku](https://www.heroku.com/) - Deployment Platform