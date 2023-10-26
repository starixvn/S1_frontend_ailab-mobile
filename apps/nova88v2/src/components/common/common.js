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
	digits = 2,
	formatRequired = true
) => {
	let n = number;
	if (!isNaN(n)) {
		if (IsConvertRequired) {
			n /= 1000;
		}

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
		(IsConvertRequired && formatRequired ? " ('000)" : "")
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
				minAmount ? number_format(minAmount, _isConvert, digits) : 1
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
	return result.length === 2 ? result[1].split("; ")[0] : null;
};

export const deleteCookie = cookieName => {
	setCookie(cookieName, null, 0);
	// document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
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

export const passwordCheck = ({ val }) => {
	let checked = true;
	let msg = "";

	const regx = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z!@#$%^&*\d]{6,15}$/;
	if (!val) {
		checked = false;
		msg = "msg_PasswordReq";
	} else if (!regx.test(val)) {
		checked = false;
		msg = "msg_PasswordVaildate";
	}

	return { checked, msg };
};

export const isEventPeriod = ({ startDate, endDate }) => {
	const now = new Date();
	const _startDate = startDate ? new Date(`${startDate} GMT+0800`) : null; // yyyy/mm/dd hh:mm:ss
	const _endDate = endDate ? new Date(`${endDate} GMT+0800`) : null; // yyyy/mm/dd hh:mm:ss

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

// [------- Currency -------

export const defCurrencyToClass = {
	2: "ch",
	3: "gb",
	4: "th",
	13: "cs",
	15: "id",
	51: "vn",
	61: "in",
	72: "kh",
	74: "bd"
};

export const defCurrencyToLang = {
	2: "my",
	3: "gb",
	4: "th",
	13: "cs",
	15: "id",
	51: "vn",
	61: "hi",
	72: "kh",
	74: "bd"
};

export const currCustomMapping = {
	2: "MYR",
	4: "THB",
	13: "MYR",
	15: "IDR",
	51: "VND",
	61: "INR",
	72: "KHM",
	74: "BDT"
};

export const defCurrenyId = {
	MYR: 2,
	USD: 3,
	THB: 4,
	CNY: 13,
	IDR: 15,
	VND: 51,
	INR: 61,
	KHM: 72,
	BDT: 74,
	USDT: 96
};

export const defCountryCode = {
	2: "MY",
	4: "TH",
	13: "CS",
	3: "CS",
	15: "ID",
	51: "VN",
	72: "KH",
	74: "BD",
	61: "HI"
};

// * 跟桌機用同一張表，用於透過 瀏覽器語言 mapping 出 currencyId
export const currencyCode = {
	EN: 2,
	MY: 2,
	USD: 3,
	CS: 3, // * USD
	Global_EN: 3, // * USD
	TH: 4,
	TH_EN: 4,
	CNY_CH: 13, // * CNY
	ID: 15,
	ID_EN: 15,
	VN: 51,
	HI_EN: 61,
	INR: 61,
	HI: 61,
	IN: 61,
	KH: 72,
	KH_EN: 72,
	BD: 74,
	BDT: 74,
	USDT: 96
};

export const currencyIdToCurrency = {
	2: "MYR",
	3: "USD",
	4: "THB",
	13: "CNY",
	15: "IDR",
	51: "VND",
	61: "INR",
	74: "BDT"
};

export const currencyIdToTimeZone = {
	2: "+08:00",
	13: "+08:00",
	4: "+07:00",
	15: "+07:00",
	72: "+07:00",
	74: "+06:00",
	61: "+05:30",
	3: "+00:00",
	51: "+07:00"
};

export const langMappingCurr = {
	en: "MYR",
	cs: "MYR",
	my: "MYR",
	id: "IDR",
	th: "THB",
	hi: "INR",
	bd: "BDT",
	kh: "KHM",
	vn: "VND"
};

export const defCurrencyToLangId = {
	2: "my",
	3: "global",
	4: "th",
	13: "cs",
	15: "id",
	51: "vn",
	61: "hi",
	72: "kh",
	74: "bd"
};

// liveChat 專屬
export const defLiveChatLangIdToCurrencyId = {
	en: 1,
	id: 2,
	cs: 3,
	th: 4,
	hi: 8
	// 以下無支援會自動導到英文 1
	// my
	// bd
	// kh
};

export const GetCurrencyName = ({ langId, currencyId, i18n }) => {
	const currency = currencyId
		? currCustomMapping[currencyId] ?? i18n[`Currency_${currencyId}`]
		: langMappingCurr[langId];
	return currency;
};

// ------- Currency -------]

export const validImgLang = langId => {
	if (
		langId !== "en" &&
		langId !== "cs" &&
		langId !== "my" &&
		langId !== "th" &&
		langId !== "id" &&
		langId !== "bd"
	) {
		return "en";
	}
	return langId;
};

export const stringLinkify = text => {
	const pattern = /(\b(https?):\/\/[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|])/gim;
	return text
		.replace(pattern, '<a href="$1" target="_blank">$1</a>')
		.replaceAll("\n", "<br />");
};

export const getLocalStorage = key => {
	const json = localStorage.getItem(key);

	return json ? JSON.parse(json) : undefined;
};

export const getCombineLangId = (langId, currencyId) => {
	const checkedCurrencyId = currencyId ?? defCurrenyId.MYR;

	let combineLangId = "";

	switch (langId) {
		case "en":
			combineLangId = `${
				defCurrencyToLangId[Number(checkedCurrencyId)]
			}_en`;
			break;
		case "cs":
			combineLangId =
				currencyId === defCurrenyId.CNY
					? "cs"
					: `${defCurrencyToLangId[Number(checkedCurrencyId)]}_cs`;
			break;
		default:
			combineLangId = langId;
			break;
	}
	return combineLangId;
};

export const getCombineLeaderBoardLangId = (langId, currencyId) => {
	const checkedCurrencyId = currencyId ?? defCurrenyId.MYR;

	let combineLangId = "";

	if (currencyId === defCurrenyId.MYR) {
		return langId;
	}

	switch (langId) {
		case "en":
			combineLangId = `${
				defCurrencyToLangId[Number(checkedCurrencyId)]
			}_en`;
			break;
		case "cs":
			combineLangId =
				currencyId === defCurrenyId.CNY
					? "cs"
					: `${defCurrencyToLangId[Number(checkedCurrencyId)]}_cs`;
			break;
		default:
			combineLangId = langId;
			break;
	}
	return combineLangId;
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

export const memberType = {
	generalUser: 1,
	liveHost: 3
};

// 每個字斷第一個字均大寫
export function capitalizeFirstLetter(string = "") {
	const words = string?.toLowerCase().split(" ");

	return words
		.map(word => {
			return word.charAt(0).toUpperCase() + word.slice(1);
		})
		.join(" ");
}

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
