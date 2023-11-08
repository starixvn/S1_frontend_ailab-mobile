export enum SlotGameCategoryEnum {
	Jackpot = 2
}

export interface ISlotGamePageData {
	imgUrl: string;
	jackpot: {
		slotGameId: string;
		tpId: number;
		gameId: string;
		appId: string;
		launchDate: string;
		reels: string;
		rtp: string;
		paylines: string;
		playFree: false;
		gameName: {
			cs: string;
			en: string;
		};
		slotGameCategoryList: number[];
		imgName: {
			cs: string;
			en: string;
		};
		sort: number;
		top: number;
	}[];
	providerList: {
		tpId: number;
		tpName: string;
		playFree: boolean;
		displayText: string;
		imgName: string;
		openPath: null | string;
		gameImgDisplayText: string;
		sort: number;
	}[];
}

export interface IGetSlotGamePageDataArgs {
	currencyId: number;
	deviceType: number;
	slotGameCategoryList: SlotGameCategoryEnum[];
}
