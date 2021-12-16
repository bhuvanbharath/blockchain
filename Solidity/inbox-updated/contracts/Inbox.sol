// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

contract Inbox{
    
    string public Message;
    
    constructor(string memory initialMessage) {
        Message = initialMessage;
    }
    
    function setMessage(string memory newMessage) public{
        Message = newMessage;
    }
    
}
