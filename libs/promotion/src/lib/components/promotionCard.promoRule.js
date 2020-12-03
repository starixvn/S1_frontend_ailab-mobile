import React from "react";
import RemainTime from "../common/remainTime";
import { number_format } from "@ailab-mobile/common";

export const defRuleCols = {
	minAmount: "minAmount",
	rollOver: "rollOver",
	remainingTime: "remainingTime",
	bonus: "bonus",
	maxBonus: "maxBonus"
};

const MinAmount = ({
	requiredAmount,
	displayText,
	isConvert,
	divisionBy1000
}) =>
	requiredAmount > 0 ? (
		<>
			<div className="icon icon-icon32px_money">{displayText}</div>
			<div>
				{number_format(requiredAmount, isConvert, divisionBy1000)}
			</div>
		</>
	) : null;

const RemainingTime = ({ promotionInfo, i18n, isLogin }) => (
	<>
		<div className="icon icon-icon32px_time">{i18n.lbl_RemainingTime}</div>
		<div>
			{RemainTime({
				promotionInfo,
				i18n,
				isLogin
			})}
		</div>
	</>
);

const Rollover = ({ displayText, rollOver }) => (
	<>
		<div className="icon icon-icon32px_">{displayText}</div>
		<div>{rollOver}X</div>
	</>
);

const KeyValue = ({ value, displayText, icon }) => (
	<>
		<div className={icon}>{displayText}</div>
		<div>{value}</div>
	</>
);

const defElems = ({
	promotionInfo,
	i18n,
	isLogin,
	isConvert,
	divisionBy1000
}) => {
	return {
		[defRuleCols.minAmount]: (
			<MinAmount
				key={`promo-rule-${defRuleCols.minAmount}`}
				requiredAmount={promotionInfo.requiredAmount}
				displayText={i18n.lbl_MinAmount}
				isConvert={isConvert}
				divisionBy1000={divisionBy1000}
			/>
		),
		[defRuleCols.remainingTime]: (
			<RemainingTime
				key={`promo-rule-${defRuleCols.remainingTime}`}
				promotionInfo={promotionInfo}
				i18n={i18n}
				isLogin={isLogin}
			/>
		),
		[defRuleCols.rollOver]: (
			<Rollover
				key={`promo-rule-${defRuleCols.rollOver}`}
				rollOver={promotionInfo.rollOver}
				i18n={i18n}
				displayText={i18n.lbl_RollOver}
			/>
		),
		[defRuleCols.bonus]: (
			<KeyValue
				key={`promo-rule-${defRuleCols.bonus}`}
				displayText={i18n.lbl_Bonus}
				value={number_format(
					promotionInfo.bonus,
					isConvert,
					divisionBy1000
				)}
				icon="icon icon-promotion"
			/>
		),
		[defRuleCols.maxBonus]: (
			<KeyValue
				key={`promo-rule-${defRuleCols.maxBonus}`}
				displayText={i18n.lbl_MaxBonusAmount}
				value={number_format(
					promotionInfo.maxBonus,
					isConvert,
					divisionBy1000
				)}
				icon="icon icon-icon32px_money"
			/>
		)
	};
};

const PromoRule = ({
	ruleCols = [
		defRuleCols.minAmount,
		defRuleCols.rollOver,
		defRuleCols.remainingTime
	],
	promotionInfo,
	i18n,
	isLogin,
	isConvert,
	divisionBy1000
}) => {
	const allElems = defElems({
		promotionInfo,
		i18n,
		isLogin,
		isConvert,
		divisionBy1000
	});

	let rows = ruleCols.map(col => {
		return allElems[col];
	});
	return (
		<div className="rollover">
			<div>{rows}</div>
		</div>
	);
};

export default PromoRule;
