export const initValue = {
	UserName: "",
	Password: "",
	Phone: "",
	Currency: 0,
	AffiliateId: "",
	SpecialBonusCode: ""
};

export const initWarning = {
	UserName: {
		status: false,
		msg: ""
	},
	Password: {
		status: false,
		msg: ""
	},
	Currency: {
		status: false
	},
	AffiliateId: {
		status: false,
		msg: ""
	},
	Checkbox: {
		status: false,
		msg: ""
	},
	Phone: {
		status: false,
		msg: ""
	},
	SpecialBonusCode: {
		checked: null,
		msg: ""
	}
};

export const initCheckboxVal = {
	termsCheck: false,
	ageCheck: false
};

export const initChecklistState = {
	UserName: false,
	Password: false
};

export const currencyToAreacode = {
	2: "MY",
	4: "TH",
	13: "CS",
	15: "ID",
	51: "VN"
};
