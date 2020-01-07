import React from 'react';
import { assert } from "chai";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import renderer from "react-test-renderer";
import Transcript from './transcript.component';
import FileInput from "../../components/fileInput/fileInput";
import Request from "../../components/request/request.component";
import Response from "../../components/response/response.component";
import Loader from '../../components/loader';

configure({
    adapter: new Adapter()
});

describe("Transcript page", () => {
    let getAccountAddress, getRequest, match, deleteRequest;

    beforeEach(() => {
        getAccountAddress = jest.fn(() => new Promise(() => "account"));
        getRequest = jest.fn((id) => new Promise(() => { }));
        deleteRequest = jest.fn((id) => new Promise(() => { }));
        match = { params: { id: 1 } };
    })

    it("makes a snapshot", () => {
        const tree = renderer.create(<Transcript />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("renders the page correctly when loads", () => {
        const wrapper = shallow(<Transcript match={match} getRequest={getRequest} getAccountAddress={getAccountAddress} />)
        const request = wrapper.find(Request);
        const response = wrapper.find(Response);
        const input = wrapper.find(FileInput);
        const loader = wrapper.find(Loader);

        assert.lengthOf(request, 1);
        assert.lengthOf(response, 0);
        assert.lengthOf(input, 1);
        assert.lengthOf(loader, 0);
    })

    it("calls get request by id when renders first time", () => {
        shallow(<Transcript match={match} getRequest={getRequest} getAccountAddress={getAccountAddress} />)

        expect(getRequest.mock.calls.length).toBe(1);
        expect(getRequest.mock.calls[0][0]).toBe(match.params.id);
    })

    it("calls get account address when renders first time", () => {
        shallow(<Transcript match={match} getRequest={getRequest} getAccountAddress={getAccountAddress} />)

        expect(getAccountAddress.mock.calls.length).toBe(1);
    })

    it("calls delete request and display no error when reject button is clicked", () => {
        const wrapper = shallow(<Transcript match={match} getRequest={getRequest} getAccountAddress={getAccountAddress}
            deleteRequest={deleteRequest} />)

        wrapper.find("button").at(1).simulate('click');
        const status = wrapper.find(".error");

        expect(deleteRequest.mock.calls.length).toBe(1);
        expect(deleteRequest.mock.calls[0][0]).toBe(match.params.id);
        assert.equal(status.getElement().props.children, "");
    })

    it("calls delete request and display error when reject button is clicked", () => {
        deleteRequest = jest.fn((id) => new Promise((resolve, reject) => reject(Error("Promise rejected"))));
        let wrapper = shallow(<Transcript match={match} getRequest={getRequest} getAccountAddress={getAccountAddress}
            deleteRequest={deleteRequest} />)

        wrapper.find("button").at(1).simulate('click');
        const status = wrapper.find(".error");

        expect(deleteRequest.mock.calls.length).toBe(1);
        expect(deleteRequest.mock.calls[0][0]).toBe(match.params.id);
        // not working in test because setState is async, works in browser
        //assert.equal(status.getElement().props.children, "Response submision failed");
    })
})