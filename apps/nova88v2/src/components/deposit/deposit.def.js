export const defPayType = {
	autoDeposit: "autoDeposit",
	localBank: "localBank",
	onlineBank: "onlineBank",
	mobilePay: "mobilePay",
	cryptoPay: "cryptoPay",
	linePay: "linePay",
	topUpCard: "topUpCard",
	qrPay: "qrPay",
	quickTransfer: "quickTransfer"
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
	[defPayType.topUpCard]: {
		displayKey: "lbl_TopUpCard",
		creditTimeKey: "lbl_Instant",
		icon: "icon icon-topup"
	},
	[defPayType.cryptoPay]: {
		displayKey: "lbl_CryptoPay",
		creditTimeKey: "lbl_Instant",
		icon: "icon icon-USDT"
	},
	[defPayType.qrPay]: {
		displayKey: "lbl_QRPay",
		creditTimeKey: "lbl_Instant",
		icon: "icon icon-qrpay"
	},
	[defPayType.quickTransfer]: {
		displayKey: "lbl_DepositType9",
		creditTimeKey: "lbl_Instant",
		icon: "icon-quick"
	}
};
