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
	cashback: 7
};

export const defFilterType = {
	all: 0,
	firstDeposit: 1,
	freeBet: 3
};

export const defPromotionNav = [
	{
		displayKey: "lbl_All",
		value: defFilterType.all
	},
	{
		displayKey: "lbl_PromotionCategory1",
		value: defFilterType.firstDeposit
	},
	{
		displayKey: "lbl_FreeBet",
		value: defFilterType.freeBet
	}
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
