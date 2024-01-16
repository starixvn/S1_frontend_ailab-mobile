export const defPromoStatus = {
	running: 1,
	Canceled: 2,
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
	static: 8,
	retentionFreeBet: 9
};

export const defFilterType = {
	all: "all",
	expiry: "expiry",
	firstDeposit: "firstDeposit",
	other: "other",
	sportsbook: "sportsbook",
	liveCasino: "liveCasino",
	slots: "slots",
	specialBonus: "specialBonus"
};

export const defNav = {
	All: {
		displayKey: "lbl_Promotion_All",
		value: defFilterType.all
	},
	FirstDeposit: {
		displayKey: "lbl_NewMember",
		value: defFilterType.firstDeposit
	},
	Other: {
		displayKey: "lbl_Special",
		value: defFilterType.other
	},
	Sportsbook: {
		displayKey: "lbl_Sportsbook",
		value: defFilterType.sportsbook
	},
	LiveCasino: {
		displayKey: "lbl_Promotion_Casino",
		value: defFilterType.liveCasino
	},
	Slots: {
		displayKey: "lbl_Promotion_Slot",
		value: defFilterType.slots
	},
	SpecialBonus: {
		displayKey: "lbl_PromoCode",
		value: defFilterType.specialBonus,
		afterLogin: true
	}
};

export const defPromotionNav = [
	defNav.All,
	defNav.FirstDeposit,
	defNav.Other,
	defNav.Sportsbook,
	defNav.LiveCasino,
	defNav.Slots,
	defNav.SpecialBonus
];

export const defTabs = {
	Processing: {
		key: "Processing",
		displayKey: "lbl_Promotion"
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

export const defHideJoinBtnTypes = [
	defPromotionType.rebate,
	defPromotionType.static
];

export const defWalletType = {
	Transfer: 0,
	Seamless: 1
};

export const defCategoryId = {
	BonusWallet: 0,
	Slots: 1,
	LiveCasino: 2,
	Fish: 3,
	SabaSports: 4,
	Lottery: 5,
	Sports: 6,
	PtSlots: 7,
	PtLiveCasino: 8,
	SBSW: 9,
	// 沒有 Mega888SlotRNGFishing
	ESports: 11
};
