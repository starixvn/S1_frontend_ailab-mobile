import React from "react";
import ClaimWithLockedAmount, {
	checkClaimAmount,
	useJoinPromotion,
	Button
} from "../../../lib/components/joinBtn.claimWithLockedAmount";
import { renderHook, act } from "@testing-library/react-hooks";
import renderer from "react-test-renderer";
import { render, cleanup, fireEvent } from "@testing-library/react";
import Wrapper from "../../../lib/common/wrapper";

describe("ClaimWithLockedAmount > checkClaimAmount", () => {
	test(`check return value to be false, _claimAmount:""`, () => {
		const fakeData = { _claimAmount: "", requiredAmount: 1, maxAmount: 20 };
		const result = checkClaimAmount(fakeData);
		expect(result).toBe(false);
	});

	test(`check return value to be false, _claimAmount:"123abc"`, () => {
		const fakeData = {
			_claimAmount: "123abc",
			requiredAmount: 1,
			maxAmount: 20
		};
		const result = checkClaimAmount(fakeData);
		expect(result).toBe(false);
	});

	test(`check return value to be false, _claimAmount:0, requiredAmount: 1, maxAmount: 20`, () => {
		const fakeData = {
			_claimAmount: 0,
			requiredAmount: 1,
			maxAmount: 20
		};
		const result = checkClaimAmount(fakeData);
		expect(result).toBe(false);
	});

	test(`check return value to be false, _claimAmount:21, requiredAmount: 1, maxAmount: 20`, () => {
		const fakeData = {
			_claimAmount: 21,
			requiredAmount: 1,
			maxAmount: 20
		};
		const result = checkClaimAmount(fakeData);
		expect(result).toBe(false);
	});

	test(`check return value to be true, _claimAmount:1, requiredAmount: 1, maxAmount: 20`, () => {
		const fakeData = {
			_claimAmount: 1,
			requiredAmount: 1,
			maxAmount: 20
		};
		const result = checkClaimAmount(fakeData);
		expect(result).toBe(true);
	});

	test(`check return value to be true, _claimAmount:20, requiredAmount: 1, maxAmount: 20`, () => {
		const fakeData = {
			_claimAmount: 20,
			requiredAmount: 1,
			maxAmount: 20
		};
		const result = checkClaimAmount(fakeData);
		expect(result).toBe(true);
	});
});

describe("ClaimWithLockedAmount > useJoinPromotion", () => {
	afterEach(cleanup);
	test("onJoinPromotion, join successfully", () => {
		const mockSetClaimPromotion = jest.fn(data => data);
		const { result } = renderHook(() =>
			useJoinPromotion({
				i18n: {},
				SetClaimPromotion: mockSetClaimPromotion
			})
		);

		const fakeData = {
			_claimAmount: 10,
			requiredAmount: 1,
			maxAmount: 20,
			bonusCode: "TestBonusCode"
		};

		act(() => {
			result.current.onJoinPromotion(fakeData);
		});

		expect(result.current.warning.status).toBe(false);
		expect(mockSetClaimPromotion.mock.calls[0][0].LockedAmount).toBe(
			fakeData._claimAmount
		);
		expect(mockSetClaimPromotion.mock.calls[0][0].bonusCode).toBe(
			fakeData.bonusCode
		);
	});

	test("onJoinPromotion, join failure", () => {
		const mockSetClaimPromotion = jest.fn(data => data);
		const { result } = renderHook(() =>
			useJoinPromotion({
				i18n: {},
				SetClaimPromotion: mockSetClaimPromotion
			})
		);

		const fakeData = {
			_claimAmount: 30,
			requiredAmount: 1,
			maxAmount: 20,
			bonusCode: "TestBonusCode"
		};

		act(() => {
			result.current.onJoinPromotion(fakeData);
		});

		expect(result.current.warning.status).toBe(true);
	});

	test("OnChangeClaimAmount, check onChange value & reset warning", () => {
		const mockSetClaimPromotion = jest.fn(data => data);
		const { result } = renderHook(() =>
			useJoinPromotion({
				i18n: {},
				SetClaimPromotion: mockSetClaimPromotion
			})
		);

		const fakeData = { target: { value: "123" } };

		act(() => {
			result.current.OnChangeClaimAmount(fakeData);
		});

		expect(result.current.warning.status).toBe(false);
		expect(result.current.claimAmount).toBe(fakeData.target.value);
	});
});

describe("ClaimWithLockedAmount > Button", () => {
	afterEach(cleanup);

	test("button should trigger correctly", () => {
		const mockOnClick = jest.fn();
		const fakeData = {
			uiSetting: {},
			i18n: {},
			displayText: "Button",
			onClick: mockOnClick
		};

		const { getByText } = render(<Button {...fakeData} />);

		fireEvent.click(getByText(fakeData.displayText));
		expect(mockOnClick).toHaveBeenCalled();
	});
});

describe("ClaimWithLockedAmount", () => {
	test(`renders correctly`, () => {
		const fakeData = {
			uiSetting: {},
			i18n: {},
			promotionInfo: {
				_claimAmount: 1,
				requiredAmount: 1,
				maxAmount: 20
			},
			ClosePopBox: () => ({}),
			SetClaimPromotion: () => ({})
		};

		const tree = renderer
			.create(
				<Wrapper>
					<ClaimWithLockedAmount {...fakeData} />
				</Wrapper>
			)
			.toJSON();
		expect(tree).toMatchSnapshot();
	});
});
