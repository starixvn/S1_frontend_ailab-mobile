import React from "react";
import PropTypes from "prop-types";
import { defPrize } from "./def";
import { GET_LANG_ID } from "../../service/language";
import { GetCurrencyName, number_format } from "../common/common";
import { cloudBannerImgURL, siteInfo } from "../../config";

export const Prize = ({ currencyId, langId, i18n }) => {
	const currency = GetCurrencyName({ langId, currencyId, i18n });
	const { siteDefaultLang } = siteInfo(langId);
	const _langId = GET_LANG_ID(langId);

	const prize = defPrize();
	return (
		prize[currency]?.[_langId].prizeList ??
		prize.MYR[siteDefaultLang].prizeList
	);
};

const PrizeList = ({ userInfo, i18n, leaderboardRankingBonus }) => {
	const { currencyId, langId } = userInfo;
	const getPrize = Prize({ currencyId, langId, i18n });

	const rows = getPrize.map((item, index) => {
		// 用 ranking 比對 api 資料
		const { rank, ranking } = item;

		// prizes 改成取 api 的資料
		const currentRankingData = leaderboardRankingBonus.find(
			rankingData => rankingData.ranking === ranking
		);
		const { minPoint = 0, bonus = 0 } = currentRankingData ?? {};

		let trophy = "";
		if (index > 2) {
			trophy = `${cloudBannerImgURL}/h5/img/ranking/gold.png`;
		} else {
			trophy = `${cloudBannerImgURL}/h5/img/ranking/no${index + 1}.png`;
		}

		return (
			<li key={`prizes-${rank}`}>
				<div>
					<img src={trophy} alt="prize" />
					{rank}
				</div>
				<div>{number_format(minPoint, false, 0)}</div>
				<div>{number_format(bonus, false, 0)}</div>
			</li>
		);
	});

	return (
		<ul>
			<li>
				<div>{i18n.lbl_Ranking.toUpperCase()}</div>
				{/* <div>{i18n.lbl_MinAmount.toUpperCase()}</div> */}
				<div>
					{i18n.lbl_Min.toUpperCase()}
					{i18n.lbl_Points.toUpperCase()}
				</div>
				<div>{i18n.lbl_Bonus.toUpperCase()}</div>
			</li>
			{rows}
		</ul>
	);
};

PrizeList.defaultProps = {};

PrizeList.propTypes = {
	i18n: PropTypes.objectOf(PropTypes.string).isRequired,
	userInfo: PropTypes.objectOf(PropTypes.any).isRequired,
	leaderboardRankingBonus: PropTypes.array.isRequired
};

export default PrizeList;
