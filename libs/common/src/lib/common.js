export const getUrlParameter = name => {
	name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
	var regex = new RegExp("[\\?&]" + name + "=([^&#]*)", "i");
	var results = regex.exec(window.location.search);
	return results === null
		? ""
		: decodeURIComponent(results[1].replace(/\+/g, " "));
};

export const number_format = (
	n,
	IsConvertRequired = false,
	divisionBy1000 = false
) => {
	if (divisionBy1000)
		return number_format_divisionBy1000(n, IsConvertRequired);
	else {
		if (!isNaN(n)) {
			if (IsConvertRequired) {
				n /= 1000;
			}
			n = Number(n).toFixed(2);
		}

		n += "";
		var arr = n.split(".");
		var re = /(\d{1,3})(?=(\d{3})+$)/g;
		return (
			arr[0].replace(re, "$1,") +
			(arr.length == 2 ? "." + arr[1] : "") +
			(IsConvertRequired ? " ('000)" : "")
		);
	}
};

const number_format_divisionBy1000 = (n, IsConvertRequired = false) => {
	console.log("go");
	if (!isNaN(n)) {
		n /= 1000;
	}

	n += "";
	let arr = n.split(".");
	let re = /(\d{1,3})(?=(\d{3})+$)/g;

	if (IsConvertRequired) {
		return (
			arr[0].replace(re, "$1,") +
			(arr.length === 2 ? "." + arr[1] : "") +
			(IsConvertRequired ? " ('000)" : "")
		);
	} else {
		return arr[0].replace(re, "$1,");
	}
};

const _isConvertList = {
	51: true,
	15: true
};

export const isConvert = currencyId => {
	return _isConvertList[currencyId] === true;
};

export const checkAmount = (amount, minAmount, maxAmount, _isConvert, i18n) => {
	let status = 0;
	let msg = "";
	if (amount !== null && amount !== undefined) {
		let num_Amount = isNaN(amount) ? 0 : Number(amount);
		if (_isConvert) {
			num_Amount *= 1000;
		}
		if (num_Amount <= 0) {
			status = 2;
			msg = i18n.lbl_AmountTooltip;
		} else if (
			minAmount !== 0 &&
			maxAmount !== 0 &&
			(num_Amount > maxAmount || num_Amount < minAmount)
		) {
			status = 2;
			msg =
				number_format(num_Amount, _isConvert) +
				" " +
				i18n.lbl_NotinLimit;
		}
	}

	return { status: status, msg: msg };
};

export const setCookie = (cookieName, cookieValue, exdays) => {
	let d = new Date();
	d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
	var expires = "expires=" + d.toUTCString();
	document.cookie =
		cookieName + "=" + cookieValue + ";" + expires + ";path=/";
};

export const readCookie = cookieName => {
	let result = document.cookie.split(`${cookieName}=`);
	if (result.length === 2) {
		return result[1].split("; ")[0];
	} else {
		return null;
	}
};

export const deleteCookie = cookieName => {
	document.cookie = cookieName + "=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
};

export function getCookie(cookieName) {
	var name = cookieName + "=";
	var ca = document.cookie.split(";");
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == " ") c = c.substring(1);
		if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
	}
	return "";
}
