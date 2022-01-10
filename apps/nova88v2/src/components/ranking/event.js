import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import PrizeList from "./prize";
import { defPrize } from "./def";
import { GET_LANG_ID } from "../../service/language";
import { GetCurrencyName } from "../common/common";
import { cloudImgURL, siteInfo, cloudBannerImgURL } from "../../config";

const Event = ({ userInfo = {}, isOpen, i18n = {} }) => {
	const [URL, setURL] = useState("");
	const getPrize = Prize({
		currencyId: userInfo.currencyId,
		langId: userInfo.langId,
		i18n
	});

	useEffect(() => {
		tncURL();
	}, []);

	const tncURL = async () => {
		const gotoDefaultUrl = ["en", "hi", "hi_en"];
		setURL(
			`${cloudImgURL}/NovaPromotion/ranking_new_tnc/${
				gotoDefaultUrl.includes(userInfo.langId)
					? "cs_en"
					: userInfo.langId
			}.html`
		);
	};
	const rows = getPrize?.map((item, index) => {
		const { rank, prizes } = item;
		let img;
		if (index === 0) img = `${cloudBannerImgURL}/h5/img/ranking/ball.png`;
		if (index === 1) img = `${cloudBannerImgURL}/h5/img/ranking/slot.png`;
		if (index === 2) img = `${cloudBannerImgURL}/h5/img/ranking/casino.png`;
		return (
			<li key={`prize-${rank}`}>
				<div>
					{img && <img src={img} alt="prize" />}
					{rank}
				</div>
				{prizes.map(prize => (
					<div key={`prize-${rank}-${prize}`}>{prize}</div>
				))}
			</li>
		);
	});
	return (
		<div className={`rankEvent${isOpen ? " active" : ""}`}>
			<div className="title">
				NOVA88 {i18n.lbl_MonthlyTournament}
				<div>{i18n.lbl_BePartsOfUs}</div>
			</div>
			<div className="rankList">
				<div className="title">
					{i18n.lbl_Points.toUpperCase()}{" "}
					{i18n.lbl_Calculation.toUpperCase()}
				</div>
				<ul>
					<li>
						<div>{i18n.lbl_Product.toUpperCase()}</div>
						<div>{i18n.lbl_Turnover.toUpperCase()}</div>
						<div>{i18n.lbl_Points.toUpperCase()}</div>
					</li>
					{rows}
				</ul>
				<div className="title">{i18n.lbl_MonthlyTournament}</div>
				<PrizeList userInfo={userInfo} i18n={i18n} />
			</div>

			<div className="btn-group">
				<a
					href={URL}
					target="_blank"
					rel="noreferrer"
					className="orange openPopup">
					{i18n.lbl_TermsAndConditions}
				</a>
			</div>
		</div>
	);
};

const Prize = ({ currencyId, langId, i18n }) => {
	const currency = GetCurrencyName({ langId, currencyId, i18n });
	const { siteDefaultLang } = siteInfo(langId);
	const _langId = GET_LANG_ID(langId);
	const prize = defPrize();
	return (
		prize[currency]?.[_langId]?.pointCalculation ??
		prize.MYR[siteDefaultLang].pointCalculation
	);
};

Event.defaultProps = {
	isOpen: false
};

Event.propTypes = {
	i18n: PropTypes.objectOf(PropTypes.string).isRequired,
	userInfo: PropTypes.objectOf(PropTypes.any).isRequired,
	isOpen: PropTypes.bool
};

export default Event;
