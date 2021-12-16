const hdWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require('web3');
const {interface, bytecode} = require('./compile');

const provider = new hdWalletProvider(
    'creek burden kick priority nest afford elevator wheat notable disagree blur penalty',
    'https://rinkeby.infura.io/v3/eb0ad0addeae4dbd9e583a49511ad6c2'
);

const network = new Web3(provider);

const deploy = async () => {
    const accounts = await network.eth.getAccounts();
    console.log(accounts);
    console.log(bytecode);
    const result = await new network.eth.Contract(JSON.parse(interface))
        .deploy({data: bytecode, arguments: ['Hi bro']})
        .send({from: accounts[0], gas: '1000000'});
    console.log(result.options.address);
    provider.engine.stop();
};

deploy();