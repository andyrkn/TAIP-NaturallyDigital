pragma solidity >=0.5.8 <=0.5.11;

import "./Pausable.sol";
import "./IUserIdentity.sol";

/**
 * @dev UserIdentity implements basic functions for managing user identity
 */
contract UserIdentity is IUserIdentity, Pausable {
    struct Identity {
        string ipfsHash;
        address identityProvider;
    }

    mapping(address => Identity[]) public userIdentities;

    event AddIdentity(address, string, address);
    event RemoveIdentity(address, string, address);

    function addIdentity(string calldata _ipfsHash, address _identityProvider) external whenNotPaused {}

    function removeIdentity(string calldata _ipfsHash) external whenNotPaused {}
}