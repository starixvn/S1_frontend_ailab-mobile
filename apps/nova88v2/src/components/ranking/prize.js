import React from "react";
import PropTypes from "prop-types";
import { defPrize, defEuroTourBtns } from "./def";
import EuroAgenda from "./euroAgenda";
import { GET_LANG_ID } from "../../service/language";
import { GetCurrencyName } from "../common/common";
import { siteInfo } from "../../config";

export const Prize = ({ currencyId, category, langId, i18n }) => {
	const currency = GetCurrencyName({ langId, currencyId, i18n });
	const { siteDefaultLang } = siteInfo(langId);
	const _langId = GET_LANG_ID(langId);

	const prize = defPrize();
	return (
		prize[currency]?.[_langId]?.[category] ??
		prize.MYR[siteDefaultLang][category]
	);
};

const PrizeList = ({ userInfo, category, i18n }) => {
	const { currencyId, langId } = userInfo;
	const getPrize = Prize({ currencyId, langId, category, i18n });

	const rows = getPrize.map((item, index) => {
		const { rank, prize } = item;
		let trophy = "";
		if (index < 3) trophy = "icon icon-trophy";

		return index < 9 ? (
			<ul key={`prize-${category}-${currencyId}-${langId}-${rank}`}>
				<li className={trophy}>{rank}</li>
				<li>{prize}</li>
			</ul>
		) : (
			""
		);
	});

	return (
		<div className="list active">
			{category === defEuroTourBtns.MonthlyTournament.value && (
				<EuroAgenda i18n={i18n} />
			)}
			{category !== defEuroTourBtns.MonthlyTournament.value && (
				<ul>
					<li>{i18n.lbl_Ranking}</li>
					<li>{i18n.lbl_Rewards}</li>
				</ul>
			)}

			{rows}
		</div>
	);
};

PrizeList.defaultProps = {
	category: ""
};

PrizeList.propTypes = {
	i18n: PropTypes.objectOf(PropTypes.string).isRequired,
	userInfo: PropTypes.objectOf(PropTypes.any).isRequired,
	category: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export default PrizeList;
