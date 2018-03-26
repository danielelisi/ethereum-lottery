const path = require('path');
const fs = require('fs-extra');
const solc = require('solc');

const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath);

const interfaceFile = path.resolve(__dirname, '..', 'src', 'lotteryInterface.json');
fs.removeSync(interfaceFile);

const lotteryPath = path.resolve(__dirname, 'contracts', 'Lottery.sol');
const source = fs.readFileSync(lotteryPath, 'utf8');
const output = solc.compile(source, 1).contracts[':Lottery'];

fs.ensureDirSync(buildPath);

fs.outputJsonSync(
    path.resolve(buildPath, 'Lottery.json'),
    output
);

fs.outputJsonSync(
    path.resolve(interfaceFile),
    output['interface']
);

console.log(`The Lottery smart contract has been compiled under ${buildPath}`);

