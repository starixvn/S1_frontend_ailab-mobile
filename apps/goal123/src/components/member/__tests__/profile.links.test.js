import React from "react";
import renderer from "react-test-renderer";
import "@testing-library/jest-dom";
import ProfileLinks from "../profile.links";

describe("Profile links", () => {
	test("renders correctly", () => {
		const tree = renderer
			.create(
				<ProfileLinks
					i18n={{
						lbl_ChangePassword: "Change Password",
						lbl_Other: "Other",
						lbl_Logout: "Logout"
					}}
					setUserInfo={jest.fn()}
					setNav={jest.fn()}
				/>
			)
			.toJSON();
		expect(tree).toMatchSnapshot();
	});
});
