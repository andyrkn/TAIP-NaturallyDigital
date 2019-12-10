const UserIdentity = artifacts.require("UserIdentity");
const UserIdentityProxy = artifacts.require("UserIdentityProxy");
const IdentityProvider = artifacts.require("IdentityProvider");
const IdentityProviderProxy = artifacts.require("IdentityProviderProxy");

module.exports = function (deployer) {
    var userIdentity;
    var userIdentityProxy;
    var identityProviderProxy;
    var identityProvider;

    deployer.deploy(UserIdentityProxy)
        .then(() => UserIdentityProxy.deployed())
        .then((instance) => {
            userIdentityProxy = instance;
            return deployer.deploy(UserIdentity)
        })
        .then(() => UserIdentity.deployed())
        .then((instance) => {
            userIdentity = instance;
            userIdentityProxy.upgradeTo(UserIdentity.address)
        })
        .then(() => deployer.deploy(IdentityProviderProxy))
        .then((instance) => {
            identityProviderProxy = instance;
            return deployer.deploy(IdentityProvider)
        })
        .then(() => IdentityProvider.deployed())
        .then((instance) => {
            identityProvider = instance;
        })
        .then(() => {
            identityProviderProxy.upgradeTo(IdentityProvider.address);
            userIdentity.setIdentityProvider(IdentityProvider.address);
        });
}