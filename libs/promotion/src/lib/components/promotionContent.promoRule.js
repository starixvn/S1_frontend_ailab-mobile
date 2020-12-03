import React, { useContext } from "react";
import RemainTime from "../common/remainTime";
import { number_format } from "@ailab-mobile/common";
import { defRuleCols } from "../common/def";
import { configContext } from "../common/context";

const MinAmount = ({
	requiredAmount,
	displayText,
	isConvert,
	divisionBy1000
}) =>
	requiredAmount > 0 ? (
		<li>
			<span className="title">{displayText?.toUpperCase()}</span>
			<span>
				{number_format(requiredAmount, isConvert, divisionBy1000)}
			</span>
		</li>
	) : null;

const RemainingTime = ({ promotionInfo, i18n, isLogin }) => (
	<li>
		<span className="title">{i18n.lbl_RemainingTime?.toUpperCase()}</span>
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

const defElems = ({
	promotionInfo,
	i18n,
	isLogin,
	isConvert,
	divisionBy1000
}) => {
	return {
		[defRuleCols.minAmount]: (
			<MinAmount
				key={`promo-rule-${defRuleCols.minAmount}`}
				requiredAmount={promotionInfo.requiredAmount}
				displayText={i18n.lbl_MinAmount}
				isConvert={isConvert}
				divisionBy1000={divisionBy1000}
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
				displayText={i18n.lbl_RollOver}
			/>
		),
		[defRuleCols.bonus]: (
			<KeyValue
				key={`promo-rule-${defRuleCols.bonus}`}
				displayText={i18n.lbl_Bonus}
				value={number_format(
					promotionInfo.bonus,
					isConvert,
					divisionBy1000
				)}
			/>
		),
		[defRuleCols.maxBonus]: (
			<KeyValue
				key={`promo-rule-${defRuleCols.maxBonus}`}
				displayText={i18n.lbl_MaxBonusAmount}
				value={number_format(
					promotionInfo.maxBonus,
					isConvert,
					divisionBy1000
				)}
			/>
		)
	};
};

export default ({
	ruleCols = [
		defRuleCols.minAmount,
		defRuleCols.rollOver,
		defRuleCols.remainingTime
	],
	promotionInfo
}) => {
	const {
		isConvert,
		divisionBy1000,
		userInfo: { isLogin },
		i18n
	} = useContext(configContext);

	const allElems = defElems({
		promotionInfo,
		i18n,
		isLogin,
		isConvert,
		divisionBy1000
	});

	let rows = ruleCols.map(col => allElems[col]);
	return (
		<div className="info">
			<ul>{rows}</ul>
		</div>
	);
};
