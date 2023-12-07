interface IDepositQuickTransferBankInfo {
	sysId: number;
	bankName: string;
	bankCode: string;
	bankLogo: string;
	minAmount: number;
	maxAmount: number;
}

export interface IDepositQuickTransferInfo {
	selectBank: boolean;
	supportBanks: IDepositQuickTransferBankInfo[];
	payId: number;
	payName: string;
	groupId: number;
	groupName: string | null;
	channelId: number;
	channelName: string;
	mode: number;
	minAmount: number;
	maxAmount: number;
	amountRule: number;
	amountList: number[];
	depositType: number;
}
