import React, { useState } from "react";
import { Inputbox, number_format } from "@ailab-mobile/common";
import { Promotion as uiSetting } from "UISetting";

export default ({ i18n, promotionInfo, ClosePopBox, SetClaimPromotion }) => {
	const [warning, setWarning] = useState({ status: false, msg: "" });
	const [claimAmount, setClaimAmount] = useState("");

	const OnChangeClaimAmount = e => {
		setClaimAmount(e.target.value);
		if (warning.status) {
			setWarning({ status: false, msg: "" });
		}
	};

	const checkClaimAmount = ({ _claimAmount, requiredAmount, maxAmount }) => {
		if (_claimAmount === "" || isNaN(_claimAmount)) {
			return false;
		} else {
			let num_claimAmount = Number(_claimAmount);
			return (
				num_claimAmount >= requiredAmount &&
				num_claimAmount <= maxAmount
			);
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
				msg: `${_claimAmount} ${i18n.lbl_NotinLimit}`
			});
		}
	};

	return (
		<>
			<div className="txt-lightgray text-center">
				{i18n.lbl_PleaseEnterClaimAmount}
			</div>
			<Inputbox
				value={claimAmount}
				onChange={OnChangeClaimAmount}
				inputType="tel"
				Warning={warning}
			/>
			<div className="text-org">
				{`${i18n.lbl_ClaimAmountRange} : ${number_format(
					promotionInfo.requiredAmount
				)} ~ ${number_format(promotionInfo.maxAmount)}`}
			</div>
			<div className="btn-group">
				<button
					className={uiSetting.popBox?.cancelBtn ?? "white"}
					onClick={ClosePopBox}>
					{i18n.lbl_Cancel}
				</button>
				<button
					className={uiSetting.popBox?.submitBtn ?? "orange"}
					onClick={onJoinPromotion.bind(this, {
						...promotionInfo,
						_claimAmount: claimAmount
					})}>
					{i18n.lbl_PromoJoinNow}
				</button>
			</div>
		</>
	);
};
