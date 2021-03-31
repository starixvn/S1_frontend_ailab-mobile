import moment from "moment";
import { defPromoStatus } from "./def";
import { isExpiry } from "./common";

export default ({ promotionInfo, i18n, isLogin }) => {
	const _expiryTime = moment.unix(
		promotionInfo.isJoin &&
			promotionInfo.status === defPromoStatus.running &&
			promotionInfo.custExpiryTime
			? moment(promotionInfo.custExpiryTime).unix()
			: promotionInfo.periodTo
	);

	const diffDays = Math.ceil(
		moment.duration(_expiryTime.diff(moment())).asDays() - 1
	);

	const expiryTime = moment.duration(_expiryTime.diff(new Date()));

	return isExpiry({
		...promotionInfo,
		isLogin
	})
		? "-"
		: `${diffDays} ${i18n.lbl_Days} ${expiryTime.hours()} ${
				i18n.lbl_Hours
		  }`;
};
