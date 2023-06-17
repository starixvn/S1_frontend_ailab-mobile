import React from "react";
import PropTypes from "prop-types";
import { countryEnum, currencyToAreacode } from "./join.def";

const FeaturePanel = ({ i18n, currencyId }) => {
	return (
		<div className="features">
			<div className="title">
				<span className="icon icon-star-full" />
				{i18n.lbl_FEATURES}
			</div>
			<div className="title">{i18n.lbl_MEMBERS_BENEFITS}</div>
			<ul>
				<li>{i18n.lbl_MemberBenefits_1}</li>
				<li>{i18n.lbl_MemberBenefits_2}</li>
				<li>{i18n.lbl_MemberBenefits_3}</li>
				{countryEnum[currencyToAreacode[currencyId]] && (
					<li>
						{i18n.lbl_MemberBenefits_4.replace(
							"{{rebate}}",
							countryEnum[currencyToAreacode[currencyId]]
						)}
					</li>
				)}
			</ul>
			<div className="title">
				{i18n.lbl_ENJOY_IvorySport_VIP_EXCLUSIVE_BONUS_REBATES}
			</div>
			<ul>
				<li>{i18n.lbl_Multiple_product_platforms_with_better_odds}</li>
				<li>{i18n.lbl_Speedy_deposit_and_withdrawal}</li>
			</ul>
		</div>
	);
};

FeaturePanel.propTypes = {
	i18n: PropTypes.func.isRequired,
	currencyId: PropTypes.number.isRequired
};

export default FeaturePanel;
