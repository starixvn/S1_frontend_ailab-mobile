import React, { useState } from "react";
import Inputbox from "../../common/inputbox.hint";
import { number_format } from "../common/common";
import { defWrapperCol } from "../common/def";

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
		const numClaimAmount =
			formatSetting[defWrapperCol.formatSetting.isConvertRequired] ||
			formatSetting[defWrapperCol.formatSetting.formatRequired]
				? Number(_claimAmount) * 1000
				: Number(_claimAmount);

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

export const Button = ({ className, onClick, displayText }) => (
	<button className={className ?? "orange"} onClick={onClick}>
		{displayText}
	</button>
);

export default ({
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

	return (
		<>
			<div className="txt-lightgray text-center">
				{i18n?.lbl_PleaseEnterClaimAmount}
			</div>
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
				)} ~ ${number_format(promotionInfo.maxAmount, formatSetting)}`}
			</div>
			<div className="btn-group">
				<Button
					className={uiSetting.popBox?.cancelBtn ?? "white"}
					onClick={ClosePopBox}
					displayText={i18n?.lbl_Cancel}
				/>
				<Button
					className={uiSetting.popBox?.submitBtn}
					onClick={onJoinPromotion.bind(this, {
						...promotionInfo,
						_claimAmount: claimAmount
					})}
					displayText={i18n?.lbl_PromoJoinNow}
				/>
			</div>
		</>
	);
};
