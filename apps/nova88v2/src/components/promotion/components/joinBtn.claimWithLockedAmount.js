import React, { useState } from "react";
import PropTypes from "prop-types";
import Dropdown from "../../common/dropdown";
import Inputbox from "../../common/inputbox.hint";
import { number_format } from "../common/common";
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

export const useJoinPromotion = ({
	i18n = {},
	SetClaimPromotion,
	formatSetting
}) => {
	const [warning, setWarning] = useState({ status: null, msg: "" });
	const [claimAmount, setClaimAmount] = useState("");

	const OnChangeClaimAmount = e => {
		setClaimAmount(e.target.value);
		if (warning.status) {
			setWarning({ status: true, msg: "" });
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
				status: false,
				msg: `${_claimAmount} ${i18n?.lbl_NotinLimit}`
			});
		}
	};
	return { warning, claimAmount, OnChangeClaimAmount, onJoinPromotion };
};

const LockedAmountPopBox = ({
	promotionInfo,
	ClosePopBox,
	SetClaimPromotion,
	i18n = {},
	formatSetting
}) => {
	const [selectedIdx, setSelectedIdx] = useState(0);

	const { canJoinTierAmountList, bonusCode, promotionType } = promotionInfo;
	const isFirstDeposit = promotionType === defPromotionType.firstDeposit;

	const {
		warning,
		claimAmount,
		OnChangeClaimAmount,
		onJoinPromotion
	} = useJoinPromotion({ i18n, SetClaimPromotion, formatSetting });

	const options = canJoinTierAmountList?.map((el, i) => ({
		id: i,
		displayText: `${i18n.lbl_DepositAmount} ${el.requiredAmount} / ${i18n.lbl_Bonus} ${el.bonusAmount}`,
		lockedAmount: el.lockedAmount,
		bonusAmount: el.bonusAmount
	}));

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
				<Inputbox
					data-testid="amount"
					value={claimAmount}
					onChange={OnChangeClaimAmount}
					inputType="tel"
					warningMsg={warning.msg}
					btnStatus={warning.status}
					showInfoIcon={false}
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
					className="white"
					onClick={ClosePopBox}
					displayText={i18n?.lbl_Cancel}
				/>
				<Button
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
	promotionInfo: null,
	ClosePopBox: () => null,
	i18n: null,
	SetClaimPromotion: () => null,
	formatSetting: null
};

LockedAmountPopBox.propTypes = {
	promotionInfo: PropTypes.objectOf(PropTypes.any),
	ClosePopBox: PropTypes.func,
	i18n: PropTypes.objectOf(PropTypes.string),
	SetClaimPromotion: PropTypes.func,
	formatSetting: PropTypes.objectOf(PropTypes.string)
};

export default LockedAmountPopBox;
