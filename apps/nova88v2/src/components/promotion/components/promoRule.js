import React, { useContext, useRef } from "react";
import RemainTime from "../common/remainTime";
import { number_format } from "../common/common";
import { defRuleCols, defPromotionType } from "../common/def";
import { configContext } from "../common/context";
import ProcessBar from "./processBar";

const visitorCurrency = {
	en: 2,
	th: 4,
	id: 15,
	cs: 2,
	hi: 61,
	hi_en: 61,
	id_en: 15,
	th_en: 4
};

const MinAmount = ({ requiredAmount, displayText, formatSetting, isList }) => {
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
				<div className={isList ? "icon icon-icon32px_money" : ""}>
					{displayText?.toUpperCase()}
				</div>
				<div>{value}</div>
			</div>
		)
	);
};

const RemainingTime = ({ promotionInfo, i18n = {}, isLogin, isList }) => (
	<div>
		<div className={isList ? "icon icon-icon32px_time" : ""}>
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

const KeyValue = ({ value, displayText, icon, isList }) => (
	<div>
		<div className={isList ? icon : ""}>{displayText?.toUpperCase()}</div>
		<div>{value}</div>
	</div>
);

const Bonus = ({ value, displayText, bonusType, icon, isList }) => {
	const { userInfo, i18n } = useContext(configContext);
	const _currencyId = userInfo.isLogin
		? userInfo.currencyId
		: visitorCurrency[userInfo.langId];
	return (
		<div>
			<div className={isList ? icon : ""}>
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

const MaxBonus = ({ value, displayText, bonusType, icon, isList }) => {
	const { userInfo, i18n } = useContext(configContext);
	const _currencyId = userInfo.isLogin
		? userInfo.currencyId
		: visitorCurrency[userInfo.langId];
	if (bonusType === 2) return null;
	return (
		<div>
			<div className={isList ? icon : ""}>
				{displayText?.toUpperCase()}
			</div>
			<div>{`${i18n[`Currency_${_currencyId}`]} ${value}`}</div>
		</div>
	);
};

const defElems = ({
	promotionInfo,
	i18n = {},
	isLogin,
	formatSetting,
	isList
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
			/>
		),
		[defRuleCols.remainingTime]: (
			<RemainingTime
				key={`promo-rule-${defRuleCols.remainingTime}`}
				promotionInfo={promotionInfo}
				i18n={i18n}
				isLogin={isLogin}
				isList={isList}
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
			/>
		)
	};
};

export default ({ ruleCols, promotionInfo, isList = true }) => {
	const {
		formatSetting,
		userInfo: { isLogin },
		i18n,
		api
	} = useContext(configContext);
	const allElems = defElems({
		promotionInfo,
		i18n,
		isLogin,
		formatSetting,
		isList
	});
	const isMountedRef = useRef(null);
	const RefreshProcessBar = ({ bonusCode, tpId, categoryId }) => {
		api.promotion
			.GetCustSpecificBonus({
				BonusCode: bonusCode,
				TpId: tpId,
				PromoCategoryId: categoryId
			})
			.then(res => {
				if (
					isMountedRef.current &&
					res.data.errorCode === 0 &&
					res.data.data
				) {
					setPromotionInfo(prevS => ({
						...prevS,
						custRollOver: res.data.data.rollover,
						custTurnOver: res.data.data.turnover
					}));
				}
			});
	};

	const rows = ruleCols.map(col => allElems[col]);
	return (
		<div className={isList ? "rollover" : "rolloverList"}>
			{rows}
			<ProcessBar
				{...promotionInfo}
				RefreshProcessBar={RefreshProcessBar.bind(this, promotionInfo)}
			/>
		</div>
	);
};
