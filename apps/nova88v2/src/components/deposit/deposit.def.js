export const defPayType = {
	autoDeposit: "autoDeposit",
	localBank: "localBank",
	onlineBank: "onlineBank",
	mobilePay: "mobilePay",
	cryptoPay: "cryptoPay",
	linePay: "linePay"
};

export const defPayment = {
	[defPayType.autoDeposit]: {
		displayKey: "lbl_AutoDeposit",
		creditTimeKey: "lbl_Instant",
		icon: "icon icon-library"
	},
	[defPayType.localBank]: {
		displayKey: "lbl_WireTransfers",
		creditTimeKey: "lbl_5mins",
		icon: "icon icon-library"
	},
	[defPayType.linePay]: {
		displayKey: "lbl_Line",
		creditTimeKey: "lbl_Instant",
		icon: "icon icon-line"
	},
	[defPayType.onlineBank]: {
		displayKey: "lbl_OnlineBanking",
		creditTimeKey: "lbl_Instant",
		icon: "icon icon-connection"
	},
	[defPayType.mobilePay]: {
		displayKey: "lbl_MobileDeposit",
		creditTimeKey: "lbl_Instant",
		icon: "icon icon-mobile"
	},
	[defPayType.cryptoPay]: {
		displayKey: "lbl_CryptoPay",
		creditTimeKey: "lbl_Instant",
		icon: "icon icon-USDT"
	}
};
