import React from "react";
import { render } from "@testing-library/react";
import Modal from "../modal";

it("Modal renders correctly", () => {
	const tree = render(<Modal />).toJSON();
	expect(tree).toMatchSnapshot();
});
