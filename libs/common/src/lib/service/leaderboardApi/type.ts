export interface IGetLeaderBoardListMonthArgs {
	lBCategoryId: number;
	TopNum: number;
	SelectDays: string;
	EventCode: string;
}

export interface ILeaderBoardMonthData {
	custId: number;
	status: number;
	userName: string;
	wTurnover: number;
}
export interface ILeaderboardPointCalculation {
	date: string;
	siteId: number;
	currencyId: number;
	sportTurnover: number;
	slotTurnover: number;
	liveCasinoTurnover: number;
}

export interface ILeaderboardRankingBonus {
	siteId: number;
	siteName: string;
	currency: string;
	currencyId: number;
	ranking: string;
	minPoint: number;
	bonus: number;
}

/** 積分頁面 request interface */
export interface ILeaderboardData {
	leaderboardPointCalculation: ILeaderboardPointCalculation;
	leaderboardRankingBonus: ILeaderboardRankingBonus[];
}

export interface IGetLeaderBoardListArgs {
	lBCategoryId: number;
	TopNum: number;
	BeforeDays: number;
	EventCode: string;
}

export interface IGetLeaderBoardData {
	custId: number;
	userName: string;
	wTurnover: number;
	status: number;
}

export interface IGetCustRankArgs {
	LBCategoryId: number;
	BeforeDays: number;
	EventCode: string;
}

export interface ICustRankData {
	custRank: number;
	point: number;
	status: number;
}

export interface IGetCustRankMonthArgs {
	LBCategoryId: number;
	SelectDays: string;
	EventCode: string;
}

export type ICustRankMonthData = ICustRankData;

export interface IDisplayDrawPrizeData {
	eventId: number;
	index: number;
	prizeId: number;
	prizeIndex: number;
	prizeName: string;
}

// * 幸運輪盤抽獎紀錄
export interface ICustDrawPrizeData {
	amount: number;
	drawTime: string;
	eventDate: string;
	prizeId: number;
	prizeName: string;
}

export interface ICheckDrawPrizeData {
	jackpot: number;
	prizeId: number;
	prizeName: null | string;
	ticketCount: number;
}
