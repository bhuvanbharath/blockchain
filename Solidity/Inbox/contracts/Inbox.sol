pragma solidity ^0.4.17;

contract Inbox{
    
    string public Message;
    
    string public test;
    int public _integer;
    
    function Inbox(string initialMessage) public{
        Message = initialMessage;
    }  
    
    function setMessage(string newMessage) public{
        Message = newMessage;
    }
    
    function getMessage() public view returns(string){
        return Message;
    }
}
