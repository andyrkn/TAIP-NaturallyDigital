const UserIdentity = artifacts.require("./UserIdentity.sol");
const IdentityProvider = artifacts.require("./IdentityProvider.sol");

contract("UserIdentity", function(accounts) {
    before(async () => {
        this.userIdentity = await UserIdentity.deployed();
        this.identityProvider = await IdentityProvider.deployed();
    });

    it("deploys successfully", async () => {
        const address = await this.userIdentity.address;

        assert.notEqual(address, 0x0);
        assert.notEqual(address, '');
        assert.notEqual(address, null);
        assert.notEqual(address, undefined);
    });

    it("creates identity correctly", async () => {
        let hash = "hash#1";
        await this.identityProvider.addIdentityProvider(accounts[7], hash, { from: accounts[0]});
        let result = await this.userIdentity.addIdentity(hash, accounts[7], { from: accounts[1], value: 0 });
        const identitiesCount = await this.userIdentity.getUserIdentityNumber(accounts[1]);
        const identity = await this.userIdentity.getUserIdentity(accounts[1], 0);
        const event = result.logs[0].args;

        assert.equal(identitiesCount.toNumber(), 1, "Identity count wasn't correct");
        assert.equal(event.user, accounts[1], "User wasn't correct in event");
        assert.equal(event.ipfsHash, hash, "Ipfs hash wasn't correct in event");
        assert.equal(event.identityProvider, accounts[7], "IP wasn't correct in event");
        assert.equal(identity.ipfsHash, hash, "Ipfs hash wasn't correct");
        assert.equal(identity.identityProviderReference, accounts[7], "IP wasn't correct");
    });

    it("removes identity correctly", async () => {
        let hash = "hash#1";
        let result = await this.userIdentity.removeIdentity(0, { from: accounts[1], value: 0 });
        const identitiesCount = await this.userIdentity.getUserIdentityNumber(accounts[1]);
        const event = result.logs[0].args;

        assert.equal(identitiesCount.toNumber(), 0, "Identity count wasn't correct");
        assert.equal(event.user, accounts[1], "User wasn't correct");
        assert.equal(event.ipfsHash, hash, "Ipfs hash wasn't correct");
        assert.equal(event.identityProvider, accounts[7], "IP wasn't correct");
    });

    it("sets identity provider contract correctly", async () => {
        let result = await this.userIdentity.setIdentityProvider(this.identityProvider.address, { from: accounts[0]});
        const event = result.logs[0].args;

        assert.equal(event.ipContract, this.identityProvider.address, "IP Contract wasn't correct");
    });

    it("does not allow to remove unexistent identity", async () => {
        try {
            await this.userIdentity.removeIdentity(10, { from: accounts[1], value: 0 });
            assert(false);
        } catch (error) {
            assert(error);
        }
    });

});