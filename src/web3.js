import Web3 from 'web3';

let web3;

if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined')  {
    //  We are in the browser and metamask is running.
    web3 = new Web3(window.web3.currentProvider);
} else {
    //  we are on the server *OR* the user is not running metamask.
    const provider = new Web3.providers.HttpProvider(
        'https://rinkeby.infura.io/'
    );

    web3 = new Web3(provider);

    web3.message = 'You need METAMASK browser extension running in order to interact with the contract.';
}

export default web3;