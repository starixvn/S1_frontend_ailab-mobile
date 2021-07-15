import React, { useContext } from "react";
import RemainTime from "../common/remainTime";
import { number_format } from "../common/common";
import { defRuleCols, defPromotionType } from "../common/def";
import { configContext } from "../common/context";

const MinAmount = ({ requiredAmount, displayText, formatSetting }) =>
	requiredAmount > 0 ? (
		<>
			<div className="icon icon-icon32px_money">
				{displayText?.toUpperCase()}
			</div>
			<div>{number_format(requiredAmount, formatSetting)}</div>
		</>
	) : null;

const RemainingTime = ({ promotionInfo, i18n = {}, isLogin }) => (
	<>
		<div className="icon icon-icon32px_time">
			{i18n?.lbl_RemainingTime?.toUpperCase()}
		</div>
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
		<div className="icon icon-icon32px_">{displayText?.toUpperCase()}</div>
		<div>{rollOver}X</div>
	</>
);

const KeyValue = ({ value, displayText, icon }) => (
	<>
		<div className={icon}>{displayText?.toUpperCase()}</div>
		<div>{value}</div>
	</>
);

const MaxBonus = ({ value, displayText, bonusType, icon }) => {
	const { userInfo, i18n, visitorCurrency } = useContext(configContext);
	const _currencyId = userInfo.isLogin
		? userInfo.currencyId
		: visitorCurrency[userInfo.langId];

	if (bonusType === 2) return [];
	return (
		<>
			<div className={icon}>{displayText?.toUpperCase()}</div>
			<div>{`${i18n[`Currency_${_currencyId}`]} ${value}`}</div>
		</>
	);
};

const Bonus = ({ value, displayText, bonusType, icon }) => {
	const { userInfo, i18n, visitorCurrency } = useContext(configContext);
	const _currencyId = userInfo.isLogin
		? userInfo.currencyId
		: visitorCurrency[userInfo.langId];

	return (
		<>
			<div className={icon}>{displayText?.toUpperCase()}</div>
			{bonusType === 1 ? (
				<div>{`${value} %`}</div>
			) : (
				<div>{`${i18n[`Currency_${_currencyId}`]} ${value}`}</div>
			)}
		</>
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
			<Rollover
				key={`promo-rule-${defRuleCols.rollOver}`}
				rollOver={promotionInfo.rollOver}
				i18n={i18n}
				displayText={i18n?.lbl_RollOver}
			/>
		),
		[defRuleCols.bonus]: (
			<Bonus
				bonusType={promotionInfo.bonusType}
				key={`promo-rule-${defRuleCols.bonus}`}
				displayText={i18n?.lbl_Bonus}
				value={number_format(promotionInfo.bonus, formatSetting)}
				icon="icon icon-promotion"
			/>
		),
		[defRuleCols.maxBonus]: (
			<MaxBonus
				bonusType={promotionInfo.bonusType}
				key={`promo-rule-${defRuleCols.maxBonus}`}
				displayText={i18n?.lbl_MaxBonusAmount}
				value={number_format(promotionInfo.maxBonus, formatSetting)}
				icon="icon icon-icon32px_money"
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
		<div className="rollover">
			<div>{rows}</div>
		</div>
	);
};
