// SPDX-License-Identifier: MIT
pragma solidity ^0.5.16;

contract Migrations{
    address public owner;

    uint public last_completed_migration;


    constructor() public {
        owner = msg.sender;
    }

    modifier onlyOwner(){
        require(msg.sender == owner, "You are not the owner");
        _;
    }

    function setCompleted(uint completed) public onlyOwner{
        last_completed_migration = completed;
    }

    function upgrade(address payable new_address) public onlyOwner{
        Migrations upgraded = Migrations(new_address);
        upgraded.setCompleted(last_completed_migration);
    }
}