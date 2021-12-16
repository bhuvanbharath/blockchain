const assert = require('assert');
const ganache = require('ganache-cli')
const Web3 = require('web3');
const network = new Web3(ganache.provider());
const {interface, bytecode} = require('../compile');

//global
let accounts;
let inbox;

beforeEach(async() =>{
    // network.eth.getAccounts().then(accounts =>{
    //     console.log("check");
    // });
    accounts = await network.eth.getAccounts();
    inbox = await new network.eth.Contract(JSON.parse(interface))
    .deploy({data: bytecode, arguments: ['Hi bro']})
    .send({from: accounts[0], gas: '1000000'});
});

describe('Inbox', () =>{
    it('deploys a contract', () =>{
        //console.log(inbox);
        assert.ok(inbox.options.address);
       
    });
    it('has a message', async() =>{
        //console.log(inbox);
        //assert.ok(inbox.options.address);
        const message = await inbox.methods.Message().call();
        assert.equal(message, "Hi bro");
    });
    it('message is changed', async() =>{
        const _hash = await inbox.methods.setMessage('heloo bro').send({from: accounts[0]});
        const message = await inbox.methods.Message().call();
        assert.equal(message, 'heloo bro');
    })
});
