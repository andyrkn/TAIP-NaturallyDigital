import React from "react";
import renderer from "react-test-renderer";
import Request from "./request.component";
import { assert } from "chai";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({
    adapter: new Adapter()
});

describe("Request component", () => {
    it("makes a snapshot", () => {
        const tree = renderer.create(<Request />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("renders the institution and request type", () => {
        const wrapper = shallow(<Request institution="X" requestType="Y" />);
        const sections = wrapper.find("div");
        const institution = sections.getElements()[0];
        const requestType = sections.getElements()[1];

        assert.lengthOf(sections, 2);
        assert.equal(institution.props.children[1].props.children, "X");
        assert.equal(requestType.props.children[1].props.children, "Y");
    })
});
