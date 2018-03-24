import web3 from './web3';
import Lottery from '../ethereum-contract/build/Lottery.json';

const address = process.env.CONTRACT_ADDRESS;
const abi = Lottery.interface;

export default new web3.eth.Contract(abi, address);