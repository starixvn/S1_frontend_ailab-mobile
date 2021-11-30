import React, { useContext } from "react";
import RemainTime from "../common/remainTime";
import { number_format } from "../common/common";
import { defRuleCols, defPromotionType } from "../common/def";
import { configContext } from "../common/context";

const MinAmount = ({
	requiredAmount,
	displayText,
	formatSetting,
	isList,
	config
}) => {
	const { userInfo, i18n, visitorCurrency } = config;
	const _currencyId = userInfo.isLogin
		? userInfo.currencyId
		: visitorCurrency[userInfo.langId];
	const value = `${i18n[`Currency_${_currencyId}`]} ${number_format(
		requiredAmount,
		formatSetting
	)}`;
	return (
		requiredAmount > 0 &&
		(isList ? (
			<>
				<div className="icon icon-icon32px_money">
					{displayText?.toUpperCase()}
				</div>
				<div>{value}</div>
			</>
		) : (
			<li>
				<span className="title">{displayText?.toUpperCase()}</span>
				<span>{value}</span>
			</li>
		))
	);
};

const RemainingTime = ({ promotionInfo, i18n = {}, isLogin, isList }) =>
	isList ? (
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
	) : (
		<li>
			<span className="title">
				{i18n?.lbl_RemainingTime?.toUpperCase()}
			</span>
			<span>
				{RemainTime({
					promotionInfo,
					i18n,
					isLogin
				})}
			</span>
		</li>
	);

const KeyValue = ({ value, displayText, icon, isList }) =>
	isList ? (
		<>
			<div className={icon}>{displayText?.toUpperCase()}</div>
			<div>{value}</div>
		</>
	) : (
		<li>
			<span className="title">{displayText?.toUpperCase()}</span>
			<span>{value}</span>
		</li>
	);

const Bonus = ({ value, displayText, bonusType, icon, isList, config }) => {
	const { userInfo, i18n, visitorCurrency } = config;
	const _currencyId = userInfo.isLogin
		? userInfo.currencyId
		: visitorCurrency[userInfo.langId];
	return isList ? (
		<>
			<div className={icon}>{displayText?.toUpperCase()}</div>
			{bonusType === 1 ? (
				<div>{`${value}%`}</div>
			) : (
				<div>{`${i18n[`Currency_${_currencyId}`]} ${value}`}</div>
			)}
		</>
	) : (
		<li>
			<span className="title">{displayText?.toUpperCase()}</span>
			{bonusType === 1 ? (
				<span>{`${value}%`}</span>
			) : (
				<span>{`${i18n[`Currency_${_currencyId}`]} ${value}`}</span>
			)}
		</li>
	);
};

const MaxBonus = ({ value, displayText, bonusType, icon, isList, config }) => {
	const { userInfo, i18n, visitorCurrency } = config;
	const _currencyId = userInfo.isLogin
		? userInfo.currencyId
		: visitorCurrency[userInfo.langId];
	if (bonusType === 2) return null;
	return isList ? (
		<>
			<div className={icon}>{displayText?.toUpperCase()}</div>
			<div>{`${i18n[`Currency_${_currencyId}`]} ${value}`}</div>
		</>
	) : (
		<li>
			<span className="title">{displayText?.toUpperCase()}</span>
			<span>{`${i18n[`Currency_${_currencyId}`]} ${value}`}</span>
		</li>
	);
};

const defElems = ({
	promotionInfo,
	i18n = {},
	isLogin,
	formatSetting,
	isList,
	config
}) => {
	const isStaticOrRebate =
		promotionInfo.promotionType === defPromotionType.static ||
		promotionInfo.promotionType === defPromotionType.rebate;

	return {
		[defRuleCols.minAmount]: !isStaticOrRebate && (
			<MinAmount
				key={`promo-rule-${defRuleCols.minAmount}`}
				requiredAmount={promotionInfo.requiredAmount}
				displayText={i18n?.lbl_Vip_Minimum_Deposit_Count}
				formatSetting={formatSetting}
				isList={isList}
				config={config}
			/>
		),
		[defRuleCols.remainingTime]: (
			<RemainingTime
				key={`promo-rule-${defRuleCols.remainingTime}`}
				promotionInfo={promotionInfo}
				i18n={i18n}
				isLogin={isLogin}
				isList={isList}
				config={config}
			/>
		),
		[defRuleCols.rollOver]: (
			<KeyValue
				key={`promo-rule-${defRuleCols.rollOver}`}
				i18n={i18n}
				displayText={i18n?.lbl_RollOver}
				isList={isList}
				icon="icon icon-icon32px_"
				value={`${promotionInfo.rollOver}x`}
				config={config}
			/>
		),
		[defRuleCols.bonus]: !isStaticOrRebate && (
			<Bonus
				key={`promo-rule-${defRuleCols.bonus}`}
				displayText={i18n?.lbl_Bonus}
				value={number_format(promotionInfo.bonus, formatSetting)}
				icon="icon icon-promotion"
				bonusType={promotionInfo.bonusType}
				isList={isList}
				config={config}
			/>
		),
		[defRuleCols.maxBonus]: !isStaticOrRebate && (
			<MaxBonus
				key={`promo-rule-${defRuleCols.maxBonus}`}
				displayText={i18n?.lbl_MaxBonusAmount}
				value={number_format(promotionInfo.maxBonus, formatSetting)}
				icon="icon icon-icon32px_money"
				bonusType={promotionInfo.bonusType}
				isList={isList}
				config={config}
			/>
		)
	};
};

export default ({ ruleCols, promotionInfo, isList = true, config = {} }) => {
	const {
		formatSetting,
		userInfo: { isLogin },
		i18n
	} = useContext(configContext) ?? config;

	const allElems = defElems({
		promotionInfo,
		i18n,
		isLogin,
		formatSetting,
		isList,
		config
	});

	const rows = ruleCols.map(col => allElems[col]);
	return isList ? (
		<div className="rollover">
			<div>{rows}</div>
		</div>
	) : (
		<div className="info promotionInfo">
			<ul>{rows}</ul>
		</div>
	);
};
