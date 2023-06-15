import React from "react";
import { defFilterType } from "../common/def";

const SpecialBonusCodeInputBox = ({
	i18n: { lbl_Submit, lbl_PromoCode },
	value,
	onChange,
	onSubmit,
	filterType,
	isLogin
}) => {
	return isLogin && filterType === defFilterType.specialBonus ? (
		<div className="infoModule parts">
			<div className="inputBox">
				<input
					placeholder={lbl_PromoCode}
					value={value}
					onChange={onChange}
				/>
			</div>
			<div className="btn-group">
				<button onClick={onSubmit}>{lbl_Submit}</button>
			</div>
		</div>
	) : null;
};

export default SpecialBonusCodeInputBox;
