/* eslint-disable no-param-reassign */
import moment from "moment";

import {
	defPromotionType,
	defPromoStatus,
	defWrapperCol,
	defFilterType
} from "./def";

export const lib_number_foramt = ({
	number,
	formatRequired = false,
	isConvertRequired = false,
	digits = 2
}) => {
	if (!isNaN(number)) {
		if (isConvertRequired || formatRequired) {
			number /= 1000;
		}

		if (digits > 0) {
			number = Number(number).toFixed(digits);
		}
	}

	number += "";
	// eslint-disable-next-line prefer-const
	let arr = number.split(".");
	const re = /(\d{1,3})(?=(\d{3})+$)/g;

	return `${arr[0].replace(re, "$1,")}${
		// eslint-disable-next-line prefer-template
		digits > 0 && arr.length === 2 ? "." + arr[1] : ""
	}${formatRequired ? " ('000)" : ""}`;
};

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
		? moment(custExpiryTime).isBefore(new moment())
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
