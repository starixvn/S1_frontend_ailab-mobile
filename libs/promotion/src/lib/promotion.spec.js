import React from "react";
import { render } from "@testing-library/react";
import Promotion from "./promotion";
describe("Promotion", () => {
	it("should render successfully", () => {
		const { baseElement } = render(<Promotion />);
		expect(baseElement).toBeTruthy();
	});
});
