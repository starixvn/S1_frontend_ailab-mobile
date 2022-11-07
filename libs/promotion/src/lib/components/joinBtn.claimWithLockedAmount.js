import React, { useState } from "react";
import PropTypes from "prop-types";
import Dropdown from "./dropdown";

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
	i18n = {}
}) => {
	const [selectedIdx, setSelectedIdx] = useState(0);

	const { canJoinTierAmountList, bonusCode } = promotionInfo;

	const options = canJoinTierAmountList?.map((el, i) => ({
		id: i,
		displayText: `${i18n.lbl_DepositAmount} ${el.requiredAmount} / ${i18n.lbl_Bonus} ${el.bonusAmount}`,
		lockedAmount: el.lockedAmount
	}));

	const onSelectItem = i => {
		if (i !== selectedIdx) {
			setSelectedIdx(i);
		}
	};

	const onSetClaimPromotion = () => {
		SetClaimPromotion({
			bonusCode,
			LockedAmount: options[selectedIdx].lockedAmount
		});
	};

	return (
		<>
			<div className="txt-lightgray text-center">
				{i18n?.lbl_PleaseEnterClaimAmount}
			</div>
			<Dropdown
				mainKey="promotion-locked-amount"
				options={options}
				selectedIdx={selectedIdx}
				i18n={i18n}
				onSelectItem={onSelectItem}
				colName="lockedAmount"
				hideInfo={true}
			/>
			<div className="btn-group">
				<Button
					className={uiSetting?.popBox?.cancelBtn ?? "white"}
					onClick={ClosePopBox}
					displayText={i18n?.lbl_Cancel}
				/>
				<Button
					className={uiSetting?.popBox?.submitBtn}
					onClick={onSetClaimPromotion}
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
	SetClaimPromotion: () => null
};

LockedAmountPopBox.propTypes = {
	uiSetting: PropTypes.objectOf(PropTypes.any),
	promotionInfo: PropTypes.objectOf(PropTypes.any),
	ClosePopBox: PropTypes.func,
	i18n: PropTypes.objectOf(PropTypes.string),
	SetClaimPromotion: PropTypes.func
};

export default LockedAmountPopBox;
