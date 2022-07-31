import React from "react";
import PropTypes from "prop-types";
import { defPrize } from "./def";
import { GET_LANG_ID } from "../../service/language";
import { GetCurrencyName } from "../common/common";
import { cloudImgURL, siteInfo } from "../../config";

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

const PrizeList = ({ userInfo, i18n }) => {
	const { currencyId, langId } = userInfo;
	const getPrize = Prize({ currencyId, langId, i18n });

	const rows = getPrize.map((item, index) => {
		const { rank, prizes } = item;
		prizes.splice(0, 1);

		let trophy = "";
		if (index > 2) {
			trophy = `${cloudImgURL}/SiteSkin/img/gold.png`;
		} else {
			trophy = `${cloudImgURL}/SiteSkin/img/no${index + 1}.png`;
		}

		return (
			<li key={`prizes-${rank}-${prizes}`}>
				<div>
					<img src={trophy} alt="prize" />
					{rank}
				</div>
				{prizes.map(prize => (
					<div key={`prize-${rank}-${prize}`}>{prize}</div>
				))}
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
	userInfo: PropTypes.objectOf(PropTypes.any).isRequired
};

export default PrizeList;
