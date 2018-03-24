const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');

const web3 = new Web3(ganache.provider());

const { interface, bytecode } = require('../compile');

let lottery;
let accounts;

beforeEach( async () => {
    accounts = await web3.eth.getAccounts();

    lottery = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode })
        .send({ from: accounts[0], gas: '1000000' });
});


describe('Lottery Contract', () => {
    
    it('deploys a contract', () => {
        assert.ok(lottery.options.address);
    });

    it('allows one account to enter', async () => {
        await lottery.methods.joinLottery().send({
            from: accounts[0],
            value: web3.utils.toWei('0.03', 'ether')
        });

        const players = await lottery.methods.getPlayersArray().call({
            from: accounts[0]
        });

        assert.equal(accounts[0], players[0]);
        assert.equal(1, players.length);
    });

    it('allows multiple accounts to enter', async () => {
        await lottery.methods.joinLottery().send({
            from: accounts[0],
            value: web3.utils.toWei('0.05', 'ether')
        });
        await lottery.methods.joinLottery().send({
            from: accounts[1],
            value: web3.utils.toWei('0.03', 'ether')
        });
        await lottery.methods.joinLottery().send({
            from: accounts[2],
            value: web3.utils.toWei('0.09', 'ether')
        });

        const players = await lottery.methods.getPlayersArray().call({
            from: accounts[0]
        });

        assert.equal(accounts[0], players[0]);
        assert.equal(accounts[1], players[1]);
        assert.equal(accounts[2], players[2]);
        assert.equal(3, players.length);
    });

    it('requires a minimum amount of ether to enter the lottery', async () => {
        let error;

        try {
            await lottery.methods.joinLottery().send({
                from: accounts[0],
                value: '200'
            });
        } catch (err) {
            error = err;
        }

        assert(error, 'transaction should throw an error due to the min value amount');
    });

    it('only the manager can call pickWinner', async () => {
        let error;

        try {
            await lottery.methods.joinLottery().send({
                from: accounts[0],
                value: web3.utils.toWei('0.05', 'ether')
            });

            await lottery.methods.pickWinner().send({
                from: accounts[1]
            });
        } catch (err) {
            error = err;
        }

        assert(error, 'transaction should throw an error for non owner account calling pickWinner')
    });

    it('sends money to the winner and reset the players array', async () => {
        await lottery.methods.joinLottery().send({
            from: accounts[0],
            value: web3.utils.toWei('2', 'ether')
        });

        const initialBalance = await web3.eth.getBalance(accounts[0]);
        await lottery.methods.pickWinner().send({
            from: accounts[0]
        });
        const finalBalance = await web3.eth.getBalance(accounts[0]);

        assert.ok(finalBalance > initialBalance, 'eth prize should be sent to the winner');

        const playersList = await lottery.methods.getPlayersArrayLength().call();
        assert.equal(0, playersList, 'list of players should reset to 0');

        const accountBalance = await web3.eth.getBalance(lottery.options.address);
        assert.equal(0, accountBalance, 'contract account balance should be empty');
    });
});