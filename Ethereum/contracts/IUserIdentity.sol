pragma solidity >=0.5.8 <=0.5.11;

/**
 * @title User identity interface
 */
interface IUserIdentity {
    event AddIdentity(address user, string userDataHash, address IP);
    event RemoveIdentity(address user , string userDataHash, address IP);

    function addIdentity(string calldata _ipfsHash, address _identityProvider) external;

    function removeIdentity(string calldata _ipfsHash) external;
}