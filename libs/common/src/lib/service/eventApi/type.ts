export interface IGetLeaderboardSettingArgs {
	siteId: number;
	currencyId: number;
}

export type ILeaderboardCalculationData = {
	data: string;
	siteId: number;
	currencyId: number;
	sportTurnover: number;
	slotTurnover: number;
	liveCasinoTurnover: number;
};

export type ILeaderboardRankingData = {
	siteId: number;
	siteName: string;
	currency: string;
	currencyId: number;
	ranking: string;
	minPoint: number;
	bonus: number;
};
export interface ILeaderboardSettingData {
	leaderboardPointCalculation: ILeaderboardCalculationData;
	leaderboardRankingBonus: ILeaderboardRankingData[];
}
