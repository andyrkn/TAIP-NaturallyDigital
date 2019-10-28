pragma solidity >=0.5.8 <=0.5.11;

/**
 * @dev Identity provider contracts manages identity providers structures and restricts control only to owner
 */
contract IdentityProvider {
    struct IP {
        address identifier;
        string ipfsHash;
    }

    IP[] public identityProviders;

    event AddIP(address, string);
    event RemoveIP(uint id);
    event UpdateIP(uint id);


    modifier onlyOwner() {_;}

    function addIdentityProvider(address _identifier, string calldata _ipfsHash) external onlyOwner returns(uint56) {}

    function removeIdentityProvider(uint _id) external onlyOwner {}

    function updateIdentityProvider(uint _id, address _identifier, string calldata ipfsHash) external onlyOwner {}
}