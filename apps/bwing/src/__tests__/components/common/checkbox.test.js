import React from "react";
import renderer from "react-test-renderer";
import Checkbox from "../../../components/common/checkbox";

it("checkbox renders correctly", () => {
	const tree = renderer
		.create(
			<Checkbox
				Checked={false}
				className={`Terms error`}
				checkboxHandler={() => {
					return null;
				}}
				id="c1">
				<div>Test</div>
			</Checkbox>
		)
		.toJSON();
	expect(tree).toMatchSnapshot();
});
