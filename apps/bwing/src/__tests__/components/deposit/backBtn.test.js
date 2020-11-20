import React from "react";
import renderer from "react-test-renderer";
import BackBtn from "../../../components/deposit/backBtn";

it("en renders correctly", () => {
	const tree = renderer
		.create(<BackBtn i18n={require("../../../i18n/en.json")} to="../" />)
		.toJSON();
	expect(tree).toMatchSnapshot();
});

it("vn renders correctly", () => {
	const tree = renderer
		.create(<BackBtn i18n={require("../../../i18n/vn.json")} to="../" />)
		.toJSON();
	expect(tree).toMatchSnapshot();
});
