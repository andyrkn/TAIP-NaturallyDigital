pragma solidity >=0.5.5 <=0.5.12;

/** @dev Ownable contract implements access control mechanism
 * allowing certain permissions for function access only to owner of the contract
 */
contract Ownable {
    address public owner;

    constructor() public {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner,"Only owner access.");
        _;
    }

    function transferOwnership(address newOwner) public onlyOwner {
        require(newOwner != address(0), "Address 0 cannot be owner");
        owner = newOwner;
    }
}