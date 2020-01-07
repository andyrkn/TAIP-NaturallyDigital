import { assert, expect } from "chai";
import { decodeRequest, encodeRequest, decodeRequestList } from "./request.model";

describe("Request encoding", () => {
    it("encode and decode corretly", () => {
        const request = { payload: { institution: "i" } };

        const encodedRequest = encodeRequest(request);
        const decodedRequest = decodeRequest(encodedRequest);

        assert.equal(decodedRequest, request);
    });

    it("decodes request list correctly", () => {
        const request1 = { payload: { institution: "i" } }, request2 = { payload: { institution: "ii" } };
        const requestList = [encodeRequest(request1), encodeRequest(request2)];

        const decodededRequests = decodeRequestList(requestList);

        expect(decodededRequests).to.include.members([request1, request2]);
    });
})