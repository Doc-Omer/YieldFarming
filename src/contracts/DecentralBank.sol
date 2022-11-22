// SPDX-License-Identifier: MITs
pragma solidity ^0.5.16;

import "./RWD.sol";
import "./Tether.sol";


contract DecentralBank{
    string public name = "DecentralBank";
    address public owner;
    Tether public tether;
    RWD public rwd;

    address[] public stakers;

    mapping(address => uint) public stakingBalance;
    mapping(address => bool) public isStaked;
    mapping(address => bool) public hasStaked;

    constructor(RWD _rwd, Tether _tether) public{
        owner = msg.sender;
        tether = _tether;
        rwd = _rwd;
    }

    function depositTokens(uint _amount) public {
        require(_amount > 0, "Amount cannot be 0");
        tether.transferFrom(msg.sender, address(this), _amount);

        stakingBalance[msg.sender] = stakingBalance[msg.sender] + _amount;

        if(!hasStaked[msg.sender]){
            stakers.push(msg.sender);
        }

        isStaked[msg.sender] = true;
        hasStaked[msg.sender] = true;
    }

    function unstakeTokens() public {
        uint balance = stakingBalance[msg.sender];
        require(balance > 0, "Staking balance cannot be less than 0");
        tether.transfer(msg.sender, balance);

        stakingBalance[msg.sender] = 0;

        isStaked[msg.sender] = false;
    }

    function issueTokens() public {
        require(msg.sender == owner, "You are not the owner");
        for(uint i = 0; i < stakers.length; i++){
            address recipent = stakers[i]; 
            uint balance = stakingBalance[recipent] / 9;  // /9 to create percentage incentive  
            if(balance > 0){
                rwd.transfer(recipent, balance);
            }
        }
    }


}