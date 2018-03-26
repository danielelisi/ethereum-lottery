import web3 from './web3';
import lotteryInterface from './lotteryInterface.json';

const address = '0x69CF024821C9731AF5088ab6bCa036B5b5E1A1D4';
const abi = JSON.parse(lotteryInterface);

export default new web3.eth.Contract(abi, address);