const path = require('path');
const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');

const { interface, bytecode } = require('./build/Lottery.json');

require('dotenv').config(path.resolve(__dirname, '..', '.env.local'));

const provider = new HDWalletProvider(
    process.env.METAMASK_SEEDS,
    `https://rinkeby.infura.io/${process.env.INFURA_API}`
);

const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    console.log('Attempting to deploy from account', accounts[0]);

    const contract = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode })
        .send({ from: accounts[0], gas: '1000000'});
    console.log(`Contract deployed to ${contract.options.address}`);
}

deploy();