import { render } from "@testing-library/react";

import Wrapper from "./demo";

describe("Wrapper", () => {
	it("should render successfully", () => {
		const { baseElement } = render(<Wrapper />);
		expect(baseElement).toBeTruthy();
	});
});
