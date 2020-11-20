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

export const infoList = (i18n, userInfo, _areaCode) => {
	return [
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
			infoTitle: "phoneNo",
			colTitle: i18n["lbl_Phone"],
			content: `(${_areaCode})${userInfo.phoneNo}`,
			isVerified: userInfo.phoneVerified
		},
		{
			infoTitle: "accountName",
			colTitle: i18n["lbl_RealName"],
			content: userInfo.accountName
		},
		{
			infoTitle: "birth",
			colTitle: i18n["lbl_Birthday"],
			content: `${userInfo.birth_y}/${userInfo.birth_m}/${userInfo.birth_d}`,
			birth_d: userInfo.birth_d,
			birth_m: userInfo.birth_m,
			birth_y: userInfo.birth_y
		}
	];
};
