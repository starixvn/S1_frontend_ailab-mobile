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

	let isActive = false;
	const periodFromTime = moment.unix(promotionInfo.periodFrom);
	if (periodFromTime.diff(Date.now()) <= 0) {
		isActive = true;
	}

	const isExpiryDate = isExpiry({
		...promotionInfo,
		isLogin
	});

	let displayText = "";
	if (!isActive) {
		displayText = `0 ${i18n.lbl_Days} 0 ${i18n.lbl_Hours}`;
	} else if (isExpiryDate) {
		displayText = "-";
	} else {
		displayText = `${diffDays} ${i18n.lbl_Days} ${expiryTime.hours()} ${
			i18n.lbl_Hours
		}`;
	}

	return displayText;
};
