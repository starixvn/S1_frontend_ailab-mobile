import React from "react";
import { createHistory, LocationProvider } from "@reach/router";
import { create } from "react-test-renderer";
import Login from "../../../components/login/login";
import {
	i18nContext,
	userInfoContext
} from "../../../components/common/context";

it("Login renders correctly", () => {
	const history = createHistory(window);
	const tree = create(
		<LocationProvider history={history}>
			<i18nContext.Provider value={{ i18n: {} }}>
				<userInfoContext.Provider
					value={{
						userInfo: { langId: "en" },
						setUserInfo: jest.fn()
					}}>
					<Login />
				</userInfoContext.Provider>
			</i18nContext.Provider>
		</LocationProvider>
	).toJSON();
	expect(tree).toMatchSnapshot();
});
