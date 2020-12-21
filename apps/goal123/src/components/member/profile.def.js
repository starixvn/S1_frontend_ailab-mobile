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

export const initUserValue = userInfo => {
	return {
		AccountName: userInfo.accountName ?? "",
		Birth_d: userInfo.Birth_d ?? "",
		Birth_m: userInfo.Birth_m ?? "",
		Birth_y: userInfo.Birth_y ?? "",
		PhoneNo: userInfo.phoneNo ?? "",
		Email: userInfo.email ?? ""
	};
};

export const initWarning = {
	AccountName: {
		status: false,
		msg: ""
	},
	Birthday: {
		status: false,
		msg: ""
	},
	PhoneNo: {
		status: false,
		msg: ""
	},
	Email: {
		status: false,
		msg: ""
	}
};

export const infoList = ({ i18n, userInfo, _areaCode }) => {
	return [
		{
			infoTitle: "accountName",
			colTitle: i18n["lbl_RealName"],
			content: userInfo.accountName
		},
		{
			infoTitle: "birth",
			colTitle: i18n["lbl_Birthday"],
			content: `${userInfo.birth_m}/${userInfo.birth_d}/${userInfo.birth_y}`,
			birth_d: userInfo.birth_d,
			birth_m: userInfo.birth_m,
			birth_y: userInfo.birth_y
		},
		{
			infoTitle: "phoneNo",
			colTitle: i18n["lbl_Phone"],
			content: `(${_areaCode})${userInfo.phoneNo}`,
			isVerified: userInfo.phoneVerified
		},
		{
			infoTitle: "userName",
			colTitle: i18n["lbl_Username"],
			content: userInfo.userName
		},
		{
			infoTitle: "country",
			colTitle: i18n["lbl_Country"],
			content: i18n[`lbl_Country${userInfo.country}`]
		},
		{
			infoTitle: "email",
			colTitle: i18n["lbl_Email"],
			content: userInfo.email
		},
		{
			infoTitle: "regTime",
			colTitle: i18n["lbl_RegisterTime"],
			content: date_format(userInfo.regTime)
		},
		{
			infoTitle: "lastLogin",
			colTitle: i18n["lbl_LastLogin"],
			content: date_format(userInfo.lastLogin)
		}
	];
};

const date_format = v => {
	return moment(new Date(v)).format("lll");
};
