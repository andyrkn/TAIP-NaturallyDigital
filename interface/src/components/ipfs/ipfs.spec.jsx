import { assert } from "chai";
import { uploadContent, getContent } from './ipfs';

describe("IPFS integration component", () => {
    it("uploads to IPFS and get content from IPFS", async () => {
        const content = JSON.stringify({ "payload": "request" });
        const hash = await uploadContent(content);
        const retrievedContent = await getContent(hash);

        assert.equal(retrievedContent, content);
    })
})