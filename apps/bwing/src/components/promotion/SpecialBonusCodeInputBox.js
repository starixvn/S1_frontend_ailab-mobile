import { defFilterType } from "@ailab-mobile/promotion";
import React from "react";
import PropTypes from "prop-types";

const SpecialBonusCodeInputBox = ({
	i18n: { lbl_Submit, lbl_PromoCode },
	value,
	onChange,
	onSubmit,
	filterType,
	isLogin,
	uiSetting = {}
}) => {
	return isLogin && filterType === defFilterType.specialBonus ? (
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

SpecialBonusCodeInputBox.defaultProps = {
	i18n: null,
	uiSetting: {},
	filterType: null,
	onChange: () => null,
	onSubmit: () => null,
	isLogin: null
};

SpecialBonusCodeInputBox.propTypes = {
	i18n: PropTypes.objectOf(PropTypes.string),
	value: PropTypes.string.isRequired,
	uiSetting: PropTypes.objectOf(PropTypes.any),
	filterType: PropTypes.string,
	onChange: PropTypes.func,
	onSubmit: PropTypes.func,
	isLogin: PropTypes.bool
};

export default SpecialBonusCodeInputBox;
