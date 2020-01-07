import React from 'react';
import { assert } from "chai";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import renderer from "react-test-renderer";
import ApprovedTranscript from './saved-transcript.component';
import Request from "../../components/request/request.component";
import Response from "../../components/response/response.component";
import { getContent } from '../../components/ipfs/ipfs';
import { deleteRequest } from '../../components/centralDatabase/centralDatabaseApi';
import { Button } from '@material-ui/core';

configure({
    adapter: new Adapter()
});

describe("Saved transcript page", () => {
    let getAccountAddress, getIdentity, match, getContent, deleteIdentity;

    beforeEach(() => {
        getAccountAddress = jest.fn(() => new Promise(() => "account"));
        getIdentity = jest.fn((address, id) => new Promise(() => { }));
        deleteIdentity = jest.fn((address, id) => new Promise(() => "hash"));
        getContent = jest.fn((hash) => new Promise(() => { }));
        match = { params: { id: 1 } };
    })

    it("makes a snapshot", () => {
        const tree = renderer.create(<ApprovedTranscript />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("renders the page components correctly", () => {
        const wrapper = shallow(<ApprovedTranscript match={match} getIdentity={getIdentity} getAccountAddress={getAccountAddress} 
        getContent={getContent}/>)
        const request = wrapper.find(Request);
        const response = wrapper.find(Response);

        assert.lengthOf(request, 1);
        assert.lengthOf(response, 1);
    })

    it("calls delete method on contract when delete button is clicked", () => {
        let wrapper = shallow(<ApprovedTranscript match={match} getIdentity={getIdentity} getAccountAddress={getAccountAddress} 
            getContent={getContent} deleteIdentity={deleteIdentity}/>)

        wrapper.find(Button).simulate("click");

        expect(deleteIdentity.mock.calls.length).toBe(1);
    })
})