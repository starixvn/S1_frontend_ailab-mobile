import React from "react";
import { defFilterType } from "../common/def";

const SpecialBonusCodeInputBox = ({
	i18n: { lbl_Submit, lbl_SpecialBonusCode },
	value,
	onChange,
	onSubmit,
	filterType,
	isLogin
}) =>
	isLogin && filterType === defFilterType.specialBonus ? (
		<div className="inputBox specialBonus">
			<input
				className="specialBonus"
				placeholder={lbl_SpecialBonusCode}
				value={value}
				onChange={onChange}
			/>
			<div className="btn-group">
				<button className="orange" onClick={onSubmit}>
					{lbl_Submit}
				</button>
			</div>
		</div>
	) : null;

export default SpecialBonusCodeInputBox;
