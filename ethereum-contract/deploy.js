const path = require('path');
const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');

require('dotenv').config(path.resolve(__dirname, '..', '.env.local'));

const provider = new HDWalletProvider(
    process.env.METAMASK_SEEDS,
    `https://rinkeby.infura.io/${process.env.INFURA_API}`
);

const web3 = new Web3(provider);