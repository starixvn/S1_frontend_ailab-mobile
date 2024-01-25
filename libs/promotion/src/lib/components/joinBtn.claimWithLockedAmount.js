import React, { useState } from "react";
import PropTypes from "prop-types";
import { InputBox } from "../common/inputbox";
import Dropdown from "./dropdown";
import { lib_number_foramt, number_format } from "../common/common";
import { defWrapperCol, defPromotionType } from "../common/def";

export const checkClaimAmount = ({
	_claimAmount,
	requiredAmount,
	maxAmount
}) => {
	if (_claimAmount === "" || isNaN(_claimAmount)) {
		return false;
	}

	return _claimAmount >= requiredAmount && _claimAmount <= maxAmount;
};

export const useJoinPromotion = ({
	i18n = {},
	SetClaimPromotion,
	formatSetting
}) => {
	const [warning, setWarning] = useState({ status: false, msg: "" });
	const [claimAmount, setClaimAmount] = useState("");

	const OnChangeClaimAmount = e => {
		setClaimAmount(e.target.value);
		if (warning.status) {
			setWarning({ status: false, msg: "" });
		}
	};

	const onJoinPromotion = ({
		_claimAmount,
		bonusCode,
		requiredAmount,
		maxAmount
	}) => {
		const _trimAmount =
			typeof _claimAmount === "string"
				? _claimAmount.replace(/[, ]+/g, "").trim()
				: _claimAmount;

		const numClaimAmount =
			formatSetting[defWrapperCol.formatSetting.isConvertRequired] ||
			formatSetting[defWrapperCol.formatSetting.formatRequired]
				? Number(_trimAmount) * 1000
				: Number(_trimAmount);

		if (
			checkClaimAmount({
				_claimAmount: numClaimAmount,
				requiredAmount,
				maxAmount,
				formatSetting
			})
		) {
			SetClaimPromotion({
				bonusCode,
				LockedAmount: numClaimAmount
			});
		} else {
			setWarning({
				status: true,
				msg: `${_claimAmount} ${i18n?.lbl_NotinLimit}`
			});
		}
	};

	return { warning, claimAmount, OnChangeClaimAmount, onJoinPromotion };
};

export const Button = ({ className, onClick, displayText }) => (
	<button className={className ?? "orange"} onClick={onClick}>
		{displayText}
	</button>
);

Button.defaultProps = {
	className: null,
	onClick: () => null,
	displayText: null
};

Button.propTypes = {
	className: PropTypes.string,
	onClick: PropTypes.func,
	displayText: PropTypes.string
};

const LockedAmountPopBox = ({
	uiSetting,
	promotionInfo,
	ClosePopBox,
	SetClaimPromotion,
	i18n = {},
	formatSetting
}) => {
	const {
		warning,
		claimAmount,
		OnChangeClaimAmount,
		onJoinPromotion
	} = useJoinPromotion({ i18n, SetClaimPromotion, formatSetting });

	const [selectedIdx, setSelectedIdx] = useState(0);

	const { canJoinTierAmountList, bonusCode, promotionType } = promotionInfo;
	const isFirstDeposit = promotionType === defPromotionType.firstDeposit;

	const options = canJoinTierAmountList?.map((el, i) => {
		const {
			requiredAmount,
			requiredTurnover,
			bonusAmount,
			lockedAmount
		} = el;

		const displayText = requiredAmount
			? `${i18n.lbl_DepositAmount} ${lib_number_foramt({
					number: requiredAmount,
					isConvertRequired: false,
					digits: 0
			  })} /  ${i18n.lbl_Bonus} ${lib_number_foramt({
					number: bonusAmount,
					isConvertRequired: false,
					digits: 0
			  })}`
			: `${i18n.lbl_Turnover} ${lib_number_foramt({
					number: requiredTurnover,
					isConvertRequired: false,
					digits: 0
			  })} / ${i18n.lbl_Bonus} ${lib_number_foramt({
					number: bonusAmount,
					isConvertRequired: false,
					digits: 0
			  })}`;

		return {
			id: i,
			displayText,
			lockedAmount,
			bonusAmount
		};
	});

	const onSelectItem = i => {
		if (i !== selectedIdx) {
			setSelectedIdx(i);
		}
	};

	const onSetClaimPromotion = () => {
		SetClaimPromotion({
			bonusCode,
			// 後端期望promotionType為missionBonus的話帶bonusAmount
			LockedAmount:
				promotionType === defPromotionType.missionBonus
					? options[selectedIdx].bonusAmount
					: options[selectedIdx].lockedAmount
		});
	};

	let input = null;
	if (isFirstDeposit) {
		input = (
			<>
				<InputBox
					data-testid="amount"
					value={claimAmount}
					onChange={OnChangeClaimAmount}
					inputType="tel"
					Warning={warning}
				/>
				<div className="text-org">
					{`${i18n?.lbl_ClaimAmountRange} : ${number_format(
						promotionInfo.requiredAmount,
						formatSetting
					)} ~ ${number_format(
						promotionInfo.maxAmount,
						formatSetting
					)}`}
				</div>
			</>
		);
	} else {
		input = (
			<Dropdown
				mainKey="promotion-locked-amount"
				options={options}
				selectedIdx={selectedIdx}
				i18n={i18n}
				onSelectItem={onSelectItem}
				colName="lockedAmount"
				hideInfo={true}
			/>
		);
	}

	return (
		<>
			<div className="txt-lightgray text-center">
				{isFirstDeposit
					? i18n?.lbl_PleaseEnterClaimAmount
					: i18n?.lbl_PleaseSelectClaimAmount}
			</div>
			{input}

			<div className="btn-group">
				<Button
					className={uiSetting?.popBox?.cancelBtn ?? "white"}
					onClick={ClosePopBox}
					displayText={i18n?.lbl_Cancel}
				/>
				<Button
					className={uiSetting?.popBox?.submitBtn}
					onClick={
						isFirstDeposit
							? onJoinPromotion.bind(this, {
									...promotionInfo,
									_claimAmount: claimAmount
							  })
							: onSetClaimPromotion
					}
					displayText={i18n?.lbl_PromoJoinNow}
				/>
			</div>
		</>
	);
};

LockedAmountPopBox.defaultProps = {
	uiSetting: {},
	promotionInfo: null,
	ClosePopBox: () => null,
	i18n: null,
	SetClaimPromotion: () => null,
	formatSetting: null
};

LockedAmountPopBox.propTypes = {
	uiSetting: PropTypes.objectOf(PropTypes.any),
	promotionInfo: PropTypes.objectOf(PropTypes.any),
	ClosePopBox: PropTypes.func,
	i18n: PropTypes.objectOf(PropTypes.string),
	SetClaimPromotion: PropTypes.func,
	formatSetting: PropTypes.objectOf(PropTypes.string)
};

export default LockedAmountPopBox;
