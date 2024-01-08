import moment from "moment";

export const monthOptions = [
	{ value: 1, id: 0, displayKey: "lbl_Month1" },
	{ value: 2, id: 1, displayKey: "lbl_Month2" },
	{ value: 3, id: 2, displayKey: "lbl_Month3" },
	{ value: 4, id: 3, displayKey: "lbl_Month4" },
	{ value: 5, id: 4, displayKey: "lbl_Month5" },
	{ value: 6, id: 5, displayKey: "lbl_Month6" },
	{ value: 7, id: 6, displayKey: "lbl_Month7" },
	{ value: 8, id: 7, displayKey: "lbl_Month8" },
	{ value: 9, id: 8, displayKey: "lbl_Month9" },
	{ value: 10, id: 9, displayKey: "lbl_Month10" },
	{ value: 11, id: 10, displayKey: "lbl_Month11" },
	{ value: 12, id: 11, displayKey: "lbl_Month12" }
];

export const initValue = {
	accountName: "",
	phoneNo: "",
	email: "",
	addressLineFirst: "",
	addressLineSecond: "",
	addressCity: "",
	addressPostCode: "",
	addressState: "",
	addressCountry: ""
};

export const initWarning = {
	accountName: {
		checked: null,
		msg: ""
	},
	birth: {
		checked: null,
		msg: ""
	},
	phoneNo: {
		checked: null,
		msg: ""
	},
	email: {
		checked: null,
		msg: ""
	},
	addressLineFirst: {
		checked: null,
		msg: "",
		type: "addr"
	},
	addressLineSecond: {
		checked: null,
		msg: "",
		type: "addr"
	},
	addressCity: {
		checked: null,
		msg: "",
		type: "addr"
	},
	addressPostCode: {
		checked: null,
		msg: "",
		type: "addr"
	},
	addressState: {
		checked: null,
		msg: "",
		type: "addr"
	},
	addressCountry: {
		checked: null,
		msg: "",
		type: "addr"
	}
};

export const infoList = ({ i18n = {}, userInfo = {} }) => {
	return [
		{
			infoTitle: "phoneNo",
			colTitle: i18n.lbl_Phone,
			content: `(${userInfo.areaCode})${userInfo.phoneNo}`,
			isVerified: userInfo.phoneVerified
		},
		{
			infoTitle: "email",
			colTitle: i18n.lbl_Email,
			content: userInfo.email,
			isVerified: userInfo.emailVerified
		},
		{
			infoTitle: "accountName",
			colTitle: i18n.lbl_RealName,
			content: userInfo.accountName
		},
		{
			infoTitle: "birth",
			colTitle: i18n.lbl_Birthday,
			content: birthFormat({
				day: userInfo?.birth_d,
				month: userInfo?.birth_m,
				year: userInfo?.birth_y
			}),
			birth_d: userInfo.birth_d,
			birth_m: userInfo.birth_m,
			birth_y: userInfo.birth_y
		},
		{
			infoTitle: "userName",
			colTitle: i18n.lbl_Username,
			content: userInfo.userName
		},
		{
			infoTitle:
				userInfo.country && userInfo.country !== "null"
					? "country"
					: "perCountry",
			colTitle: i18n.lbl_Country,
			content:
				userInfo.country && userInfo.country !== "null"
					? userInfo.country
					: userInfo.perCountry
		},
		{
			infoTitle: "regTime",
			colTitle: i18n.lbl_RegisterTime,
			content: date_format(userInfo.regTime)
		},
		{
			infoTitle: "lastLogin",
			colTitle: i18n.lbl_LastLogin,
			content: date_format(userInfo.lastLogin)
		},
		{
			infoTitle: "addressLineFirst",
			colTitle: i18n.lbl_Line_1,
			content: userInfo?.addressLineFirst,
			infoHint: i18n.msg_EnterAddress,
			type: "addr"
		},
		{
			infoTitle: "addressLineSecond",
			colTitle: i18n.lbl_Line_2,
			content: userInfo?.addressLineSecond,
			infoHint: i18n.msg_EnterAddress,
			type: "addr"
		},
		{
			infoTitle: "addressCity",
			colTitle: i18n.lbl_City,
			content: userInfo?.addressCity,
			infoHint: i18n.msg_EnterCity,
			type: "addr"
		},
		{
			infoTitle: "addressPostCode",
			colTitle: i18n.lbl_PostCode,
			content: userInfo?.addressPostCode,
			infoHint: i18n.msg_EnterPostCode,
			type: "addr"
		},
		{
			infoTitle: "addressState",
			colTitle: i18n.lbl_State,
			content: userInfo?.addressState,
			infoHint: i18n.msg_EnterState,
			type: "addr"
		},
		{
			infoTitle: "addressCountry",
			colTitle: i18n.lbl_Country,
			content: userInfo?.addressCountry,
			infoHint: i18n.msg_EnterCountry,
			type: "addr"
		}
	];
};

export const currencyToAreacode = {
	2: "MY",
	4: "TH",
	13: "CS",
	15: "ID",
	51: "VN"
};

export const otpCol = {
	phone: "phoneNo",
	email: "email"
};

const date_format = v => {
	return moment(new Date(v)).format("lll");
};

const birthFormat = ({ day, month, year }) => {
	const zeroPad = (num, places) => String(num).padStart(places, "0");
	return `${zeroPad(day, 2)}/${zeroPad(month, 2)}/${year}`;
};
