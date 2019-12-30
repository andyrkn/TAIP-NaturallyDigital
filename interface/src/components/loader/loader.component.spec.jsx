import React from "react";
import renderer from "react-test-renderer";
import Loader from "./loader.component";

describe("Loader component", () => {
  it("makes a snapshot", () => {
    const tree = renderer.create(<Loader />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
