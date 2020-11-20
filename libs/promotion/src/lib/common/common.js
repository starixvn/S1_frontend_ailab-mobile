import moment from "moment";
import { defPromotionType, defPromoStatus } from "./def";

export const isArrayNotEmpty = arr => {
	return Array.isArray(arr) && arr.length !== 0;
};

export const isExpiry = ({
	periodTo,
	custExpiryTime,
	isLogin,
	isJoin,
	status,
	promotionType
}) => {
	if (
		isLogin &&
		isJoin &&
		promotionType !== defPromotionType.rebate &&
		promotionType !== defPromotionType.cashback
	) {
		return (
			moment(moment.unix(custExpiryTime)).isBefore(new moment()) ||
			(status !== defPromoStatus.running &&
				status !== defPromoStatus.TransferOut)
		);
	} else {
		return moment(moment.unix(periodTo)).isBefore(new moment());
	}
};

export const isNew = ({ periodFrom }) => {
	return moment(moment.unix(periodFrom)).isAfter(
		new moment().add(-14, "days")
	);
};

export const isClaimed = ({ isJoin, status }) => {
	return (
		isJoin ||
		status === defPromoStatus.running ||
		status === defPromoStatus.TransferOut
	);
};
