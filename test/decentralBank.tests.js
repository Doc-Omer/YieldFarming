const { assert } = require('chai');
// const {truffleAssert} = require('truffle-assertions');
const truffleAssert = require('truffle-assertions');

const Tether = artifacts.require('Tether');
const RWD = artifacts.require('RWD');
const DecentralBank = artifacts.require('DecentralBank');

require('chai')
.use(require('chai-as-promised'))
.expect()

contract('decentralBank\n', ([owner,customer]) => {
    //all of the code goes here for testing
    let tether, rwd, decentralBank
    
        describe('Mock tether deployment\n', async () => {
        
        function tokens(number){
            return web3.utils.toWei(number, 'ether');
        }
        
        beforeEach(async function () {

            tether = await Tether.new();
            rwd = await RWD.new();
            decentralBank = await DecentralBank.new(rwd.address,tether.address);

            const result = await rwd.transfer(decentralBank.address, tokens('100000'))
            await tether.transfer(customer, tokens('100'), {from: owner} );

        })

        // it('matches names succussfully', async() => {
        //     const name = await tether.name()
        //     assert.equal(name, 'Tether')
        // })

        // it('Symbol matches succussfully', async() => {
        //     const symbol = await tether.symbol()
        //     assert.equal(symbol,"USDT")
        // })

        // it('check balance of address', async() => {
        //     const balance = await tether.balanceOf('0x7255EEEcda9389677B47D4A94223ED448Ad4B9B2')
        //     assert.equal(balance.toString(),tokens('0'))
        // })

        // it('contract has tokens', async () => {
        //     let balance = await rwd.balanceOf(decentralBank.address);
        //     assert.equal(balance, tokens('100000'));
        // })

        describe('Yield Farming', async () => {
    
            it('Rewards token for staking', async () => {
                let result;
                
                result = await tether.balanceOf(customer);
                assert.equal(result.toString(), tokens('100'), 'customer mock wallet balance before staking');
            
           
                //check staking for customer
                await tether.approve(decentralBank.address, tokens('100'), {from: customer})
                await decentralBank.depositTokens(tokens('100'), {from: customer})
            
          
                // check updated balance of customer
                result = await tether.balanceOf(customer);
                assert.equal(result.toString(), tokens('0'), 'customer mock wallet balance after staking');
            

            
                // check updated balance of decentral bank
                result = await tether.balanceOf(decentralBank.address);
                assert.equal(result.toString(), tokens('100'), 'decentralbank mock wallet balance after staking');
            

          
                // Is staking balance
                result = await decentralBank.isStaked(customer)
                assert.equal(result.toString(), 'true', 'customer is checking status after staking');
            

            
                //Issue reward tokens from the owner
                await decentralBank.issueTokens({from: owner})

                //Ensure only the owner can issue tokens
                var errorMessage = "You are not the owner";
                await truffleAssert.fails(decentralBank.issueTokens(errorMessage, {from: customer}));

                //Unstake Tokens
                await decentralBank.unstakeTokens({from: customer});

                //check unstaking balance
                result = await tether.balanceOf(customer);
                assert.equal(result.toString(), tokens('100'), 'customer mock wallet balance after unstaking');
            
                // check updated balance of decentral bank
                result = await tether.balanceOf(decentralBank.address);
                assert.equal(result.toString(), tokens('0'), 'decentralbank mock wallet balance after unstaking');

                // Is staking balance
                result = await decentralBank.isStaked(customer)
                assert.equal(result.toString(), 'false', 'customer is no longer staking  after unstaking');
            
            
        })
        
    })
 }) 
})

