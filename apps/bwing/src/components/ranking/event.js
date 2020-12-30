import React from "react";
import PrizeList from "./prize";
import iphone from "../../styles/img/ranking/iphone.png";
import { defPrize } from "./def";
import config from "../../config";

const Event = ({ userInfo = {}, i18n = {}, isOpen }) => {
	return (
		<div className={`rankInBox${isOpen ? " open" : ""}`}>
			<div className="title">{i18n.lbl_Event}</div>
			<div className="textBox">
				<h1>{i18n.lbl_No1_Reward}</h1>
				<p>{defPrize[0]?.prize}</p>
			</div>
			<img src={iphone} alt="iphone" />
			<PrizeList userInfo={userInfo} i18n={i18n} />
			<a
				target="_blank"
				href={`${config.t_and_cURL}/SiteSkin/${config.siteName}/ranking/${userInfo.langId}.html`}
				className="remind btn">
				{i18n.lbl_MoreDetails}
			</a>
		</div>
	);
};

export default Event;
