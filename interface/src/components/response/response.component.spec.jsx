import React from "react";
import renderer from "react-test-renderer";
import Response from "./response.component";
import { assert } from "chai";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({
    adapter: new Adapter()
});

describe("Response component", () => {

    let payload;

    beforeAll(() => {
        payload = {
            attribute1: "value1",
            attribute2: "value2"
        }
    })

    it("makes a snapshot", () => {
        const tree = renderer.create(<Response />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("renders the institution and request type", () => {
        const wrapper = shallow(<Response payload={payload} />);
        const sections = wrapper.find("span");
        const attribute1 = sections.getElements()[0];
        const value1 = sections.getElements()[1];
        const attribute2 = sections.getElements()[2];
        const value2 = sections.getElements()[3];

        assert.lengthOf(sections, 4);
        assert.equal(attribute1.props.children, Object.keys(payload)[0]);
        assert.equal(attribute2.props.children, Object.keys(payload)[1]);
        assert.equal(value1.props.children[1], payload.attribute1);
        assert.equal(value2.props.children[1], payload.attribute2);
    })
});