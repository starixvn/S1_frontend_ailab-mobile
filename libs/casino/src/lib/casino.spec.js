import React from "react";
import { render } from "@testing-library/react";
import Casino from "./casino";
describe("Casino", () => {
	it("should render successfully", () => {
		const { baseElement } = render(<Casino />);
		expect(baseElement).toBeTruthy();
	});
});
