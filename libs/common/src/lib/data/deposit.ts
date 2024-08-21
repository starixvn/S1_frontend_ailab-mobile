export const DepositTypeEnum = {
	OnlineBanking: 1,
	MobilePayment: 2,
	BankTransfer: 3,
	CryptoPay: 4,
	TopUpCard: 5,
	QRPay: 6,
	BankAutoChannel: 7,
	CryptoWallet: 8,
	QuickTransfer: 9,
	ChatTransfer: 10
};
export const AllowUploadReceiptType = [
	DepositTypeEnum.BankTransfer,
	DepositTypeEnum.OnlineBanking,
	DepositTypeEnum.QuickTransfer,
	DepositTypeEnum.CryptoPay,
	DepositTypeEnum.CryptoWallet,
	DepositTypeEnum.MobilePayment,
	DepositTypeEnum.ChatTransfer,
	DepositTypeEnum.TopUpCard,
	DepositTypeEnum.BankAutoChannel,
	DepositTypeEnum.QRPay
];

export const WithReceiptInfoType = [DepositTypeEnum.BankTransfer];
