export const getUrlParameter = name => {
	const paramName = name.replace(/[[]/, "\\[").replace(/[\]]/, "\\]");
	const regex = new RegExp(`[\\?&]${paramName}=([^&#]*)`, "i");
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
	if (!isNaN(n)) {
		n /= 1000;

		if (digits > 0) {
			// 無條件捨去到第二位，避免四捨五入進位
			n = (
				Math.floor(n * Math.pow(10, digits)) /
				Math.pow(10, digits).toFixed(digits)
			).toFixed(digits);
		}
	}

	n += "";
	const arr = n.split(".");
	const re = /(\d{1,3})(?=(\d{3})+$)/g;

	return (
		arr[0].replace(re, "$1,") +
		(arr.length === 2 && digits > 0 ? `.${arr[1]}` : "") +
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

export const checkAmount = ({
	amount,
	minAmount,
	maxAmount,
	_isConvert,
	i18n,
	digits = 2,
	maxAmountAllowUnlimit = true,
	hintKey
}) => {
	let status = 0;
	let msg = "";
	if (amount !== null && amount !== undefined) {
		let numAmount = isNaN(amount) ? 0 : Number(amount);
		if (_isConvert) {
			numAmount *= 1000;
		}
		if (numAmount <= 0 || (minAmount !== 0 && numAmount < minAmount)) {
			status = 2;
			msg = i18n.lbl_AmountTooltip?.replace(
				"{{0}}",
				minAmount ? number_format(minAmount, _isConvert, digits) : 0
			);
		} else if (
			(minAmount !== 0 &&
				maxAmount !== 0 &&
				(numAmount > maxAmount || numAmount < minAmount)) ||
			(!maxAmountAllowUnlimit && numAmount > maxAmount)
		) {
			status = 2;
			msg = `${number_format(numAmount, _isConvert, digits)} ${
				i18n[hintKey ?? "lbl_NotinLimit"]
			}`;
		}
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

export const getCookie = cookieName => {
	const name = `${cookieName}=`;
	const ca = document.cookie.split(";");
	for (let i = 0; i < ca.length; i++) {
		let c = ca[i];
		while (c.charAt(0) === " ") c = c.substring(1);
		if (c.indexOf(name) === 0) return c.substring(name.length, c.length);
	}
	return "";
};

export const deleteCookie = cookieName => {
	setCookie(cookieName, null, 0);
	// document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
};

export const passwordCheck = ({ val, i18n }) => {
	let checked = true;
	let msg = "";

	const regx = /^(?=.{6,15}$)[a-zA-Z0-9!@#$%^&*]*$/;
	if (!val) {
		checked = false;
		msg = i18n.msg_PasswordReq;
	} else if (!regx.test(val)) {
		checked = false;
		msg = i18n.lbl_PasswordTooltip;
	}

	return { checked, msg };
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

export const throttle = (func, limit) => {
	let inThrottle;
	return (...args) => {
		if (!inThrottle) {
			func(...args);
			inThrottle = setTimeout(() => {
				inThrottle = false;
			}, limit);
		}
	};
};

export const stringLinkify = text => {
	const pattern = /(\b(https?):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
	return text
		.replace(pattern, '<a href="$1" target="_blank">$1</a>')
		.replaceAll("\n", "<br />");
};

export const getWindowOpenUrl = ({ mainUrl, param }) => {
	const paramArray = Object.entries(param);
	const paramString = paramArray
		.filter(arr => Boolean(arr[1]))
		.map(arr => arr.join("="))
		.join("&");

	return `${mainUrl}?${paramString}`;
};

// 用於上傳圖片轉 AWS Url
export const getBase64 = file =>
	new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result);
		reader.onerror = error => reject(error);
	});

// 防抖(避免函式多次觸發)
export const debounce = (fn, delay) => {
	let timerId;
	return (...args) => {
		clearTimeout(timerId);
		timerId = setTimeout(() => {
			fn(...args);
		}, delay);
	};
};

// 數字 format 到特定小數點，預設為第二位
export const numFormatToDigits = (
	value,
	digits = 2,
	minimumFractionDigits = 0
) => {
	if (isNaN(value) || value === undefined) return "0";
	const formatter = new Intl.NumberFormat("en", {
		maximumFractionDigits: digits,
		minimumFractionDigits
	});
	return formatter.format(Number(value.toFixed(digits)));
};
