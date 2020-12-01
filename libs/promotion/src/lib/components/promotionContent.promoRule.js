import React from "react";
import RemainTime from "../common/remainTime";
import { number_format, isConvert } from "@ailab-mobile/common";
import { defRuleCols } from "../common/def";

const MinAmount = ({ requiredAmount, displayText, _isConvert }) =>
	requiredAmount > 0 ? (
		<li>
			<span className="title">{displayText?.toUpperCase()}</span>
			<span>{number_format(requiredAmount, _isConvert)}</span>
		</li>
	) : null;

const RemainingTime = ({ promotionInfo, i18n, isLogin }) => (
	<li>
		<span className="title">{i18n.lbl_RemainingTime?.toUpperCase()}</span>
		<span>
			{RemainTime({
				promotionInfo,
				i18n,
				isLogin
			})}
		</span>
	</li>
);

const KeyValue = ({ value, displayText }) => (
	<li>
		<span className="title">{displayText?.toUpperCase()}</span>
		<span>{value}</span>
	</li>
);

const defElems = ({ promotionInfo, i18n, isLogin, currencyId }) => {
	let _isConvert = isConvert(currencyId);
	return {
		[defRuleCols.minAmount]: (
			<MinAmount
				key={`promo-rule-${defRuleCols.minAmount}`}
				requiredAmount={promotionInfo.requiredAmount}
				displayText={i18n.lbl_MinAmount}
				_isConvert={_isConvert}
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
			<KeyValue
				key={`promo-rule-${defRuleCols.rollOver}`}
				value={`${promotionInfo.rollOver}x`}
				displayText={i18n.lbl_RollOver}
			/>
		),
		[defRuleCols.bonus]: (
			<KeyValue
				key={`promo-rule-${defRuleCols.bonus}`}
				displayText={i18n.lbl_Bonus}
				value={number_format(promotionInfo.bonus, _isConvert)}
			/>
		),
		[defRuleCols.maxBonus]: (
			<KeyValue
				key={`promo-rule-${defRuleCols.maxBonus}`}
				displayText={i18n.lbl_MaxBonusAmount}
				value={number_format(promotionInfo.maxBonus, _isConvert)}
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
	currencyId
}) => {
	const allElems = defElems({ promotionInfo, i18n, isLogin, currencyId });

	let rows = ruleCols.map(col => {
		return allElems[col];
	});
	return (
		<div className="info">
			<ul>{rows}</ul>
		</div>
	);
};

export default PromoRule;
