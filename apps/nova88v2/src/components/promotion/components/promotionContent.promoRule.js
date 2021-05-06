import React, { useContext, useRef } from "react";
import RemainTime from "../common/remainTime";
import { number_format } from "../common/common";
import { defRuleCols, defPromotionType } from "../common/def";
import { configContext } from "../common/context";
import ProcessBar from "./processBar";

const MinAmount = ({ requiredAmount, displayText, formatSetting }) =>
	requiredAmount > 0 ? (
		<div>
			<div className="icon icon-icon32px_money">
				{displayText?.toUpperCase()}
			</div>
			<div>{number_format(requiredAmount, formatSetting)}</div>
		</div>
	) : null;

const RemainingTime = ({ promotionInfo, i18n = {}, isLogin }) => (
	<div>
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
	</div>
);

const KeyValue = ({ value, displayText }) => (
	<div>
		<div className="icon icon-coin-dollar">
			{displayText?.toUpperCase()}
		</div>
		<div>{value}</div>
	</div>
);

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
			<KeyValue
				key={`promo-rule-${defRuleCols.bonus}`}
				displayText={i18n?.lbl_Bonus}
				value={number_format(promotionInfo.bonus, formatSetting)}
			/>
		),
		[defRuleCols.maxBonus]: (
			<KeyValue
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
		i18n,
		api
	} = useContext(configContext);

	const allElems = defElems({
		promotionInfo,
		i18n,
		isLogin,
		formatSetting
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
			{rows}
			<ProcessBar
				{...promotionInfo}
				RefreshProcessBar={RefreshProcessBar.bind(this, promotionInfo)}
			/>
		</div>
	);
};
