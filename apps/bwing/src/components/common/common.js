export const getUrlParameter = name => {
	const _name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
	const regex = new RegExp(`[\\?&]${_name}=([^&#]*)`, "i");
	const results = regex.exec(window.location.search);
	return results === null
		? ""
		: decodeURIComponent(results[1].replace(/\+/g, " "));
};

export const number_format = (
	number,
	IsConvertRequired = false,
	digits = 2
) => {
	let n = number;
	if (!isNaN(number)) {
		n /= 1000;

		if (digits > 0) {
			n = Number(n).toFixed(digits);
		}
	}

	n += "";
	const arr = n.split(".");
	const re = /(\d{1,3})(?=(\d{3})+$)/g;

	return (
		arr[0].replace(re, "$1,") +
		(arr.length === 2 ? `.${arr[1]}` : "") +
		(IsConvertRequired ? " ('000)" : "")
	);
};

const _isConvertList = {
	51: true,
	15: true
};

export const isConvert = currencyId => {
	return _isConvertList[currencyId] === true;
};

export const checkAmount = (
	amount,
	minAmount,
	maxAmount,
	_isConvert,
	i18n,
	digits = 2
) => {
	let status = 0;
	let msg = "";
	if (amount !== null && amount !== undefined) {
		let num_Amount = isNaN(amount) ? 0 : Number(amount);
		if (_isConvert) {
			num_Amount *= 1000;
		}
		if (num_Amount <= 0) {
			status = 2;
			msg = i18n.lbl_AmountTooltip?.replace(
				"{{0}}",
				minAmount ? number_format(minAmount, _isConvert, digits) : 0
			);
		} else if (
			minAmount !== 0 &&
			maxAmount !== 0 &&
			(num_Amount > maxAmount || num_Amount < minAmount)
		) {
			status = 2;
			msg = `${number_format(num_Amount, _isConvert, digits)} ${
				i18n.lbl_NotinLimit
			}`;
		}
	}

	return { status, msg };
};

export const getAmountTip = (minAmount, _isConvert, i18n) => {
	return isNaN(minAmount)
		? i18n.lbl_AmountTooltip?.replace("{0}", 0)
		: i18n.lbl_AmountTooltip?.replace(
				"{0}",
				number_format(minAmount, _isConvert)
		  );
};

export const checkWithdrawalAmount = (amount, maxAmount, _isConvert, i18n) => {
	let status = 0;
	let msg = "";
	if (amount !== null && amount !== undefined) {
		let num_Amount = isNaN(amount) ? 0 : Number(amount);
		if (_isConvert) {
			num_Amount *= 1000;
		}
		if (num_Amount <= 0) {
			status = 2;
			msg = getAmountTip(0, _isConvert, i18n);
		} else if (maxAmount !== 0 && num_Amount > maxAmount) {
			status = 2;
			msg = `${number_format(num_Amount, _isConvert)} ${
				i18n.lbl_NotinLimit
			}`;
		}
	} else {
		status = 3;
		msg = getAmountTip(0, _isConvert, i18n);
	}

	return { status, msg };
};

export const setCookie = (cookieName, cookieValue, exdays) => {
	const d = new Date();
	d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
	const expires = `expires=${d.toUTCString()}`;
	document.cookie = `${cookieName}=${cookieValue};${expires};path=/`;
};

export const readCookie = cookieName => {
	const result = document.cookie.split(`${cookieName}=`);
	if (result.length === 2) {
		return result[1].split("; ")[0];
	}
	return null;
};

export const deleteCookie = cookieName => {
	setCookie(cookieName, null, 0);
	// document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
};

export const isEventPeriod = ({ startDate, endDate }) => {
	const now = new Date();
	const _startDate = startDate ? new Date(`${startDate} GMT+0700`) : null; // yyyy/mm/dd hh:mm:ss
	const _endDate = endDate ? new Date(`${endDate} GMT+0700`) : null; // yyyy/mm/dd hh:mm:ss

	let result = false;
	if (_startDate && _endDate) {
		result = now > _startDate && now < _endDate;
	} else if (_startDate) {
		result = now > _startDate;
	} else if (_endDate) {
		result = now < _endDate;
	}

	return result;
};

export const passwordCheck = ({ val, i18n }) => {
	let checked = true;
	let msg = "";

	const regx = /^(?=.{6,15}$)(?=.*[a-zA-Z0-9])(?=.*[!@#$%^&*]).*$/;
	if (!val) {
		checked = false;
		msg = i18n.msg_PasswordReq;
	} else if (val.length < 6 || val.length > 15) {
		checked = false;
		msg = i18n.msg_PasswordLength;
	} else if (!regx.test(val)) {
		checked = false;
		msg = i18n.msg_PasswordVaildate;
	}

	return { checked, msg };
};
