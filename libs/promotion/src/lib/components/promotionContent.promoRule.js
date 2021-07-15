import React, { useContext } from "react";
import RemainTime from "../common/remainTime";
import { number_format } from "../common/common";
import { defRuleCols, defPromotionType } from "../common/def";
import { configContext } from "../common/context";

const MinAmount = ({ requiredAmount, displayText, formatSetting }) =>
	requiredAmount > 0 ? (
		<li>
			<span className="title">{displayText?.toUpperCase()}</span>
			<span>{number_format(requiredAmount, formatSetting)}</span>
		</li>
	) : null;

const RemainingTime = ({ promotionInfo, i18n = {}, isLogin }) => (
	<li>
		<span className="title">{i18n?.lbl_RemainingTime?.toUpperCase()}</span>
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
		<span>{displayText?.toUpperCase()}</span>
		<span>{value}</span>
	</li>
);

const MaxBonus = ({ value, displayText, bonusType }) => {
	const { userInfo, i18n, visitorCurrency } = useContext(configContext);
	const _currencyId = userInfo.isLogin
		? userInfo.currencyId
		: visitorCurrency[userInfo.langId];

	if (bonusType === 2) return [];
	return (
		<li>
			<span>{displayText?.toUpperCase()}</span>
			<span>{`${i18n[`Currency_${_currencyId}`]} ${value}`}</span>
		</li>
	);
};

const Bonus = ({ value, displayText, bonusType }) => {
	const { userInfo, i18n, visitorCurrency } = useContext(configContext);
	const _currencyId = userInfo.isLogin
		? userInfo.currencyId
		: visitorCurrency[userInfo.langId];

	return (
		<li>
			<span>{displayText?.toUpperCase()}</span>
			{bonusType === 1 ? (
				<span>{`${value} %`}</span>
			) : (
				<span>{`${i18n[`Currency_${_currencyId}`]} ${value}`}</span>
			)}
		</li>
	);
};

const defElems = ({ promotionInfo, i18n = {}, isLogin, formatSetting }) => {
	return {
		[defRuleCols.minAmount]: (
			<MinAmount
				key={`promo-rule-${defRuleCols.minAmount}`}
				requiredAmount={promotionInfo.requiredAmount}
				displayText={i18n?.lbl_MinAmount}
				formatSetting={formatSetting}
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
				displayText={i18n?.lbl_RollOver}
			/>
		),
		[defRuleCols.bonus]: (
			<Bonus
				bonusType={promotionInfo.bonusType}
				key={`promo-rule-${defRuleCols.bonus}`}
				displayText={i18n?.lbl_Bonus}
				value={number_format(promotionInfo.bonus, formatSetting)}
			/>
		),
		[defRuleCols.maxBonus]: (
			<MaxBonus
				bonusType={promotionInfo.bonusType}
				key={`promo-rule-${defRuleCols.maxBonus}`}
				displayText={i18n?.lbl_MaxBonusAmount}
				value={number_format(promotionInfo.maxBonus, formatSetting)}
			/>
		)
	};
};

export default ({ ruleCols, promotionInfo }) => {
	const {
		formatSetting,
		userInfo: { isLogin },
		i18n
	} = useContext(configContext);
	const allElems = defElems({
		promotionInfo,
		i18n,
		isLogin,
		formatSetting
	});

	const rows = ruleCols
		.filter(
			col =>
				!(
					promotionInfo.promotionType === defPromotionType.static &&
					col === defRuleCols.maxBonus
				)
		)
		.map(col => allElems[col]);
	return (
		<div className="info promotionInfo">
			<ul>{rows}</ul>
		</div>
	);
};
