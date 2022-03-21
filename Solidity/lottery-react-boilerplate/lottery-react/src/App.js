import "./App.css";
import React, {Component} from "react";
import web3 from "./web3";
import lottery from "./lottery"

class App extends Component {
  state = {
    manager:"",
    players:[],
    balance:"",
    value:"",
    message:""
  };
  
  async componentDidMount(){
    const manager = await lottery.methods.manager().call();
    const players = await lottery.methods.getPlayers().call();
    const balance = await web3.eth.getBalance(lottery.options.address);
    this.setState({manager, players, balance});
  }

  onSubmit =async(event)=>{
    event.preventDefault();

    const accounts = await web3.eth.getAccounts();
    this.setState({message: "Waiting for the transaction to succeed..."});
    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei(this.state.value, "ether")
    });
    this.setState({message: "You are entered!"});

  }

  onClick =async()=>{
    const accounts = await web3.eth.getAccounts();
    this.setState({message:  "Waiting for the transaction to succeed..."});

    await lottery.methods.pickWinner().send({
      from: accounts[0]
    });
    this.setState({message:  "Picked the winner!"});
  }

  render() {

    return (
      <div>
        <h2>Lottery Contract</h2>
        <p>This lottery contract is managed by {this.state.manager}</p>
        <p>Total no. of players: {this.state.players.length}</p>
        <p>Balance available: {web3.utils.fromWei(this.state.balance, 'ether')} ether</p>

        <hr/>

        <form onSubmit={this.onSubmit}>
            <h3> Want to enter? </h3>
          <div>
            <label>Amount of ether to enter: </label>
            <input
              value={this.state.value}
              onChange={(event) => this.setState({value: event.target.value})}
            />
            <button>Enter</button>
          </div>
          </form>

          <hr />
          
          <p>Reay to Pick a winner?</p>
          <button onClick = {this.onClick}> Pick winner</button>

          <hr />

          <p>{this.state.message}</p>


      </div>

    );
  }
}
export default App;
