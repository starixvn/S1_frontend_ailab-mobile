import React from "react";
import PrizeList from "./prize";
import coins from "../../styles/img/coins.png";
import config from "../../config";

const Event = ({ userInfo = {}, i18n = {}, isOpen }) => {
	return (
		<div className={`rankContent${isOpen ? " open" : ""}`}>
			<div className="title xs">{i18n.lbl_EventTitle}</div>
			<div className="topInfo">
				<img src={coins} alt="coins" />
				<div className="highest">
					{i18n.lbl_TotalValue}
					<span>VND 161,000,000</span>
				</div>
			</div>
			<PrizeList userInfo={userInfo} i18n={i18n} />
			<a
				target="_blank"
				href={`${config.t_and_cURL}/SiteSkin/${config.siteName}/ranking/${userInfo.langId}.html`}
				className="more">
				{i18n.lbl_MoreDetails?.toUpperCase()}
			</a>
		</div>
	);
};

export default Event;
