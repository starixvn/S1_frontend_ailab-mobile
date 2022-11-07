import React, { useContext } from "react";
import PropTypes from "prop-types";
import RemainTime from "../common/remainTime";
import { number_format } from "../common/common";
import { defRuleCols, defPromotionType, defBonusType } from "../common/def";
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

RemainingTime.defaultProps = {
	isLogin: null,
	i18n: null,
	promotionInfo: null,
	isList: null
};

RemainingTime.propTypes = {
	isLogin: PropTypes.bool,
	i18n: PropTypes.objectOf(PropTypes.string),
	promotionInfo: PropTypes.objectOf(PropTypes.any),
	isList: PropTypes.bool
};

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

KeyValue.defaultProps = {
	value: null,
	displayText: null,
	icon: null,
	isList: null
};

KeyValue.propTypes = {
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
	displayText: PropTypes.string,
	icon: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
	isList: PropTypes.bool
};

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

Bonus.defaultProps = {
	value: null,
	displayText: null,
	icon: null,
	isList: null,
	bonusType: null,
	config: null
};

Bonus.propTypes = {
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
	displayText: PropTypes.string,
	icon: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
	isList: PropTypes.bool,
	bonusType: PropTypes.number,
	config: PropTypes.objectOf(PropTypes.any)
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

MaxBonus.defaultProps = {
	value: null,
	displayText: null,
	icon: null,
	isList: null,
	bonusType: null,
	config: null
};

MaxBonus.propTypes = {
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
	displayText: PropTypes.string,
	icon: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
	isList: PropTypes.bool,
	bonusType: PropTypes.number,
	config: PropTypes.objectOf(PropTypes.any)
};

export const defElems = ({
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

const reDepositElems = ({
	promotionInfo,
	i18n,
	isLogin,
	formatSetting,
	isList,
	config
}) => {
	const { tierAmountList, bonusType } = promotionInfo;
	const isPercentage = bonusType === defBonusType.Percentage;

	const info = tierAmountList.map(el => (
		<div className="info promotionInfo" key={el.requiredAmount}>
			<ul>
				<MinAmount
					key={`promo-rule-${defRuleCols.minAmount}`}
					requiredAmount={el.requiredAmount}
					displayText={i18n?.lbl_Vip_Minimum_Deposit_Count}
					formatSetting={formatSetting}
					isList={isList}
					config={config}
				/>
				<Bonus
					key={`promo-rule-${defRuleCols.bonus}`}
					displayText={i18n?.lbl_Bonus}
					value={number_format(el.bonus, formatSetting)}
					icon="icon icon-promotion"
					bonusType={promotionInfo.bonusType}
					isList={isList}
					config={config}
				/>
				{isPercentage && (
					<MaxBonus
						key={`promo-rule-${defRuleCols.maxBonus}`}
						displayText={i18n?.lbl_MaxBonusAmount}
						value={number_format(el.maxBonus, formatSetting)}
						icon="icon icon-icon32px_money"
						bonusType={promotionInfo.bonusType}
						isList={isList}
						config={config}
					/>
				)}

				<KeyValue
					key={`promo-rule-${defRuleCols.rollOver}`}
					i18n={i18n}
					displayText={i18n?.lbl_RollOver}
					isList={isList}
					icon="icon icon-icon32px_"
					value={`${el.rollOver}x`}
					config={config}
				/>
			</ul>
		</div>
	));

	return (
		<>
			<div className="info promotionInfo">
				<ul>
					<RemainingTime
						key={`promo-rule-${defRuleCols.remainingTime}`}
						promotionInfo={promotionInfo}
						i18n={i18n}
						isLogin={isLogin}
						isList={isList}
						config={config}
					/>
				</ul>
			</div>

			{info}
		</>
	);
};

const PromoRule = ({ ruleCols, promotionInfo, isList = true, config = {} }) => {
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
			isList,
			config
		});
	} else {
		const allElems = defElems({
			promotionInfo,
			i18n,
			isLogin,
			formatSetting,
			isList,
			config
		});
		rows = isList ? (
			<div className="rollover">
				<div>{ruleCols.map(col => allElems[col])}</div>
			</div>
		) : (
			<div className="info promotionInfo">
				<ul>{ruleCols.map(col => allElems[col])}</ul>
			</div>
		);
	}

	return rows;
};

PromoRule.defaultProps = {
	ruleCols: null,
	promotionInfo: null,
	isList: null,
	config: null
};

PromoRule.propTypes = {
	ruleCols: PropTypes.arrayOf(PropTypes.any),
	promotionInfo: PropTypes.objectOf(PropTypes.any),
	isList: PropTypes.bool,
	config: PropTypes.objectOf(PropTypes.any)
};

export default PromoRule;
