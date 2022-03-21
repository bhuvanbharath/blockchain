const assert = require("assert")
const ganache = require("ganache-cli")
const Web3 = require("web3")
const network =  new Web3(ganache.provider())

const{interface, bytecode} = require("../compile")

let lottery;
let accounts;

beforeEach(async () => {
    accounts = await network.eth.getAccounts();
    lottery = await new network.eth.Contract(JSON.parse(interface))
        .deploy({data: bytecode})
        .send({from: accounts[0], gas: "1000000"});
});

describe("Lottery contract", () => {
    it("deploys a contract", () => {
        assert.ok(lottery.options.address);
    });

    it("allows one account to enter", async () => {
        await lottery.methods.enter().send({
            from: accounts[0],
            value: network.utils.toWei("0.01", "ether")
        });

        const players = await lottery.methods.getPlayers().call({
            from: accounts[0]
        });

        assert.equal(accounts[0], players[0]);
        assert.equal(1, players.length);
    });

    it("allows multiple accounts to enter", async () => {
        await lottery.methods.enter().send({
            from: accounts[0],
            value: network.utils.toWei("0.01", "ether")
        });
        await lottery.methods.enter().send({
            from: accounts[1],
            value: network.utils.toWei("0.01", "ether")
        });
        await lottery.methods.enter().send({
            from: accounts[2],
            value: network.utils.toWei("0.01", "ether")
        });
        const players = await lottery.methods.getPlayers().call({
            from:accounts[0]
        });

        assert.equal(accounts[0], players[0]);
        assert.equal(accounts[1], players[1]);
        assert.equal(accounts[2], players[2]);
        assert.equal(3, players.length);
    });

    it("allows a minimum amount of ether to enter", async () => {
        try {
            await lottery.methods.enter().send({
                from: accounts[0],
                value: 0
            });
        }catch(err) {
            //console.log(err);
                assert(err);
            }
        });

        it("only manager can call pickWinner", async () => {
            try {
                await lottery.methods.pickWinner().send({
                    from: accounts[0]
                });
            }catch(err) {
                assert(err);
            }
        });

        it("sends money to the winner an reses the player array", async () => {
            await lottery.methods.enter().send({
                from: accounts[0],
                value: network.utils.toWei("2", "ether")
            });

            const initialBalance = await network.eth.getBalance(accounts[0]);
            await lottery.methods.pickWinner().send({from: accounts[0]});
            const finalBalance = await network.eth.getBalance(accounts[0]);
            const difference = finalBalance - initialBalance;
            console.log(difference);
            assert(difference > network.utils.toWei("1.8", "ether"));
        });
            
});