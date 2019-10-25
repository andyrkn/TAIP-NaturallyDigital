const UserIdentity = artifacts.require("UserIdentity");
const UserIdentityProxy = artifacts.require("UserIdentityProxy");

module.exports = function(deployer) {
    var userIdentityProxy;

    deployer.deploy(UserIdentityProxy)
    .then(() => UserIdentityProxy.deployed())
    .then((instance) => {
        userIdentityProxy = instance;
        return deployer.deploy(UserIdentity)})
    .then(() => UserIdentity.deployed())
    .then(() => userIdentityProxy.upgradeTo(UserIdentity.address));
}