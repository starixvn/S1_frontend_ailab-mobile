import React, { useState } from "react";
import { number_format } from "../common/common";
import { Inputbox } from "@ailab-mobile/common";

export const checkClaimAmount = ({
	_claimAmount,
	requiredAmount,
	maxAmount
}) => {
	if (_claimAmount === "" || isNaN(_claimAmount)) {
		return false;
	} else {
		let num_claimAmount = Number(_claimAmount);
		return (
			num_claimAmount >= requiredAmount && num_claimAmount <= maxAmount
		);
	}
};

export const useJoinPromotion = ({ i18n = {}, SetClaimPromotion }) => {
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
		if (checkClaimAmount({ _claimAmount, requiredAmount, maxAmount })) {
			SetClaimPromotion({
				bonusCode: bonusCode,
				LockedAmount: _claimAmount
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
	} = useJoinPromotion({ i18n, SetClaimPromotion });

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
				Warning={warning}
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
