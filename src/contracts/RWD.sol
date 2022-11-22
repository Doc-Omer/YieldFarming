// SPDX-License-Identifier: MITs
pragma solidity ^0.5.16;

contract RWD{

    string public name = "Reward Token";
    string public symbol = "RWD";
    uint public totalSupply = 1000000000000000000000000;
    uint public decimals = 18;

    event Tranfer(address indexed _from, address indexed _to, uint _value);

    event Approval(address indexed _owner, address indexed _spender, uint _value);

    mapping(address => uint) public balanceOf;
    mapping(address => mapping(address => uint)) public allowance;


    constructor() public {
        balanceOf[msg.sender] = totalSupply;
    }

    function transfer(address _to, uint _value) public returns(bool success) {
        require(balanceOf[msg.sender] >= _value, "Value less than required");
        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;
        emit Tranfer(msg.sender, _to, _value);
        return true; 
    }

    function transferFrom(address _from, address _to, uint _value) public returns(bool success){
        require(balanceOf[msg.sender] <= _value, "Balance is low");
        require(allowance[msg.sender][_from] <= _value, "Balance is low");
        balanceOf[_to] += _value;
        balanceOf[_from] -= _value;
        allowance[msg.sender][_from] -= _value;
        emit Tranfer(_from, _to, _value);
        return true;
    }

    function approve(address _spender, uint _value) public returns(bool success) {
        allowance[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
        return true;
    }
}