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

export interface IDepositChatTransferInfo {
	groupId: number;
	groupName: string;
	minAmount: number;
	maxAmount: number;
	supportChannels: {
		payId: number;
		payName: string;
		groupId: number;
		groupName: string;
		channelId: number;
		channelName: string;
		mode: number;
		minAmount: number;
		maxAmount: number;
		amountRule: number;
		amountList: null | number[];
		depositType: number;
	}[];
}
