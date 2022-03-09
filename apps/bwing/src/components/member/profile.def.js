export const initUserValue = userInfo => {
	return {
		AccountName: userInfo.accountName ?? "",
		Birthday:
			userInfo.Birth_y && userInfo.Birth_m && userInfo.Birth_d
				? `${userInfo.Birth_y}/${userInfo.Birth_m}/${userInfo.Birth_d}`
				: "",
		PhoneNo: userInfo.phoneNo ?? "",
		Email: userInfo.email ?? ""
	};
};

export const initStatus = {
	AccountName: {
		checked: null,
		msg: ""
	},
	Birthday: {
		checked: null,
		msg: ""
	},
	PhoneNo: {
		checked: null,
		msg: ""
	},
	Email: {
		checked: null,
		msg: ""
	}
};

export const infoList = (i18n, userInfo, _areaCode) => {
	return [
		{
			infoTitle: "userName",
			colTitle: i18n.lbl_Username,
			content: userInfo.userName
		},
		{
			infoTitle: "country",
			colTitle: i18n.lbl_Country,
			content: i18n[`lbl_Country${userInfo.country}`]
		},
		{
			infoTitle: "email",
			colTitle: i18n.lbl_Email,
			content: userInfo.email,
			isVerified: userInfo.emailVerified
		},
		{
			infoTitle: "phoneNo",
			colTitle: i18n.lbl_Phone,
			content: `(${_areaCode})${userInfo.phoneNo}`,
			isVerified: userInfo.phoneVerified
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
		}
	];
};

export const otpCol = {
	phone: "phoneNo",
	email: "email"
};

const birthFormat = ({ day, month, year }) => {
	const zeroPad = (num, places) => String(num).padStart(places, "0");
	return `${zeroPad(day, 2)}/${zeroPad(month, 2)}/${year}`;
};
