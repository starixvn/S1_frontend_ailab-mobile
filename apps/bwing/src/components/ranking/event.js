import React from "react";
import PrizeList from "./prize";
import iphone from "../../styles/img/ranking/iphone.png";
import { defPrize } from "./def";

const Event = ({ userInfo = {}, i18n = {}, isOpen }) => {
	return (
		<div className={`ranInBox${isOpen ? " open" : ""}`}>
			<div className="title">EVENT</div>
			<div className="textBox">
				<h1>{i18n.lbl_No1_Reward}</h1>
				<p>{defPrize[0]?.prize}</p>
			</div>
			<img src={iphone} alt="iphone" />
			<PrizeList userInfo={userInfo} i18n={i18n} />
			<button className="remind btn">{i18n.lbl_MoreDetails}</button>
		</div>
	);
};

export default Event;
