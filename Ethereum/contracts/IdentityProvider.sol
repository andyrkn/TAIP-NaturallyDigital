pragma solidity >=0.5.8 <=0.5.12;

import "./Pausable.sol";

/**
 * @dev Identity provider contracts manages identity providers structures and restricts control only to owner
 */
contract IdentityProvider is Pausable {
    struct IP {
        address identifier;
        string ipfsHash;
    }

    IP[] public identityProviders;

    event AddIP(address identifier, string ipfsHash);
    event RemoveIP(uint id);
    event UpdateIP(uint id);

    function addIdentityProvider(address _identifier, string calldata _ipfsHash) external onlyOwner returns(uint256) {
        require(_identifier != address(0), "Invalid identity provider - address(0)");
        require(!_identityProviderExists(_identifier), "Indentity provider already exists");

        IP memory ip = IP({identifier: _identifier, ipfsHash: _ipfsHash});
        emit AddIP(_identifier, _ipfsHash);
        return identityProviders.push(ip);
    }

    function removeIdentityProvider(uint _id) external onlyOwner {
        uint length = _identityProviderNumber();
        require(_id >= 0 && _id < length, "Invalid index");

        emit RemoveIP(_id);
        if(length > 1) {
            identityProviders[_id] = identityProviders[length - 1];
        }
        identityProviders.length--;
    }

    function updateIdentityProvider(uint _id, address _identifier, string calldata _ipfsHash) external {
        uint length = _identityProviderNumber();
        require(_id >= 0 && _id < length, "Invalid index");
        IP storage ip = identityProviders[_id];
        require(msg.sender == owner || msg.sender == ip.identifier, "Only owner or IP can update");

        emit UpdateIP(_id);
        ip.identifier = _identifier;
        ip.ipfsHash = _ipfsHash;
    }

    function getIdentityProviderNumber() external view returns (uint256) {
        return _identityProviderNumber();
    }

    function isIdentityProviderCreated(address _ip) external view returns (bool) {
        return _identityProviderExists(_ip);
    }

    function _identityProviderNumber() internal view returns (uint256) {
        return identityProviders.length;
    }

    function _identityProviderExists(address _ip) internal view returns (bool) {
        for(uint i = 0; i < _identityProviderNumber(); i++) {
            if(identityProviders[i].identifier == _ip) {
                return true;
            }
        }
        return false;
    }

    function getIdentityProvider(uint _index) external view returns (address account, string memory ipfsHash) {
         uint length = _identityProviderNumber();
        require(_index >= 0 && _index < length, "Invalid index");

        account = identityProviders[_index].identifier;
        ipfsHash = identityProviders[_index].ipfsHash;
    }
}