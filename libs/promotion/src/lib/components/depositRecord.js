import React, { useState } from "react";
import { defPromotionType } from "../common/def";
import { number_format } from "@ailab-mobile/common";

export default ({ i18n, promotionInfo }) => {
	if (
		promotionInfo.canJoin &&
		!promotionInfo.isJoin &&
		(promotionInfo.promotionType === defPromotionType.reDeposit ||
			promotionInfo.promotionType === defPromotionType.firstDeposit)
	) {
		if (promotionInfo.promotionType === defPromotionType.reDeposit) {
			return <MultipleRecord i18n={i18n} {...promotionInfo} />;
		} else {
			return <SingleRecord i18n={i18n} {...promotionInfo} />;
		}
	} else {
		return null;
	}
};

const SingleRecord = ({
	i18n,
	depositId,
	depositAmount,
	canJoin,
	isJoin,
	currencyId,
	promotionType
}) => {
	return canJoin &&
		!isJoin &&
		(promotionType === defPromotionType.reDeposit ||
			promotionType === defPromotionType.firstDeposit) ? (
		<div className="minAmount">
			<div>
				<div>{i18n.lbl_ID}</div>
				<div>{depositId}</div>
			</div>
			<div>
				<div>{i18n.lbl_DepositAmount}</div>
				<div>{`${i18n[`Currency_${currencyId}`]} ${number_format(
					depositAmount,
					false
				)}`}</div>
			</div>
		</div>
	) : null;
};

const MultipleRecord = ({ i18n, refList, depositAmount }) => {
	const [isOpen, setIsOpen] = useState(false);
	const handleOpen = _isOpen => {
		setIsOpen(() => _isOpen);
	};

	let rows = refList?.map(r => {
		return (
			<div className={isOpen ? "open" : ""}>
				<div>{r.depositId}</div>
				<div>{number_format(r.amount, false)}</div>
			</div>
		);
	});
	return (
		<>
			<div className="minAmount">
				<div className={isOpen ? "open" : ""}>
					<div>{i18n.lbl_ID}</div>
					<div>{i18n.lbl_Amount}</div>
				</div>
				<div>
					<div></div>
					<div></div>
				</div>
				{rows}
				<div className={isOpen ? "open" : ""}>
					<div>{i18n.lbl_Total}</div>
					<div>{number_format(depositAmount, false)}</div>
				</div>
			</div>
			<button
				className="ViewAllAmount"
				onClick={handleOpen.bind(this, !isOpen)}>
				{i18n.lbl_ViewAll}
				<span
					className={`icon icon-keyboard_arrow_down${
						isOpen ? " open" : ""
					}`}></span>
			</button>
		</>
	);
};
