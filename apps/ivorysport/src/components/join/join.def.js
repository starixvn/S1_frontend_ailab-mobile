export const OCCUPATION_OPTIONS = [
	{ id: 0, displayKey: "lbl_SelfEmployed", value: 1 },
	{ id: 1, displayKey: "lbl_Employed", value: 2 },
	{ id: 2, displayKey: "lbl_Retired", value: 3 },
	{ id: 3, displayKey: "lbl_Others", value: 4 }
];

export const SOURCE_OF_INCOME_OPTIONS = [
	{ id: 0, displayKey: "lbl_OwnSaving", value: 1 },
	{ id: 1, displayKey: "lbl_Loan", value: 2 },
	{ id: 2, displayKey: "lbl_Others", value: 3 }
];

export const initValue = {
	UserName: "",
	Password: "",
	Email: "",
	CurrencyIdx: null,
	AffiliateId: "",
	Checkbox: true,
	SpecialBonusCode: "",
	Phone: "",
	RealName: "",
	Birth_d: 0,
	Birth_m: 0,
	Birth_y: 0,
	occupation: {
		index: 0, // * 初始 0
		value: OCCUPATION_OPTIONS[0].value
	},
	sourceOfIncome: {
		index: 0, // * 初始 0
		value: SOURCE_OF_INCOME_OPTIONS[0].value
	},
	nationality: "",
	country: "",
	city: "",
	postCode: "",
	lineFirst: ""
};

export const initStatus = {
	UserName: {
		checked: null,
		msg: ""
	},
	Password: {
		checked: null,
		msg: ""
	},
	Email: {
		checked: null,
		msg: ""
	},
	Currency: {
		checked: null,
		msg: ""
	},
	AffiliateId: {
		checked: null,
		msg: ""
	},
	Phone: {
		checked: null,
		msg: ""
	},
	Checkbox: {
		checked: null,
		msg: ""
	},
	SpecialBonusCode: {
		checked: null,
		msg: ""
	},
	RealName: {
		checked: null,
		msg: ""
	},
	Birth: {
		checked: null,
		msg: ""
	},
	nationality: {
		checked: null,
		msg: "" // * 僅提供紅匡input警示
	},
	country: {
		checked: null,
		msg: "" // * 僅提供紅匡input警示
	},
	city: {
		checked: null,
		msg: "" // * 僅提供紅匡input警示
	}
};

export const currencyToAreacode = {
	2: "MY",
	3: "GB",
	4: "TH",
	13: "CS",
	15: "ID",
	51: "VN",
	61: "IN",
	72: "KH",
	74: "BD",
	96: "MY"
};

export const reCaptchaEnum = {
	en: "en",
	cs: "zh-CN",
	hi: "hi",
	id: "id",
	my: "ms",
	th: "th",
	bd: "bn",
	kh: "en",
	vn: "vi"
};

export const countryEnum = {
	MY: "2.0",
	TH: "2.0",
	ID: "2.0",
	IN: "1.8",
	BD: "1.8",
	CS: "1.8",
	GB: "1.8",
	KH: "1.8"
};

export const limitCountryNum = {
	"+60": "9-10",
	"+66": "9",
	"+62": "10-13",
	"+91": "10",
	"+86": "10-11",
	"+880": "10",
	"+855": "8-9"
};
