import React from "react";
import renderer from "react-test-renderer";
import { render, fireEvent, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import JoinBtn from "../../../lib/components/joinBtn";
import Wrapper from "../../../lib/common/wrapper";
import moment from "moment";
import { defPromotionType } from "../../../lib/common/def";
describe("JoinBtn", () => {
	test(`before login, renders correctly`, () => {
		let nextMonth = moment().add(1, "months").unix();
		let tomorrow = moment().add(1, "days").unix();
		const fakeData = {
			uiSetting: {},
			promotionInfo: {
				periodTo: nextMonth,
				custExpiryTime: tomorrow,
				isLogin: false,
				isJoin: false,
				promotionType: defPromotionType.firstDeposit
			},
			func_GetPromotionDetail,
			func_CallBack
		};

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
			i18n: {}
		};
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
