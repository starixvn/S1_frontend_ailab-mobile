export const DepositTypeEnum = {
	OnlineBanking: 1,
	MobilePayment: 2,
	BankTransfer: 3,
	CryptoPay: 4,
	TopUpCard: 5,
	QRPay: 6,
	QuickTransfer: 7,
	CryptoWallet: 8
};

export const AllowUploadReceiptType = [
	DepositTypeEnum.BankTransfer,
	DepositTypeEnum.OnlineBanking,
	DepositTypeEnum.QuickTransfer,
	DepositTypeEnum.CryptoPay,
	DepositTypeEnum.MobilePayment
];
