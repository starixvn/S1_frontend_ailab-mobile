export interface IMissionData {
	missionDate: string;
	missionName: string;
	missionNo: number;
	goalAmount: number;
	progressAmount: number;
	eggCount: number;
	isCompleted: boolean;
}

export interface ICheckPromotionMissionData {
	newYearMission2024: IMissionData[];
	eggTicket: number;
}

export interface IGetLeaderBoardListArgs {
	lBCategoryId: number;
	TopNum: number;
	BeforeDays: number;
	EventCode: string;
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

export interface ILeaderboardData {
	leaderboardPointCalculation: ILeaderboardPointCalculation;
	leaderboardRankingBonus: ILeaderboardRankingBonus[];
}

export interface IGetCustBlessingsStickerData {
	isClaimedBigPrize: boolean;
	stickers: number;
}

export interface IGetCustRankArgs {
	LBCategoryId: number;
	BeforeDays: number;
	EventCode: string;
}

export interface IGetLeaderBoardData {
	custId: number;
	userName: string;
	wTurnover: number;
	status: number;
}

export interface IGetCustDrawPrizeListData {
	amount: number;
	prizeId: number;
	drawTime: string;
	eventDate: string;
	prizeName: string;
}

export interface IDrawPrizeData {
	jackpot: number;
	prizeId: number;
	prizeName: null | string;
	ticketCount: number;
	drawPrizeType: number;
}

export interface ILeaderBoardMonthData {
	custId: number;
	status: number;
	userName: string;
	wTurnover: number;
}

export interface IGetLeaderBoardListMonthArgs {
	lBCategoryId: number;
	TopNum: number;
	SelectDays: string;
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
