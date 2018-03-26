import React, { Component } from 'react';
import './App.css';

import web3 from './web3';
import lottery from './lottery';

class App extends Component {
  // alias for constructor(props)
  state = {
    owner: '',
    players: [],
    balance: '',
    value: '',
    message: ''
  };

  async componentDidMount() {
    this.fetchBlockchain();

    if (web3.message) {
      this.setState({ message: web3.message });
    }
  }

  fetchBlockchain = async () => {
    const owner = await lottery.methods.owner().call();
    const players = await lottery.methods.getPlayersArray().call();
    const balance = await web3.eth.getBalance(lottery.options.address);

    this.setState({ owner, players, balance });
  }

  joinLottery = async (event) => {
    event.preventDefault();

    const accounts = await web3.eth.getAccounts();

    this.setState({ message: 'Waiting on transaction success...' });

    try {
      await lottery.methods.joinLottery().send({
        from: accounts[0],
        value: web3.utils.toWei(this.state.value, 'ether')
      });

      this.setState({ message: 'You have been entered' });
      this.fetchBlockchain();
    }
    catch (error) {
      this.setState({ message: 'Error with the transaction!' })
    }
  };

  pickWinner = async (event) => {
    const accounts = await web3.eth.getAccounts();

    this.setState({ message: 'Waiting on transaction success...' });

    try {
      let result = await lottery.methods.pickWinner().send({
        from: accounts[0]
      });

      console.log(result);

      this.setState({ message: 'A winner has been picked!' });
      this.fetchBlockchain();
      }
    catch (error) {
      this.setState({ message: 'Error with the transaction. Only the contract\'s owner can pick a winner. '});
    }
  };

  render() {
    return (
      <div className="App">
        <h2>Ethereum Lottery Dapp</h2>

        <p>
          This contract is managed by: {this.state.owner}
          <br/>
          There are currently <strong>{this.state.players.length}</strong> players 
          competing to win <strong>{web3.utils.fromWei(this.state.balance, 'ether')}</strong> ether!
        </p>

        <hr/>

        <form onSubmit={this.joinLottery}>
          <h4>Join the lottery!</h4>
          <div>
            <label>Amount of ether to enter </label>
            <input
              value={this.state.value}
              onChange={event => this.setState({ value: event.target.value })}
            />
          </div>
          <button>Enter</button>
        </form>

        <h4>Pick a winner! (only contract's owner)</h4>
        <button onClick={this.pickWinner}>Pick a winner!</button>

        <hr/>

        <h1>{this.state.message}</h1>
      </div>
    );
  }
}

export default App;
