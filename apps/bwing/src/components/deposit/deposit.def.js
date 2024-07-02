export const defPayType = {
	onlineBank: "onlineBank",
	localBank: "localBank",
	mobilePay: "mobilePay",
	loadCardPay: "loadCardPay",
	cryptoPay: "cryptoPay",
	qrPay: "qrPay",
	quickTransfer: "quickTransfer"
};

export const defPayment = {
	[defPayType.localBank]: {
		displayKey: "lbl_WireTransfers",
		creditTimeKey: "lbl_5mins",
		icon: "icon icon-library"
	},
	[defPayType.quickTransfer]: {
		displayKey: "lbl_DepositType9",
		creditTimeKey: "lbl_Instant",
		icon: "icon-quick"
	},
	[defPayType.qrPay]: {
		displayKey: "lbl_QRPay",
		creditTimeKey: "lbl_Instant",
		icon: "icon icon-qrcode"
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
	},
	[defPayType.loadCardPay]: {
		displayKey: "lbl_TopUpCard",
		creditTimeKey: "lbl_Instant",
		icon: "icon icon-topupCard"
	}
};
