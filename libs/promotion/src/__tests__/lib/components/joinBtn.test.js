import React from "react";
import renderer from "react-test-renderer";
import { render, fireEvent, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import JoinBtn from "../../../lib/components/joinBtn";
import Wrapper from "../../../lib/common/wrapper";
import moment from "moment";
import { defPromotionType } from "../../../lib/common/def";
describe("JoinBtn", () => {
	afterEach(cleanup);

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
			apiURL: "http://www.n88dev.com"
		}
	};

	test(`before login, renders correctly`, () => {
		let nextMonth = moment().add(1, "months").unix();
		let tomorrow = moment().add(1, "days").unix();

		const mockGetPromotionDetail = jest.fn((langId, bonusCode) => ({
			langId,
			bonusCode
		}));

		const mockCallBack = jest.fn();
		const fakeData = {
			uiSetting: {},
			promotionInfo: {
				periodTo: nextMonth,
				custExpiryTime: tomorrow,
				isJoin: false,
				promotionType: defPromotionType.firstDeposit
			},
			func_GetPromotionDetail: mockGetPromotionDetail,
			func_CallBack: mockCallBack
		};

		wrapperFakeData.userInfo.isLogin = false;

		const tree = renderer
			.create(
				<Wrapper {...wrapperFakeData}>
					<JoinBtn {...fakeData} />
				</Wrapper>
			)
			.toJSON();
		expect(tree).toMatchSnapshot();
	});

	test(`after login, renders correctly`, () => {
		let nextMonth = moment().add(1, "months").unix();
		let tomorrow = moment().add(1, "days").unix();

		const mockGetPromotionDetail = jest.fn((langId, bonusCode) => ({
			langId,
			bonusCode
		}));

		const mockCallBack = jest.fn();
		const fakeData = {
			uiSetting: {},
			promotionInfo: {
				periodTo: nextMonth,
				custExpiryTime: tomorrow,
				isJoin: false,
				promotionType: defPromotionType.firstDeposit
			},
			func_GetPromotionDetail: mockGetPromotionDetail,
			func_CallBack: mockCallBack
		};

		wrapperFakeData.userInfo.isLogin = true;

		const tree = renderer
			.create(
				<Wrapper {...wrapperFakeData}>
					<JoinBtn {...fakeData} />
				</Wrapper>
			)
			.toJSON();
		expect(tree).toMatchSnapshot();
	});

	test(`after login and already join, renders correctly`, () => {
		let nextMonth = moment().add(1, "months").unix();
		let tomorrow = moment().add(1, "days").unix();

		const mockGetPromotionDetail = jest.fn((langId, bonusCode) => ({
			langId,
			bonusCode
		}));

		const mockCallBack = jest.fn();
		const fakeData = {
			uiSetting: {},
			promotionInfo: {
				periodTo: nextMonth,
				custExpiryTime: tomorrow,
				isJoin: true,
				promotionType: defPromotionType.firstDeposit
			},
			func_GetPromotionDetail: mockGetPromotionDetail,
			func_CallBack: mockCallBack
		};

		wrapperFakeData.userInfo.isLogin = true;

		const tree = renderer
			.create(
				<Wrapper {...wrapperFakeData}>
					<JoinBtn {...fakeData} />
				</Wrapper>
			)
			.toJSON();
		expect(tree).toMatchSnapshot();
	});
});
