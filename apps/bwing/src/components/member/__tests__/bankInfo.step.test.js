import React from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import renderer from "react-test-renderer";
import Step, { defStep } from "../bankInfo.step";

const i18n = {
	lbl_Bank_Step_1: "Add New Account",
	lbl_Bank_Step_2: "Choose Bank Name",
	lbl_Bank_Step_3: "Bound Bank Card"
};

describe("Step panel", () => {
	test("should show correct text in all steps", () => {
		const container = render(<Step i18n={i18n} step={defStep.initPanel} />);
		const [step] = container.getAllByTestId("step");
		const [step1, step2, step3] = step.getElementsByTagName("div");

		expect(step1).toHaveTextContent("Add New Account");
		expect(step2).toHaveTextContent("Choose Bank Name");
		expect(step3).toHaveTextContent("Bound Bank Card");
	});

	test("should show correct style in step 1", () => {
		const container = render(<Step i18n={i18n} step={defStep.initPanel} />);
		const [step] = container.getAllByTestId("step");
		const [step1, step2, step3] = step.getElementsByTagName("div");

		expect(step1).toHaveClass("active");
		expect(step2).not.toHaveClass("active");
		expect(step3).not.toHaveClass("active");
	});

	test("reders correctly in step 1", () => {
		const tree = renderer
			.create(<Step i18n={i18n} step={defStep.initPanel} />)
			.toJSON();
		expect(tree).toMatchSnapshot();
	});

	test("should show correct style in step 2", () => {
		const container = render(<Step i18n={i18n} step={defStep.bankPanel} />);
		const [step] = container.getAllByTestId("step");
		const [step1, step2, step3] = step.getElementsByTagName("div");

		expect(step1).toHaveClass("active");
		expect(step2).toHaveClass("active");
		expect(step3).not.toHaveClass("active");
	});

	test("reders correctly in step 2", () => {
		const tree = renderer
			.create(<Step i18n={i18n} step={defStep.bankPanel} />)
			.toJSON();
		expect(tree).toMatchSnapshot();
	});

	test("should show correct style in step 3", () => {
		const container = render(
			<Step i18n={i18n} step={defStep.accountPanel} />
		);
		const [step] = container.getAllByTestId("step");
		const [step1, step2, step3] = step.getElementsByTagName("div");

		expect(step1).toHaveClass("active");
		expect(step2).toHaveClass("active");
		expect(step3).toHaveClass("active");
	});

	test("reders correctly in step 3", () => {
		const tree = renderer
			.create(<Step i18n={i18n} step={defStep.accountPanel} />)
			.toJSON();
		expect(tree).toMatchSnapshot();
	});
});
