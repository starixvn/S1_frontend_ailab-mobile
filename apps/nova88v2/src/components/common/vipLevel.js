import React from "react";
import PropTypes from "prop-types";
import allowedCurrencyList from "../../datas/allowedCurrencyList";

const markMap = {
	1: "lbl_Vintage_Club",
	2: "lbl_Silver_Club",
	3: "lbl_Gold_Club",
	4: "lbl_Titanium_Club",
	5: "lbl_Diamond_Club",
	6: "lbl_Nova_Club"
};

const csMap = {
	1: "lbl_Vintage",
	2: "lbl_Silver",
	3: "lbl_Gold",
	4: "lbl_Titanium",
	5: "lbl_Diamond",
	6: "lbl_Nova"
};

const VIPLevel = ({ userInfo, i18n }) => {
	let vipDisplayText = null;
	if (allowedCurrencyList.VIP.includes(userInfo.currencyId)) {
		vipDisplayText =
			userInfo.langId === "cs" ? (
				<div>
					{`${i18n[csMap[userInfo.userLevel]]} ${i18n.lbl_Club}`}
				</div>
			) : (
				<div>{i18n[markMap[userInfo.userLevel]]}</div>
			);
	}

	return (
		<div className="vip_mark">
			<img
				src={`https://banner.0814media.net/h5/img/vip${
					userInfo?.userLevel ?? 1
				}.png`}
				alt="vip"
			/>
			{vipDisplayText}
		</div>
	);
};

VIPLevel.propTypes = {
	i18n: PropTypes.objectOf(PropTypes.string).isRequired,
	userInfo: PropTypes.objectOf(PropTypes.any).isRequired
};

export default VIPLevel;
