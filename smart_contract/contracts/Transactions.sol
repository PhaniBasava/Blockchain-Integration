// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Transactions {
    uint256 transactionCount;

    event Transfer(address from, address receiver, uint amount, string message, uint256 timestamp, string keyword);
  
    struct TransferStruct {
        address sender;
        address receiver;
        uint amount;
        string message;
        uint256 timestamp;
        string keyword;
    }

    TransferStruct[] transactions;

    function addToBlockchain(address payable receiver, uint amount, string memory message, string memory keyword) public payable {
        require(msg.value == amount, "Sent value must match the amount parameter");
        require(receiver != address(0), "Cannot send to zero address");
        require(amount > 0, "Amount must be greater than 0");
        
        transactionCount += 1;
        transactions.push(TransferStruct(msg.sender, receiver, amount, message, block.timestamp, keyword));

        // Actually transfer the Ether
        receiver.transfer(amount);

        emit Transfer(msg.sender, receiver, amount, message, block.timestamp, keyword);
    }

    function getAllTransactions() public view returns (TransferStruct[] memory) {
        return transactions;
    }

    function getTransactionCount() public view returns (uint256) {
        return transactionCount;
    }
}