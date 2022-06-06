import React, { useContext } from "react";
import PropTypes from "prop-types";
import RemainTime from "../common/remainTime";
import { number_format } from "../common/common";
import { defRuleCols, defPromotionType } from "../common/def";
import { configContext } from "../common/context";

const visitorCurrency = {
	en: 2,
	th: 4,
	id: 15,
	cs: 2,
	my: 2,
	hi: 61,
	hi_en: 61,
	id_en: 15,
	th_en: 4
};

const MinAmount = ({
	requiredAmount,
	displayText,
	formatSetting,
	showIcon
}) => {
	const { userInfo, i18n } = useContext(configContext);
	const _currencyId = userInfo.isLogin
		? userInfo.currencyId
		: visitorCurrency[userInfo.langId];
	const value = `${i18n[`Currency_${_currencyId}`]} ${number_format(
		requiredAmount,
		formatSetting
	)}`;
	return (
		requiredAmount > 0 && (
			<div>
				<div className={showIcon ? "icon icon-icon32px_money" : ""}>
					{displayText?.toUpperCase()}
				</div>
				<div>{value}</div>
			</div>
		)
	);
};

MinAmount.defaultProps = {
	requiredAmount: null,
	displayText: null,
	formatSetting: null,
	showIcon: null
};

MinAmount.propTypes = {
	requiredAmount: PropTypes.number,
	displayText: PropTypes.string,
	formatSetting: PropTypes.objectOf(PropTypes.any),
	showIcon: PropTypes.bool
};

const RemainingTime = ({ promotionInfo, i18n = {}, isLogin, showIcon }) => (
	<div>
		<div className={showIcon ? "icon icon-icon32px_time" : ""}>
			{i18n?.lbl_RemainingTime?.toUpperCase()}
		</div>
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
	promotionInfo: null,
	showIcon: null
};

RemainingTime.propTypes = {
	isLogin: PropTypes.bool,
	i18n: PropTypes.objectOf(PropTypes.string),
	promotionInfo: PropTypes.objectOf(PropTypes.any),
	showIcon: PropTypes.bool
};

const KeyValue = ({ value, displayText, icon, showIcon }) => (
	<div>
		<div className={showIcon ? icon : ""}>{displayText?.toUpperCase()}</div>
		<div>{value}</div>
	</div>
);

KeyValue.defaultProps = {
	value: null,
	displayText: null,
	icon: null,
	showIcon: null
};

KeyValue.propTypes = {
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
	displayText: PropTypes.string,
	icon: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
	showIcon: PropTypes.bool
};

const Bonus = ({ value, displayText, bonusType, icon, showIcon }) => {
	const { userInfo, i18n } = useContext(configContext);
	const _currencyId = userInfo.isLogin
		? userInfo.currencyId
		: visitorCurrency[userInfo.langId];
	return (
		<div>
			<div className={showIcon ? icon : ""}>
				{displayText?.toUpperCase()}
			</div>
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
	icon: null,
	showIcon: null,
	bonusType: null
};

Bonus.propTypes = {
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
	displayText: PropTypes.string,
	icon: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
	showIcon: PropTypes.bool,
	bonusType: PropTypes.number
};

const MaxBonus = ({ value, displayText, bonusType, icon, showIcon }) => {
	const { userInfo, i18n } = useContext(configContext);
	const _currencyId = userInfo.isLogin
		? userInfo.currencyId
		: visitorCurrency[userInfo.langId];
	if (bonusType === 2) return null;
	return (
		<div>
			<div className={showIcon ? icon : ""}>
				{displayText?.toUpperCase()}
			</div>
			<div>{`${i18n[`Currency_${_currencyId}`]} ${value}`}</div>
		</div>
	);
};

MaxBonus.defaultProps = {
	value: null,
	displayText: null,
	icon: null,
	showIcon: null,
	bonusType: null
};

MaxBonus.propTypes = {
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
	displayText: PropTypes.string,
	icon: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
	showIcon: PropTypes.bool,
	bonusType: PropTypes.number
};

const defElems = ({
	promotionInfo,
	i18n = {},
	isLogin,
	formatSetting,
	showIcon
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
				showIcon={showIcon}
			/>
		),
		[defRuleCols.remainingTime]: (
			<RemainingTime
				key={`promo-rule-${defRuleCols.remainingTime}`}
				promotionInfo={promotionInfo}
				i18n={i18n}
				isLogin={isLogin}
				showIcon={showIcon}
			/>
		),
		[defRuleCols.rollOver]: (
			<KeyValue
				key={`promo-rule-${defRuleCols.rollOver}`}
				i18n={i18n}
				displayText={
					promotionInfo.fullFillType === 2
						? i18n?.lbl_WinOver
						: i18n?.lbl_RollOver
				}
				icon="icon icon-icon32px_"
				value={`${
					promotionInfo.fullFillType === 2
						? promotionInfo.winOver
						: promotionInfo.rollOver
				}x`}
				showIcon={showIcon}
			/>
		),
		[defRuleCols.bonus]: !isStaticOrRebate && (
			<Bonus
				key={`promo-rule-${defRuleCols.bonus}`}
				displayText={i18n?.lbl_Bonus}
				value={number_format(promotionInfo.bonus, formatSetting)}
				icon="icon icon-promotion"
				bonusType={promotionInfo.bonusType}
				showIcon={showIcon}
			/>
		),
		[defRuleCols.maxBonus]: !isStaticOrRebate && (
			<MaxBonus
				key={`promo-rule-${defRuleCols.maxBonus}`}
				displayText={i18n?.lbl_MaxBonusAmount}
				value={number_format(promotionInfo.maxBonus, formatSetting)}
				icon="icon icon-icon32px_money"
				bonusType={promotionInfo.bonusType}
				showIcon={showIcon}
			/>
		)
	};
};

const PromoRule = ({
	ruleCols,
	promotionInfo,
	className = "rolloverList",
	showIcon = false
}) => {
	const {
		formatSetting,
		userInfo: { isLogin },
		i18n
	} = useContext(configContext);
	const allElems = defElems({
		promotionInfo,
		i18n,
		isLogin,
		formatSetting,
		showIcon
	});

	const rows = ruleCols?.map(col => allElems[col]);
	return <div className={className}>{rows}</div>;
};

PromoRule.defaultProps = {
	ruleCols: null,
	promotionInfo: null,
	className: null,
	showIcon: null
};

PromoRule.propTypes = {
	ruleCols: PropTypes.string,
	promotionInfo: PropTypes.objectOf(PropTypes.any),
	className: PropTypes.string,
	showIcon: PropTypes.bool
};

export default PromoRule;
