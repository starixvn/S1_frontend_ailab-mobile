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
	showIcon
}) => {
	const { userInfo, i18n } = useContext(configContext);
	const value = `${i18n[`Currency_${userInfo.currencyId}`]} ${number_format(
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
	return (
		<div>
			<div className={showIcon ? icon : ""}>
				{displayText?.toUpperCase()}
			</div>
			{bonusType === 1 ? (
				<div>{`${value}%`}</div>
			) : (
				<div>
					{`${i18n[`Currency_${userInfo.currencyId}`]} ${value}`}
				</div>
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
	if (bonusType === 2) return null;
	return (
		<div>
			<div className={showIcon ? icon : ""}>
				{displayText?.toUpperCase()}
			</div>
			<div>{`${i18n[`Currency_${userInfo.currencyId}`]} ${value}`}</div>
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

export const defElems = ({
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

const reDepositElems = ({
	promotionInfo,
	i18n,
	isLogin,
	formatSetting,
	showIcon
}) => {
	const { tierAmountList, bonusType } = promotionInfo;
	const isPercentage = bonusType === defBonusType.Percentage;

	const info = tierAmountList.map(el => (
		<div className="rolloverList">
			<MinAmount
				key={`promo-rule-${defRuleCols.minAmount}`}
				requiredAmount={el.requiredAmount}
				displayText={i18n?.lbl_Vip_Minimum_Deposit_Count}
				formatSetting={formatSetting}
				showIcon={showIcon}
			/>
			<Bonus
				key={`promo-rule-${defRuleCols.bonus}`}
				displayText={i18n?.lbl_Bonus}
				value={number_format(el.bonus, formatSetting)}
				icon="icon icon-promotion"
				bonusType={promotionInfo.bonusType}
				showIcon={showIcon}
			/>
			{isPercentage && (
				<MaxBonus
					key={`promo-rule-${defRuleCols.maxBonus}`}
					displayText={i18n?.lbl_MaxBonusAmount}
					value={number_format(el.maxBonus, formatSetting)}
					icon="icon icon-icon32px_money"
					bonusType={el.bonusType}
					showIcon={showIcon}
				/>
			)}
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
					promotionInfo.fullFillType === 2 ? el.winOver : el.rollOver
				}x`}
				showIcon={showIcon}
			/>
		</div>
	));

	return (
		<>
			<div className="rolloverList">
				<RemainingTime
					key={`promo-rule-${defRuleCols.remainingTime}`}
					promotionInfo={promotionInfo}
					i18n={i18n}
					isLogin={isLogin}
					showIcon={showIcon}
				/>
			</div>

			{info}
		</>
	);
};

const PromoRule = ({
	ruleCols,
	promotionInfo,
	className,
	showIcon = false
}) => {
	const {
		formatSetting,
		userInfo: { isLogin },
		i18n
	} = useContext(configContext);

	const { tierAmountList } = promotionInfo;

	let rows = [];
	if (tierAmountList?.length > 0) {
		rows = reDepositElems({
			promotionInfo,
			i18n,
			isLogin,
			formatSetting,
			showIcon
		});
	} else {
		const allElems = defElems({
			promotionInfo,
			i18n,
			isLogin,
			formatSetting,
			showIcon
		});
		rows = (
			<div className={className}>
				{ruleCols?.map(col => allElems[col])}
			</div>
		);
	}

	return rows;
};

PromoRule.defaultProps = {
	ruleCols: null,
	promotionInfo: null,
	className: "rolloverList",
	showIcon: null
};

PromoRule.propTypes = {
	ruleCols: PropTypes.arrayOf(PropTypes.any),
	promotionInfo: PropTypes.objectOf(PropTypes.any),
	className: PropTypes.string,
	showIcon: PropTypes.bool
};

export default PromoRule;
