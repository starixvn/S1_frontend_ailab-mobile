export type ICupEventBasicData = {
	countryName: string;
	imageName: string;
	sort: number;
};

export type ICupEventBasicOptionData = {
	countryId: number;
	countryName: string;
	imageName: string;
};

export interface ICupEventPredictionSettingData {
	top24Team: ICupEventBasicData[];
	roundOf16: ICupEventBasicData[];
	quarterFinals: ICupEventBasicData[];
	semiFinals: ICupEventBasicData[];
	"3rdPlace": ICupEventBasicData[];
	final: ICupEventBasicData[];
	matchTimes: { matchName: string; matchTime: string }[];
	selectOptions: {
		groupA: ICupEventBasicOptionData[];
		groupB: ICupEventBasicOptionData[];
		groupC: ICupEventBasicOptionData[];
		groupD: ICupEventBasicOptionData[];
		groupE: ICupEventBasicOptionData[];
		groupF: ICupEventBasicOptionData[];
	};
}

export interface ICupEventTicketData {
	userName: string;
	promotionMission: {
		missionName: string;
		missionNo: number;
		depositFlag: boolean;
		depositAmount: number;
		turnoverFlag: boolean;
		turnoverAmount: number;
		tpCategoryId: number;
		affFlag: boolean;
		affCount: number;
		ticketCount: number;
		isCompleted: boolean;
	}[];
	cupEventPromotionMissionProgress: {
		depositAmount: number;
		turnoverSum: number;
		affList: null;
		completedBetCount: number;
	};
	availableTickets: number;
	usedTickets: number;
	unUsedTickets: number;
	userTicketResult: {
		ticketList: {
			countryId: number;
			count: number;
		}[];
		groupCountryTicket: {
			countryId: number;
			count: number;
		}[];
	};
	selectOptions: {
		groupA: ICupEventBasicOptionData[];
		groupB: ICupEventBasicOptionData[];
		groupC: ICupEventBasicOptionData[];
		groupD: ICupEventBasicOptionData[];
		groupE: ICupEventBasicOptionData[];
		groupF: ICupEventBasicOptionData[];
	};
	errorCode: number;
}

export interface IMemberDepositData {
	transId: string;
	depositAmount: number;
	statementTime: string;
}

export interface ICupEventTicketSummaryData {
	countryId: number;
	countryName: string;
	imageName: string;
	percentage: number;
}

export interface IPollTicketsArgs {
	UserPollTicket: {
		TicketType: number;
		CountryId: number;
	};
	count: number;
}

export interface IPredictScoreTeamData {
	team: string;
	teamDetail: {
		countryName: string;
		imageName: string;
		sort: number;
	};
	score: number;
}

export interface ICupEventPredictScoreData {
	data: IPredictScoreTeamData[];
	isPredict: boolean;
}

export interface IPredictCupEventScoreArgs {
	HomeTeamScore: number;
	AwayTeamScore: number;
}
