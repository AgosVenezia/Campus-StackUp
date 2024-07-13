// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Target { // Logic contract
    uint256 public num;
    address public sender;
    uint256 public value;

    function setVars(uint256 _num) public payable {
        num = _num;
        sender = msg.sender;
        value = msg.value;
    }
}

contract Caller { // Storage contract
    uint256 public num;
    address public sender;
    uint256 public value;

    function delegateCallToTargetContract(address _contract, uint256 _num) public payable {
        // Caller contract's storage is set, Target contract is not modified.
        (bool success, bytes memory data) = _contract.delegatecall(
            abi.encodeWithSignature("setVars(uint256)", _num)
        );
    }
}