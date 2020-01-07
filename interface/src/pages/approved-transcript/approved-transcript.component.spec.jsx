import React from 'react';
import { assert } from "chai";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import renderer from "react-test-renderer";
import ApprovedTranscript from './approved-transcript.component';
import Request from "../../components/request/request.component";
import Response from "../../components/response/response.component";

configure({
    adapter: new Adapter()
});

describe("Approved transcript page", () => {

    let getAccountAddress, getRequest, match, uploadContent, createIdentity, deleteRequest;

    beforeEach(() => {
        getAccountAddress = jest.fn(() => new Promise(() => "account"));
        getRequest = jest.fn((id) => new Promise(() => { }));
        createIdentity = jest.fn((address, id, ip) => new Promise(() => "hash"));
        uploadContent = jest.fn((content) => new Promise(() => "hash"));
        deleteRequest = jest.fn((id) => new Promise(() => { }));
        match = { params: { id: 1 } };
    })

    it("makes a snapshot", () => {
        const tree = renderer.create(<ApprovedTranscript />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("renders the page components correctly", () => {
        const wrapper = shallow(<ApprovedTranscript match={match} getRequest={getRequest} getAccountAddress={getAccountAddress} />)
        const request = wrapper.find(Request);
        const response = wrapper.find(Response);
        const confirmButton = wrapper.find("button");

        assert.lengthOf(request, 1);
        assert.lengthOf(response, 1);
        assert.lengthOf(confirmButton, 1);
    });

    it("calls upload on IPFS, create identity method on contract and delete request when confirm button is clicked", () => {
        let wrapper = shallow(<ApprovedTranscript  match={match} getRequest={getRequest} getAccountAddress={getAccountAddress} 
            uploadContent={uploadContent} createIdentity={createIdentity} deleteRequest={deleteRequest}/>)

        wrapper.find("button").at(0).simulate("click");

        expect(uploadContent.mock.calls.length).toBe(1);
        expect(createIdentity.mock.calls.length).toBe(0);
        expect(deleteRequest.mock.calls.length).toBe(0);
    })
})