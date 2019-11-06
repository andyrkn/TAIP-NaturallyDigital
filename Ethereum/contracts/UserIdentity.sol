pragma solidity >=0.5.8 <=0.5.12;

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

    event AddIdentity(uint id, address user, string ipfsHash, address identityProvider);
    event RemoveIdentity(address user, string ipfsHash, address identityProvider);
    event UpdateIdentityProviderContact(address ipContract);

    function addIdentity(string calldata _ipfsHash, address _identityProvider) external whenNotPaused returns (uint) {
        require(_identityProvider != address(0), "Invalid identity provider - address(0)");
        require(!identityProvider.isIdentityProviderCreated(_identityProvider), "Invalid identity provider - not created");

        Identity memory identity = Identity({ipfsHash: _ipfsHash, identityProvider: _identityProvider});
        uint id = userIdentities[msg.sender].push(identity) - 1;
        emit AddIdentity(id, msg.sender, _ipfsHash, _identityProvider);
        return id;
    }

    function removeIdentity(uint index) external whenNotPaused {
        uint length = _userIdentityNumber(msg.sender);
        require(index >= 0 && index < length, "Invalid index");

        emit RemoveIdentity(msg.sender, userIdentities[msg.sender][index].ipfsHash, userIdentities[msg.sender][index].identityProvider);
        if(length > 1) {
            userIdentities[msg.sender][index] = userIdentities[msg.sender][length - 1];
        }
        userIdentities[msg.sender].length--;
    }

    function setIdentityProvider(address _identityProviderContract) external onlyOwner {
        require(_identityProviderContract != address(0), "Invalid identity provider contract - address(0)");

        emit UpdateIdentityProviderContact(_identityProviderContract);
        identityProvider = IdentityProvider(_identityProviderContract);
    }

    function getUserIdentity(address _user, uint _index) external view returns (string memory ipfsHash, address identityProviderReference) {
        uint length = _userIdentityNumber(_user);
        require(_index >= 0 && _index < length, "Invalid index");

        ipfsHash = userIdentities[_user][_index].ipfsHash;
        identityProviderReference = userIdentities[_user][_index].identityProvider;
    }

    function getUserIdentityNumber(address _user) external view returns(uint) {
        return _userIdentityNumber(_user);
    }

    function _userIdentityNumber(address _user) internal view returns(uint) {
        return userIdentities[_user].length;
    }
}