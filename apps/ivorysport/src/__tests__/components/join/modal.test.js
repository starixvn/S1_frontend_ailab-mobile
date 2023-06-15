import React from "react";
import { act } from "@testing-library/react-hooks";
import * as reach from "@reach/router";
import { render, fireEvent } from "@testing-library/react";
import { createHistory, LocationProvider } from "@reach/router";
import { Wrapper } from "../../../components/common/wrapper";
import Modal from "../../../components/join/modal";

jest.spyOn(reach, "useLocation");
jest.spyOn(reach, "useNavigate");
describe("Modal tests", () => {
	let tree;
	const history = createHistory(window);
	const wrapperFakeData = {
		path: {
			member: {
				root: "member"
			},
			promotionInfo: {
				root: "promotionInfo"
			},
			deposit: {
				root: "deposit"
			},
			login: {
				root: "login"
			}
		},
		userInfo: {
			langId: "en",
			isLogin: false
		},
		setPopBox: () => ({}),
		i18n: {},
		config: {
			apiURL: "http://stag.ivorysport.com"
		}
	};

	it("Join modal renders correctly", () => {
		act(() => {
			tree = render(
				<LocationProvider history={history}>
					<Wrapper {...wrapperFakeData}>
						<Modal isJoin={true} />
					</Wrapper>
				</LocationProvider>
			);
		});
		expect(tree).toMatchSnapshot();
	});

	it("Login modal renders correctly", () => {
		reach.useLocation.mockImplementation(() => ({
			state: { fromHeader: false }
		}));
		act(() => {
			tree = render(
				<LocationProvider history={history}>
					<Wrapper {...wrapperFakeData}>
						<Modal isLogin={true} isJoin={false} />
					</Wrapper>
				</LocationProvider>
			);
		});
		expect(tree).toMatchSnapshot();
	});

	it("Switch button works fine", () => {
		act(() => {
			tree = render(
				<LocationProvider history={history}>
					<Wrapper {...wrapperFakeData}>
						<Modal isJoin={true} />
					</Wrapper>
				</LocationProvider>
			);
		});

		const tag = tree.getAllByTestId("switch_login_btn")[0];
		const anchor = tag.querySelector("a");

		fireEvent.click(anchor);
		expect(tree).toMatchSnapshot();
	});

	it("Click close modal button", () => {
		const fn = jest.fn();
		reach.useNavigate.mockImplementation(() => {
			return fn;
		});
		act(() => {
			tree = render(
				<LocationProvider history={history}>
					<Wrapper {...wrapperFakeData}>
						<Modal isJoin={true} />
					</Wrapper>
				</LocationProvider>
			);
		});
		const btn = tree.getAllByTestId("close_join_modal_btn")[0];
		fireEvent.click(btn);
		expect(fn).toBeCalled();
	});
});
