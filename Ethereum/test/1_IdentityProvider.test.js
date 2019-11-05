const IdentityProvider = artifacts.require("./IdentityProvider.sol");

contract("IdentityProvider", function(accounts) {
    before(async () => {
        this.identityProvider = await IdentityProvider.deployed();
    });

    it("deploys successfully", async () => {
        const address = await this.identityProvider.address;

        assert.notEqual(address, 0x0);
        assert.notEqual(address, '');
        assert.notEqual(address, null);
        assert.notEqual(address, undefined);
    });

    it("creates identity provider correctly", async () => {
        let hash = "hash#1";
        let result = await this.identityProvider.addIdentityProvider(accounts[7], hash, { from: accounts[0]});
        const ipCount = await this.identityProvider.getIdentityProviderNumber();
        const ip = await this.identityProvider.identityProviders.call(0);
        const event = result.logs[0].args;
       
        assert.equal(ipCount.toNumber(), 1, "IP count wasn't correct");
        assert.equal(event.identifier, accounts[7], "IP address wasn't correct in event");
        assert.equal(event.ipfsHash, hash, "Ipfs hash wasn't correct in event");
        assert.equal(ip.ipfsHash, hash, "Ipfs hash wasn't correct");
        assert.equal(ip.identifier, accounts[7], "IP wasn't correct");
    });

    it("does not allow to create identity provider with same address", async () => {
        let hash = "hash#1";
        try {
            await this.identityProvider.addIdentityProvider(accounts[7], hash, { from: accounts[0]});
            assert(false);
        } catch (error) {
            assert(error);
        }
    });

    it("updates identity provider correctly", async () => {
        let hash = "hash#2";
        let result = await this.identityProvider.updateIdentityProvider(0, accounts[8], hash, { from: accounts[0]});
        const ip = await this.identityProvider.identityProviders.call(0);
        const event = result.logs[0].args;

        assert.equal(event.id.toNumber(), 0, "IP id wasn't correct in event");
        assert.equal(ip.ipfsHash, hash, "Ipfs hash wasn't correct");
        assert.equal(ip.identifier, accounts[8], "IP wasn't correct");
    });

    it("does not allow unauthorized address to update identity provider", async () => {
        let hash = "hash#2";
        try {
            await this.identityProvider.addIdentityProvider(accounts[2], hash, { from: accounts[2]});
            assert(false);
        } catch (error) {
            assert(error);
        }
        const ip = await this.identityProvider.identityProviders.call(0);
        assert.equal(ip.ipfsHash, hash, "Ipfs hash wasn't correct");
        assert.equal(ip.identifier, accounts[8], "IP wasn't correct");
    });

});