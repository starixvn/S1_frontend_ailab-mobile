import React from "react";
import { defFilterType, defTabs } from "../common/def";

const SpecialBonusCodeInputBox = ({
	i18n: { lbl_Submit, lbl_PromoCode },
	value,
	onChange,
	onSubmit,
	filterType,
	isLogin,
	tab,
	uiSetting = {}
}) => {
	return tab === defTabs.Processing.key &&
		isLogin &&
		filterType === defFilterType.specialBonus ? (
		<div className="inputBox specialBonus">
			<input
				className="specialBonus"
				placeholder={lbl_PromoCode}
				value={value}
				onChange={onChange}
			/>
			<div className="btn-group">
				<button
					className={uiSetting?.submitBtn ?? "orange"}
					onClick={onSubmit}>
					{lbl_Submit}
				</button>
			</div>
		</div>
	) : null;
};

export default SpecialBonusCodeInputBox;
