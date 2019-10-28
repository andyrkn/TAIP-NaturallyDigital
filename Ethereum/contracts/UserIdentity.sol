pragma solidity >=0.5.8 <=0.5.11;

import "./Pausable.sol";
import "./IUserIdentity.sol";
import "./IdentityProvider.sol";

/**
 * @dev UserIdentity implements basic functions for managing user identity
 */
contract UserIdentity is IUserIdentity, Pausable {
    struct Identity {
        string ipfsHash;
        address identityProvider;
    }

    mapping(address => Identity[]) private userIdentities;

    IdentityProvider private identityProvider;

    event AddIdentity(address, string, address);
    event RemoveIdentity(address, string, address);
    event UpdateIdentityProviderContact(address);

    function addIdentity(string calldata _ipfsHash, address _identityProvider) external whenNotPaused {}

    function removeIdentity(string calldata _ipfsHash) external whenNotPaused {}

    function setIdentityProvider(address _identityProviderContract) external onlyOwner {}

    function getUserIdentity(address _id, uint _index) external returns (string memory ipfsHash, address _identityProvider) {}

    function getUserIdentityNumber(address _id) external returns(uint) {}
}