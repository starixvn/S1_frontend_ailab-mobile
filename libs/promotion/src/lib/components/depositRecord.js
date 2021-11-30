import React from "react";
import { defPromotionType, defFilterType } from "../common/def";
import SingleRecord from "./depositRecord.singleRecord";
import MultipleRecord from "./depositRecord.multiRecord";

export default ({ i18n = {}, promotionInfo, currencyId, filterType }) => {
	const isSpecialBonus =
		promotionInfo.filterType === defFilterType.specialBonus ||
		filterType === defFilterType.specialBonus;

	if (
		!isSpecialBonus &&
		promotionInfo.canJoin &&
		!promotionInfo.isJoin &&
		(promotionInfo.promotionType === defPromotionType.reDeposit ||
			promotionInfo.promotionType === defPromotionType.firstDeposit)
	) {
		return promotionInfo.promotionType === defPromotionType.reDeposit ? (
			<MultipleRecord i18n={i18n} {...promotionInfo} />
		) : (
			<SingleRecord
				i18n={i18n}
				{...promotionInfo}
				currencyId={currencyId}
			/>
		);
	}
	return null;
};
