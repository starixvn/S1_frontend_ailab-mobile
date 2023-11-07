import React, { useContext } from "react";
import {
	configContext,
	defPromotionType,
	defRuleCols,
	defBonusType,
	number_format,
	RemainTime
} from "@ailab-mobile/promotion";
import PropTypes from "prop-types";

const MinAmount = ({ requiredAmount, displayText, formatSetting, config }) => {
	const { userInfo, i18n, visitorCurrency } = config;
	const _currencyId = userInfo.isLogin
		? userInfo.currencyId
		: visitorCurrency[userInfo.langId];
	const value = `${i18n[`Currency_${_currencyId}`]} ${number_format(
		requiredAmount,
		formatSetting
	)}`;
	return (
		requiredAmount > 0 && (
			<div className="promotion-info-item">
				<div>{displayText?.toUpperCase()}</div>
				<div>{value}</div>
			</div>
		)
	);
};

MinAmount.defaultProps = {
	isLogin: null,
	i18n: null,
	config: null
};

MinAmount.propTypes = {
	isLogin: PropTypes.bool,
	i18n: PropTypes.objectOf(PropTypes.string),
	requiredAmount: PropTypes.number.isRequired,
	displayText: PropTypes.string.isRequired,
	config: PropTypes.objectOf(PropTypes.any),
	formatSetting: PropTypes.objectOf(PropTypes.any).isRequired
};

const RemainingTime = ({ promotionInfo, i18n = {}, isLogin }) => (
	<div className="promotion-info-item">
		<div>{i18n?.lbl_RemainingTime?.toUpperCase()}</div>
		<div>
			{RemainTime({
				promotionInfo,
				i18n,
				isLogin
			})}
		</div>
	</div>
);

RemainingTime.defaultProps = {
	isLogin: null,
	i18n: null,
	promotionInfo: null
};

RemainingTime.propTypes = {
	isLogin: PropTypes.bool,
	i18n: PropTypes.objectOf(PropTypes.string),
	promotionInfo: PropTypes.objectOf(PropTypes.any)
};

const KeyValue = ({ value, displayText }) => (
	<div className="promotion-info-item">
		<div>{displayText?.toUpperCase()}</div>
		<div>{value}</div>
	</div>
);

KeyValue.defaultProps = {
	value: null,
	displayText: null
};

KeyValue.propTypes = {
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
	displayText: PropTypes.string
};

const Bonus = ({ value, displayText, bonusType, config }) => {
	const { userInfo, i18n, visitorCurrency } = config;
	const _currencyId = userInfo.isLogin
		? userInfo.currencyId
		: visitorCurrency[userInfo.langId];
	return (
		<div className="promotion-info-item">
			<div className="title">{displayText?.toUpperCase()}</div>
			{bonusType === 1 ? (
				<div>{`${value}%`}</div>
			) : (
				<div>{`${i18n[`Currency_${_currencyId}`]} ${value}`}</div>
			)}
		</div>
	);
};

Bonus.defaultProps = {
	value: null,
	displayText: null,
	bonusType: null,
	config: null
};

Bonus.propTypes = {
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
	displayText: PropTypes.string,
	bonusType: PropTypes.number,
	config: PropTypes.objectOf(PropTypes.any)
};

const MaxBonus = ({ value, displayText, bonusType, config }) => {
	const { userInfo, i18n, visitorCurrency } = config;
	const _currencyId = userInfo.isLogin
		? userInfo.currencyId
		: visitorCurrency[userInfo.langId];
	if (bonusType === 2) return null;
	return (
		<div className="promotion-info-item">
			<div className="title">{displayText?.toUpperCase()}</div>
			<div>{`${i18n[`Currency_${_currencyId}`]} ${value}`}</div>
		</div>
	);
};

MaxBonus.defaultProps = {
	value: null,
	displayText: null,
	bonusType: null,
	config: null
};

MaxBonus.propTypes = {
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
	displayText: PropTypes.string,
	bonusType: PropTypes.number,
	config: PropTypes.objectOf(PropTypes.any)
};

export const defElems = ({
	promotionInfo,
	i18n = {},
	isLogin,
	formatSetting,
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
				config={config}
			/>
		),
		[defRuleCols.remainingTime]: (
			<RemainingTime
				key={`promo-rule-${defRuleCols.remainingTime}`}
				promotionInfo={promotionInfo}
				i18n={i18n}
				isLogin={isLogin}
				config={config}
			/>
		),
		[defRuleCols.rollOver]: (
			<KeyValue
				key={`promo-rule-${defRuleCols.rollOver}`}
				i18n={i18n}
				displayText={i18n?.lbl_RollOver}
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
				config={config}
			/>
		)
	};
};

const reDepositElems = ({
	promotionInfo,
	i18n,
	isLogin,
	formatSetting,
	config
}) => {
	const { tierAmountList, bonusType } = promotionInfo;
	const isPercentage = bonusType === defBonusType.Percentage;

	const info = tierAmountList.map(el => (
		<div className="promotion-info" key={el.requiredAmount}>
			<MinAmount
				key={`promo-rule-${defRuleCols.minAmount}`}
				requiredAmount={el.requiredAmount}
				displayText={i18n?.lbl_Vip_Minimum_Deposit_Count}
				formatSetting={formatSetting}
				config={config}
			/>
			<Bonus
				key={`promo-rule-${defRuleCols.bonus}`}
				displayText={i18n?.lbl_Bonus}
				value={number_format(el.bonus, formatSetting)}
				icon="icon icon-promotion"
				bonusType={promotionInfo.bonusType}
				config={config}
			/>
			{isPercentage && (
				<MaxBonus
					key={`promo-rule-${defRuleCols.maxBonus}`}
					displayText={i18n?.lbl_MaxBonusAmount}
					value={number_format(el.maxBonus, formatSetting)}
					icon="icon icon-icon32px_money"
					bonusType={promotionInfo.bonusType}
					config={config}
				/>
			)}

			<KeyValue
				key={`promo-rule-${defRuleCols.rollOver}`}
				i18n={i18n}
				displayText={i18n?.lbl_RollOver}
				icon="icon icon-icon32px_"
				value={`${el.rollOver}x`}
				config={config}
			/>
		</div>
	));

	return (
		<>
			<div className="promotion-info">
				<RemainingTime
					key={`promo-rule-${defRuleCols.remainingTime}`}
					promotionInfo={promotionInfo}
					i18n={i18n}
					isLogin={isLogin}
					config={config}
				/>
			</div>

			{info}
		</>
	);
};

const PromoRule = ({ ruleCols, promotionInfo, config = {} }) => {
	const {
		formatSetting,
		userInfo: { isLogin },
		i18n
	} = useContext(configContext) ?? config;

	const { tierAmountList } = promotionInfo;

	let rows = [];
	if (tierAmountList?.length > 0) {
		rows = reDepositElems({
			promotionInfo,
			i18n,
			isLogin,
			formatSetting,
			config
		});
	} else {
		const allElems = defElems({
			promotionInfo,
			i18n,
			isLogin,
			formatSetting,
			config
		});
		rows = (
			<div className="promotion-info">
				{ruleCols.map(col => allElems[col])}
			</div>
		);
	}

	return rows;
};

PromoRule.defaultProps = {
	ruleCols: null,
	promotionInfo: null,
	config: null
};

PromoRule.propTypes = {
	ruleCols: PropTypes.arrayOf(PropTypes.any),
	promotionInfo: PropTypes.objectOf(PropTypes.any),
	config: PropTypes.objectOf(PropTypes.any)
};

export default PromoRule;
