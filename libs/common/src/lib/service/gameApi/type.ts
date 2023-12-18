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

type ILangType = "en" | "cs" | "my" | "th" | "id" | "hi" | "bd" | "kh" | "vn";

interface ISubMenuData {
	lobbyCategory: string;
	tpId: number;
	tpName: string;
	productName: string;
	tpGameIdNo: number;
	gameId: string;
	tpGameType: number;
	currencyGameName: Record<ILangType, string> | null;
	pcHeaderPicUrl: string;
	pcLobbyPicUrl: string;
	mobileHeaderPicUrl: string;
	mobileLobbyPicUrl: string;
	sort: number;
	iconEndTime: string;
	iconStartTime: string;
	iconType: number;
}

export interface ILobbyHeaderData {
	lobbyCategoryId: number;
	data: ISubMenuData[];
}

export interface IRecentlyViewData {
	bannerUrl: string;
	imgUrl: string;
	recentlyViewedList: {
		tpId: number;
		tpGameType: number;
		categoryId: number;
		gameId: string | number;
		betType: string;
		tpName: string;
		gameName: Record<ILangType, string> | null;
		gameLogo: Record<ILangType, string> | null;
		tpLogo: string;
		tpGameIdNo: number;
		isMaintain: boolean;
	}[];
}
