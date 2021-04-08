import api from "../../service/api/events";

export const defElemType = {
	Event: "Event",
	Ranking: "Ranking",
	Record: "Record",
	LastEvent: "LastEvent",
	Final: "Final",
	Tournament: "Tournament",
	Rewards: "Rewards",
	EuroDate1: "EuroDate1",
	EuroDate2: "EuroDate2",
	EuroDate3: "EuroDate3",
	EuroDate4: "EuroDate4",
	FinalTournament: "FinalTournament",
	MonthlyTournament: "MonthlyTournament"
};

export const deflBCategoryId = {
	sport: 1,
	casino: 2,
	liveCasino: 3
};

export const defBtnsOfCategory = {
	Sports: {
		displayKey: "lbl_Sports",
		value: "Sports",
		elemType: defElemType.Ranking,
		lBCategoryId: deflBCategoryId.sport,
		titleKey: "lbl_Ranking_Sports"
	},
	LiveCasino: {
		displayKey: "lbl_LiveCasino",
		value: "LiveCasino",
		elemType: defElemType.Ranking,
		lBCategoryId: deflBCategoryId.liveCasino,
		titleKey: "lbl_Ranking_LiveCasino"
	},
	Slots: {
		displayKey: "lbl_Slots",
		value: "Slots",
		elemType: defElemType.Ranking,
		lBCategoryId: deflBCategoryId.casino,
		titleKey: "lbl_Ranking_Slots"
	}
};

export const defBtns = {
	Event: {
		displayKey: "lbl_Event",
		value: "Event",
		elemType: defElemType.Event,
		beforeLogin: true
	},
	...defBtnsOfCategory,
	Records: {
		displayKey: "lbl_Records",
		value: "Records",
		elemType: defElemType.Record
	},
	LastEvent: {
		displayKey: "lbl_Last_Event",
		value: "LastEvent",
		elemType: defElemType.LastEvent
	}
};

export const defEuroBtns = {
	Event: {
		displayKey: "lbl_Event",
		value: "Event",
		elemType: defElemType.Event,
		beforeLogin: true
	},
	Final: {
		displayKey: "lbl_Final",
		value: "Final",
		elemType: defElemType.Final
	},
	Tournament: {
		displayKey: "lbl_TournamentPoints",
		value: "Tournament",
		elemType: defElemType.Tournament
	},
	Records: {
		displayKey: "lbl_Records",
		value: "Records",
		elemType: defElemType.Record
	}
};

export const defEuroDateBtns = {
	2021022: {
		displayKey: "lbl_EuroDate2",
		value: "2021022",
		elemType: defElemType.EuroDate2
	},
	2021023: {
		displayKey: "lbl_EuroDate3",
		value: "2021023",
		elemType: defElemType.EuroDate3
	},
	2021024: {
		displayKey: "lbl_Final",
		value: "2021024",
		elemType: defElemType.EuroDate4
	}
};

export const defEuroTourBtns = {
	FinalTournament: {
		displayKey: "lbl_Final",
		value: "FinalTournament",
		elemType: defElemType.FinalTournament
	},
	MonthlyTournament: {
		displayKey: "lbl_MonthlyTournament",
		value: "MonthlyTournament",
		elemType: defElemType.MonthlyTournament
	}
};

export const defDayBtns = {
	Yesterday: {
		displayKey: "lbl_YesterDay",
		value: 1
	},
	Last2Day: {
		displayKey: "lbl_last_2_day",
		value: 2
	},
	Last3Day: {
		displayKey: "lbl_last_3_day",
		value: 3
	}
};

export const defPrize = () => ({
	VND: {
		vn: {
			[defEuroTourBtns.FinalTournament.value]: [
				{
					rank: "VÔ ĐỊCH",
					prize: "VND 118,888,000"
				},
				{
					rank: "Giải Nhất",
					prize: `VND 78,888,000 `
				},
				{
					rank: "Giải Nhì",
					prize: `VND 38,888,000 `
				},
				{ rank: "Giải Ba", prize: `VND 28,888,000` },
				{ rank: "Giải Bốn", prize: `VND 23,888,000` },
				{ rank: "Giải Năm", prize: `VND 19,888,000` },
				{ rank: "Giải Sáu", prize: `VND 15,888,000` },
				{ rank: "Giải Bảy", prize: `VND 11,888,000` },
				{ rank: "Giải Tám", prize: `VND 9,888,000` },
				{ rank: "Giải Tám" }
			],
			[defEuroTourBtns.MonthlyTournament.value]: [
				{
					rank: "Vô địch",
					prize: "38,888,000"
				},
				{ rank: "Giải Nhất", prize: `28,888,000` },
				{ rank: "Giải Nhì", prize: `18,888,000` }
			]
		},
		en: {
			[defEuroTourBtns.FinalTournament.value]: [
				{
					rank: "CHAMPION",
					prize: "VND 118,888,000"
				},
				{
					rank: "1st Runner Up",
					prize: `VND 78,888,000 `
				},
				{
					rank: "2nd Runner Up",
					prize: `VND 38,888,000 `
				},
				{ rank: "3rd Runner Up", prize: `VND 28,888,000` },
				{ rank: "4th Runner Up", prize: `VND 23,888,000` },
				{ rank: "5th Runner Up", prize: `VND 19,888,000` },
				{ rank: "6th Runner Up", prize: `VND 15,888,000` },
				{ rank: "7th Runner Up", prize: `VND 11,888,000` },
				{ rank: "8th Runner Up", prize: `VND 9,888,000` },
				{ rank: "9th Runner Up" }
			],
			[defEuroTourBtns.MonthlyTournament.value]: [
				{
					rank: "CHAMPION",
					prize: "VND 38,888,000"
				},
				{ rank: "1st Runner Up", prize: `VND 28,888,000` },
				{ rank: "2nd Runner Up", prize: `VND 18,888,000` }
			]
		}
	}
});
