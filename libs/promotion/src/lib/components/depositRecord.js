import React from "react";
import { defPromotionType } from "../common/def";
import SingleRecord from "./depositRecord.singleRecord";
import MultipleRecord from "./depositRecord.multiRecord";

export default ({ i18n = {}, promotionInfo }) => {
	if (
		promotionInfo.canJoin &&
		!promotionInfo.isJoin &&
		(promotionInfo.promotionType === defPromotionType.reDeposit ||
			promotionInfo.promotionType === defPromotionType.firstDeposit)
	) {
		return promotionInfo.promotionType === defPromotionType.reDeposit ? (
			<MultipleRecord i18n={i18n} {...promotionInfo} />
		) : (
			<SingleRecord i18n={i18n} {...promotionInfo} />
		);
	} else {
		return null;
	}
};
