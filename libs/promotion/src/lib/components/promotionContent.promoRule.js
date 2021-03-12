import React, { useContext } from "react";
import RemainTime from "../common/remainTime";
import { number_format } from "../common/common";
import { defRuleCols } from "../common/def";
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
		<span className="title">{displayText?.toUpperCase()}</span>
		<span>{value}</span>
	</li>
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
		i18n
	} = useContext(configContext);

	const allElems = defElems({
		promotionInfo,
		i18n,
		isLogin,
		formatSetting
	});

	let rows = ruleCols.map(col => allElems[col]);
	return (
		<div className="info">
			<ul>{rows}</ul>
		</div>
	);
};
