import React from "react";
import { defPromotionType } from "../common/def";
import SingleRecord from "./depositRecord.singleRecord";
import MultipleRecord from "./depositRecord.multiRecord";

export default ({ i18n, promotionInfo }) => {
	if (
		promotionInfo.canJoin &&
		!promotionInfo.isJoin &&
		(promotionInfo.promotionType === defPromotionType.reDeposit ||
			promotionInfo.promotionType === defPromotionType.firstDeposit)
	) {
		if (promotionInfo.promotionType === defPromotionType.reDeposit) {
			return <MultipleRecord i18n={i18n} {...promotionInfo} />;
		} else {
			return <SingleRecord i18n={i18n} {...promotionInfo} />;
		}
	} else {
		return null;
	}
};
