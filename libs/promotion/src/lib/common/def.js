export const defPromoStatus = {
	running: 1,
	Canceled: 2,
	Expiry: 3,
	Fulfill: 4,
	TransferOut: 5
};

export const defPromotionType = {
	firstDeposit: 1,
	reDeposit: 2,
	freeBet: 3,
	walletBonus: 5,
	rebate: 6,
	cashback: 7,
	static: 8
};

export const defFilterType = {
	all: 0,
	firstDeposit: defPromotionType.firstDeposit,
	freeBet: defPromotionType.freeBet,
	specialBonus: 9991,
	reDeposit: defPromotionType.reDeposit,
	rebateAndCashBack: "6_7",
	static: defPromotionType.static
};

export const defNav = {
	All: {
		displayKey: "lbl_All",
		value: defFilterType.all
	},
	FirstDeposit: {
		displayKey: "lbl_PromotionCategory1",
		value: defFilterType.firstDeposit
	},
	FreeBet: {
		displayKey: "lbl_FreeBet",
		value: defFilterType.freeBet
	},
	SpecialBonus: {
		displayKey: "lbl_SpecialBonus",
		value: defFilterType.specialBonus,
		afterLogin: true
	},
	ReDeposit: {
		displayKey: "lbl_Redeposit_Promo",
		value: defFilterType.reDeposit
	},
	RebateAndCashBack: {
		displayKey: "lbl_PromotionRebateAndCashback",
		value: defFilterType.rebateAndCashBack
	},
	Static: {
		displayKey: "lbl_Other",
		value: defFilterType.static
	}
};

export const defPromotionNav = [
	defNav.All,
	defNav.FirstDeposit,
	defNav.FreeBet,
	defNav.SpecialBonus
];

export const defTabs = {
	Processing: {
		key: "Processing",
		displayKey: "lbl_Processing"
	},
	Expired: {
		key: "Expired",
		displayKey: "lbl_Expired"
	}
};

export const defBonusType = {
	Percentage: 1,
	Amount: 2
};

export const defRuleCols = {
	minAmount: "minAmount",
	rollOver: "rollOver",
	remainingTime: "remainingTime",
	bonus: "bonus",
	maxBonus: "maxBonus"
};

export const defWrapperCol = {
	formatSetting: {
		isConvertRequired: "isConvertRequired",
		formatRequired: "formatRequired",
		digits: "digits"
	}
};

export const defUrlParamCols = {
	tab: "tab",
	filterType: "filterType"
};
