import moment from "moment";
import { number_format as lib_number_foramt } from "@ailab-mobile/common";
import {
	defPromotionType,
	defPromoStatus,
	defWrapperCol,
	defFilterType
} from "./def";

export const isArrayNotEmpty = arr => {
	return Array.isArray(arr) && arr.length !== 0;
};

export const isExpiry = ({
	periodTo,
	custExpiryTime,
	isLogin,
	isJoin,
	promotionType
}) => {
	return isLogin &&
		isJoin &&
		promotionType !== defPromotionType.rebate &&
		promotionType !== defPromotionType.cashback
		? moment(moment.unix(custExpiryTime)).isBefore(new moment())
		: moment(moment.unix(periodTo)).isBefore(new moment());
};

export const isNew = ({ periodFrom }) => {
	return moment(moment.unix(periodFrom)).isAfter(
		new moment().add(-15, "days")
	);
};

export const isClaimed = ({ isJoin, status }) => {
	return (
		isJoin ||
		status === defPromoStatus.running ||
		status === defPromoStatus.TransferOut
	);
};

export const number_format = (number, formatSetting = {}) => {
	return lib_number_foramt({
		number,
		formatRequired:
			formatSetting[defWrapperCol.formatSetting.formatRequired],
		isConvertRequired:
			formatSetting[defWrapperCol.formatSetting.isConvertRequired],
		digits: formatSetting[defWrapperCol.formatSetting.digits]
	});
};

export const CanJoin = ({ _isExpiry, canJoin, filterType }) => {
	return !(
		_isExpiry ||
		(!canJoin && filterType == defFilterType.specialBonus)
	);
};
