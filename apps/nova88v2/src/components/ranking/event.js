import React, { useEffect, useState } from "react";
import { useGetLeaderboardSettingQuery } from "@ailab-mobile/service";
import PropTypes from "prop-types";
import PrizeList from "./prize";
import { defPrize } from "./def";
import { GET_LANG_ID } from "../../service/language";
import {
	GetCurrencyName,
	getCombineLeaderBoardLangId,
	number_format
} from "../common/common";
import { siteInfo, cloudBannerImgURL } from "../../config";

const Event = ({ userInfo = {}, isOpen, i18n = {} }) => {
	const [URL, setURL] = useState("");

	const getPrize = Prize({
		currencyId: userInfo.currencyId,
		langId: userInfo.langId,
		i18n
	});

	const {
		data: { data: leaderboardEventData } = {}
	} = useGetLeaderboardSettingQuery({
		siteId: siteInfo().siteId,
		currencyId: userInfo.currencyId
	});

	const { leaderboardPointCalculation, leaderboardRankingBonus = [] } =
		leaderboardEventData ?? {};

	useEffect(() => {
		tncURL();
	}, []);

	const tncURL = async () => {
		setURL(
			`${cloudBannerImgURL}/NovaPromotion/ranking_new_tnc/${getCombineLeaderBoardLangId(
				userInfo.langId,
				userInfo.currencyId
			)}.html`
		);
	};
	const rows = getPrize?.map((item, index) => {
		// 因原檔案結構改動難度高加上沒有正確 i18n 翻譯，故改動方式為：再不改動原代碼結構下將原先寫死的 prize 用 api value 取代
		// point 目前固定都是 1
		const point = 1;
		const { rank } = item;
		const { sportTurnover = 0, slotTurnover = 0, liveCasinoTurnover = 0 } =
			leaderboardPointCalculation ?? {};
		let img;
		let turnover;
		if (index === 0) {
			img = `${cloudBannerImgURL}/h5/img/ranking/ball.png`;
			turnover = sportTurnover;
		}
		if (index === 1) {
			img = `${cloudBannerImgURL}/h5/img/ranking/slot.png`;
			turnover = slotTurnover;
		}
		if (index === 2) {
			img = `${cloudBannerImgURL}/h5/img/ranking/casino.png`;
			turnover = liveCasinoTurnover;
		}
		return (
			<li key={`prize-${rank}`}>
				<div>
					{img && <img src={img} alt="prize" />}
					{rank}
				</div>
				<div>{number_format(turnover, false, 0)}</div>
				<div>{point}</div>
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
					{i18n.lbl_Calculation.toUpperCase()}
					{i18n.lbl_Points.toUpperCase()}{" "}
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
				<PrizeList
					userInfo={userInfo}
					i18n={i18n}
					leaderboardRankingBonus={leaderboardRankingBonus}
				/>
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
