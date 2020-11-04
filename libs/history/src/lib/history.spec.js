import React from "react";
import { render } from "@testing-library/react";
import History from "./history";
describe("History", () => {
	it("should render successfully", () => {
		const { baseElement } = render(<History />);
		expect(baseElement).toBeTruthy();
	});
});
