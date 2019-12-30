import React from 'react';
import { assert } from "chai";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import renderer from "react-test-renderer";
import Wallet from './wallet.component';


configure({
    adapter: new Adapter()
});

describe("Wallet page", () => {
    it("makes a snapshot", () => {
        const tree = renderer.create(<Wallet />).toJSON();
        expect(tree).toMatchSnapshot();
    });
})