pragma solidity >=0.5.8 <=0.5.11;

/**
 * @title User identity interface
 */
interface IUserIdentity {
    event AddIdentity(address, string, address);
    event RemoveIdentity(address, string, address);

    function addIdentity(string calldata _ipfsHash, address _identityProvider) external;

    function removeIdentity(string calldata _ipfsHash) external;
}