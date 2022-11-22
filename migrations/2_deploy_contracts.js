const Tether = artifacts.require('Tether');
const RWD = artifacts.require('RWD');
const DecentralBank = artifacts.require('DecentralBank');

module.exports = async function (deployer, network, account){
    //deploy mock tether contract
    await deployer.deploy(Tether);
    const tether = await Tether.deployed();

    //deploy RWD contract
    await deployer.deploy(RWD);
    const rwd = await RWD.deployed();

    //deploye decentralBank
    await deployer.deploy(DecentralBank, rwd.address, tether.address);
    const decentralBank = await DecentralBank.deployed();

    //transfer all RWD to decentral bank
    await rwd.transfer(decentralBank.address, '1000000000000000000000000'); 
    
    //Distribute 100 tether tokens to investor
    await tether.transfer(account[1], '1000000000000000000');






};