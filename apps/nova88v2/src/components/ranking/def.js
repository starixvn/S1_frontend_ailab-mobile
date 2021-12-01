import api from "../../service/api";
import { defCurrenyId } from "../common/common";

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
	MonthlyTournament: "MonthlyTournament",
	Result: "Result",
	GamesPoint: "GamesPoint"
};

export const defBtnsOfCategory = {
	Sports: {
		displayKey: "lbl_Sports",
		value: "Sports",
		elemType: defElemType.Ranking,
		lBCategoryId: api.events.deflBCategoryId.sport,
		titleKey: "lbl_Ranking_Sports"
	},
	LiveCasino: {
		displayKey: "lbl_LiveCasino",
		value: "LiveCasino",
		elemType: defElemType.Ranking,
		lBCategoryId: api.events.deflBCategoryId.liveCasino,
		titleKey: "lbl_Ranking_LiveCasino"
	},
	Slots: {
		displayKey: "lbl_Slots",
		value: "Slots",
		elemType: defElemType.Ranking,
		lBCategoryId: api.events.deflBCategoryId.casino,
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
	// ...defBtnsOfCategory,
	// Records: {
	// 	displayKey: "lbl_Records",
	// 	value: "Records",
	// 	elemType: defElemType.Record
	// },

	Ranking: {
		displayKey: "lbl_Ranking",
		value: "Ranking",
		elemType: defElemType.Ranking
	},
	GamesPoint: {
		displayKey: "lbl_GamesPoint",
		value: "GamesPoint",
		elemType: defElemType.GamesPoint
	},
	Result: {
		displayKey: "lbl_Result",
		value: "Result",
		elemType: defElemType.Result
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
	2021021: {
		displayKey: `lbl_EuroDate1`,
		value: "2021021",
		elemType: defElemType.EuroDate1
	},
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
	Today: {
		displayKey: "lbl_Today",
		value: 0
	},
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

export const getLeaderBoardSupportCurrencyId = () =>
	Object.keys(defPrize()).map(key => defCurrenyId[key]);

export const defPrize = () => ({
	MYR: {
		cs: {
			prizeList: [
				{
					rank: "冠军",
					prizes: ["300,000", "30,000", "10,000"]
				},
				{
					rank: "亚军",
					prizes: ["250,000", "25,000", "8,000"]
				},
				{
					rank: "季军",
					prizes: ["180,000", "18,000", "6,000"]
				},
				{
					rank: "殿军",
					prizes: ["150,000", "15,000", "5,000"]
				},
				{
					rank: "第五名",
					prizes: ["120,000", "12,000", "4,000"]
				},
				{
					rank: "第六名",
					prizes: ["100,000", "10,000", "3,000"]
				},
				{
					rank: "第七名",
					prizes: ["90,000", "9,000", "2,000"]
				},
				{ rank: "第八名", prizes: ["80,000", "8,000", "1,000"] },
				{
					rank: "第九 - 第30名",
					prizes: ["50,000", "5,000", "500"]
				}
			],
			pointCalculation: [
				{
					rank: "体育",
					prizes: ["100", "1"]
				},
				{
					rank: "电子游戏",
					prizes: ["500", "1"]
				},
				{
					rank: "真人娱乐",
					prizes: ["1000", "1"]
				}
			]
		},
		id: {
			prizeList: [
				{
					rank: "PEMENANG",
					prizes: ["300,000", "30,000", "10,000"]
				},
				{
					rank: "JUARA 2",
					prizes: ["250,000", "25,000", "8,000"]
				},
				{
					rank: "JUARA 3",
					prizes: ["180,000", "18,000", "6,000"]
				},
				{
					rank: "JUARA 4",
					prizes: ["150,000", "15,000", "5,000"]
				},
				{
					rank: "JUARA 5",
					prizes: ["120,000", "12,000", "4,000"]
				},
				{
					rank: "JUARA 6",
					prizes: ["100,000", "10,000", "3,000"]
				},
				{
					rank: "JUARA 7",
					prizes: ["90,000", "9,000", "2,000"]
				},
				{
					rank: "JUARA 8",
					prizes: ["80,000", "8,000", "1,000"]
				},
				{
					rank: "JUARA 9 - 30",
					prizes: ["50,000", "5,000", "500"]
				}
			],
			pointCalculation: [
				{
					rank: "SPORTS",
					prizes: ["100", "1"]
				},
				{
					rank: "SLOTS",
					prizes: ["500", "1"]
				},
				{
					rank: "LIVE CASINO",
					prizes: ["1000", "1"]
				}
			]
		},
		en: {
			prizeList: [
				{
					rank: "CHAMPION",
					prizes: ["300,000", "30,000", "10,000"]
				},
				{
					rank: "1st Runner Up",
					prizes: ["250,000", "25,000", "8,000"]
				},
				{
					rank: "2nd Runner Up",
					prizes: ["180,000", "18,000", "6,000"]
				},
				{
					rank: "3rd Runner Up",
					prizes: ["150,000", "15,000", "5,000"]
				},
				{
					rank: "4th Runner Up",
					prizes: ["120,000", "12,000", "4,000"]
				},
				{
					rank: "5th Runner Up",
					prizes: ["100,000", "10,000", "3,000"]
				},
				{
					rank: "6th Runner Up",
					prizes: ["90,000", "9,000", "2,000"]
				},
				{
					rank: "7th Runner Up",
					prizes: ["80,000", "8,000", "1,000"]
				},
				{
					rank: "RANK 9th - 30th",
					prizes: ["50,000", "5,000", "500"]
				}
			],
			pointCalculation: [
				{
					rank: "SPORTS",
					prizes: ["100", "1"]
				},
				{
					rank: "SLOTS",
					prizes: ["500", "1"]
				},
				{
					rank: "LIVE CASINO",
					prizes: ["1000", "1"]
				}
			]
		},
		th: {
			prizeList: [
				{
					rank: "รางวัลชนะเลิศ",
					prizes: ["300,000", "30,000", "10,000"]
				},
				{
					rank: "รองชนะเลิศอันดับ 1",
					prizes: ["250,000", "25,000", "8,000"]
				},
				{
					rank: "รองชนะเลิศอันดับ 2",
					prizes: ["180,000", "18,000", "6,000"]
				},
				{
					rank: "รองชนะเลิศอันดับ 3",
					prizes: ["150,000", "15,000", "5,000"]
				},
				{
					rank: "รองชนะเลิศอันดับ 4",
					prizes: ["120,000", "12,000", "4,000"]
				},
				{
					rank: "รองชนะเลิศอันดับ 5",
					prizes: ["100,000", "10,000", "3,000"]
				},
				{
					rank: "รองชนะเลิศอันดับ 6",
					prizes: ["90,000", "9,000", "2,000"]
				},
				{
					rank: "รองชนะเลิศอันดับ 7",
					prizes: ["80,000", "8,000", "1,000"]
				},
				{
					rank: "อันดับที่ 9 - 30",
					prizes: ["50,000", "5,000", "500"]
				}
			],
			pointCalculation: [
				{
					rank: "กีฬา",
					prizes: ["100", "1"]
				},
				{
					rank: "สล็อต",
					prizes: ["500", "1"]
				},
				{
					rank: "คาสิโนสด",
					prizes: ["1000", "1"]
				}
			]
		},
		th_en: {
			prizeList: [
				{
					rank: "CHAMPION",
					prizes: ["300,000", "30,000", "10,000"]
				},
				{
					rank: "1st Runner Up",
					prizes: ["250,000", "25,000", "8,000"]
				},
				{
					rank: "2nd Runner Up",
					prizes: ["180,000", "18,000", "6,000"]
				},
				{
					rank: "3rd Runner Up",
					prizes: ["150,000", "15,000", "5,000"]
				},
				{
					rank: "4th Runner Up",
					prizes: ["120,000", "12,000", "4,000"]
				},
				{
					rank: "5th Runner Up",
					prizes: ["100,000", "10,000", "3,000"]
				},
				{
					rank: "6th Runner Up",
					prizes: ["90,000", "9,000", "2,000"]
				},
				{
					rank: "7th Runner Up",
					prizes: ["80,000", "8,000", "1,000"]
				},
				{
					rank: "RANK 9th - 30th",
					prizes: ["50,000", "5,000", "500"]
				}
			],
			pointCalculation: [
				{
					rank: "SPORTS",
					prizes: ["100", "1"]
				},
				{
					rank: "SLOTS",
					prizes: ["500", "1"]
				},
				{
					rank: "LIVE CASINO",
					prizes: ["1000", "1"]
				}
			]
		},
		id_en: {
			prizeList: [
				{
					rank: "CHAMPION",
					prizes: ["300,000", "30,000", "10,000"]
				},
				{
					rank: "1st Runner Up",
					prizes: ["250,000", "25,000", "8,000"]
				},
				{
					rank: "2nd Runner Up",
					prizes: ["180,000", "18,000", "6,000"]
				},
				{
					rank: "3rd Runner Up",
					prizes: ["150,000", "15,000", "5,000"]
				},
				{
					rank: "4th Runner Up",
					prizes: ["120,000", "12,000", "4,000"]
				},
				{
					rank: "5th Runner Up",
					prizes: ["100,000", "10,000", "3,000"]
				},
				{
					rank: "6th Runner Up",
					prizes: ["90,000", "9,000", "2,000"]
				},
				{
					rank: "7th Runner Up",
					prizes: ["80,000", "8,000", "1,000"]
				},
				{
					rank: "RANK 9th - 30th",
					prizes: ["50,000", "5,000", "500"]
				}
			],
			pointCalculation: [
				{
					rank: "SPORTS",
					prizes: ["100", "1"]
				},
				{
					rank: "SLOTS",
					prizes: ["500", "1"]
				},
				{
					rank: "LIVE CASINO",
					prizes: ["1000", "1"]
				}
			]
		},
		hi_en: {
			prizeList: [
				{
					rank: "CHAMPION",
					prizes: ["300,000", "30,000", "10,000"]
				},
				{
					rank: "1st Runner Up",
					prizes: ["250,000", "25,000", "8,000"]
				},
				{
					rank: "2nd Runner Up",
					prizes: ["180,000", "18,000", "6,000"]
				},
				{
					rank: "3rd Runner Up",
					prizes: ["150,000", "15,000", "5,000"]
				},
				{
					rank: "4th Runner Up",
					prizes: ["120,000", "12,000", "4,000"]
				},
				{
					rank: "5th Runner Up",
					prizes: ["100,000", "10,000", "3,000"]
				},
				{
					rank: "6th Runner Up",
					prizes: ["90,000", "9,000", "2,000"]
				},
				{
					rank: "7th Runner Up",
					prizes: ["80,000", "8,000", "1,000"]
				},
				{
					rank: "RANK 9th - 30th",
					prizes: ["50,000", "5,000", "500"]
				}
			],
			pointCalculation: [
				{
					rank: "SPORTS",
					prizes: ["100", "1"]
				},
				{
					rank: "SLOTS",
					prizes: ["500", "1"]
				},
				{
					rank: "LIVE CASINO",
					prizes: ["1000", "1"]
				}
			]
		},
		hi: {
			prizeList: [
				{
					rank: "CHAMPION",
					prizes: ["300,000", "30,000", "10,000"]
				},
				{
					rank: "1st Runner Up",
					prizes: ["250,000", "25,000", "8,000"]
				},
				{
					rank: "2nd Runner Up",
					prizes: ["180,000", "18,000", "6,000"]
				},
				{
					rank: "3rd Runner Up",
					prizes: ["150,000", "15,000", "5,000"]
				},
				{
					rank: "4th Runner Up",
					prizes: ["120,000", "12,000", "4,000"]
				},
				{
					rank: "5th Runner Up",
					prizes: ["100,000", "10,000", "3,000"]
				},
				{
					rank: "6th Runner Up",
					prizes: ["90,000", "9,000", "2,000"]
				},
				{
					rank: "7th Runner Up",
					prizes: ["80,000", "8,000", "1,000"]
				},
				{
					rank: "RANK 9th - 30th",
					prizes: ["50,000", "5,000", "500"]
				}
			],
			pointCalculation: [
				{
					rank: "SPORTS",
					prizes: ["100", "1"]
				},
				{
					rank: "SLOTS",
					prizes: ["500", "1"]
				},
				{
					rank: "LIVE CASINO",
					prizes: ["1000", "1"]
				}
			]
		}
	},
	IDR: {
		cs: {
			prizeList: [
				{
					rank: "冠军",
					prizes: ["400,000,000", "13,500", "15,000,000"]
				},
				{
					rank: "亚军",
					prizes: ["300,000,000", "10,000", "12,000,000"]
				},
				{
					rank: "季军",
					prizes: ["220,000,000", "7,300", "8,500,000"]
				},
				{
					rank: "殿军",
					prizes: ["180,000,000", "6,000", "6,500,000"]
				},
				{
					rank: "第五名",
					prizes: ["150,000,000", "5,000", "5,000,000"]
				},
				{
					rank: "第六名",
					prizes: ["130,000,000", "4,300", "3,500,000"]
				},
				{
					rank: "第七名",
					prizes: ["100,000,000", "3,300", "2,000,000"]
				},
				{
					rank: "第八名",
					prizes: ["65,000,000", "2,000", "1,000,000"]
				},
				{
					rank: "第九 - 第30名",
					prizes: ["35,000,000", "1,200", "500,000"]
				}
			],
			pointCalculation: [
				{
					rank: "体育",
					prizes: ["300,000", "1"]
				},
				{
					rank: "电子游戏",
					prizes: ["1,000,000", "1"]
				},
				{
					rank: "真人娱乐",
					prizes: ["2,500,000", "1"]
				}
			]
		},
		id: {
			prizeList: [
				{
					rank: "PEMENANG",
					prizes: ["400,000,000", "13,500", "15,000,000"]
				},
				{
					rank: "JUARA 2",
					prizes: ["300,000,000", "10,000", "12,000,000"]
				},
				{
					rank: "JUARA 3",
					prizes: ["220,000,000", "7,300", "8,500,000"]
				},
				{
					rank: "JUARA 4",
					prizes: ["180,000,000", "6,000", "6,500,000"]
				},
				{
					rank: "JUARA 5",
					prizes: ["150,000,000", "5,000", "5,000,000"]
				},
				{
					rank: "JUARA 6",
					prizes: ["130,000,000", "4,300", "3,500,000"]
				},
				{
					rank: "JUARA 7",
					prizes: ["100,000,000", "3,300", "2,000,000"]
				},
				{
					rank: "JUARA 8",
					prizes: ["65,000,000", "2,000", "1,000,000"]
				},
				{
					rank: "JUARA 9 - 30",
					prizes: ["35,000,000", "1,200", "500,000"]
				}
			],
			pointCalculation: [
				{
					rank: "SPORTS",
					prizes: ["300,000", "1"]
				},
				{
					rank: "SLOTS",
					prizes: ["1,000,000", "1"]
				},
				{
					rank: "LIVE CASINO",
					prizes: ["2,500,000", "1"]
				}
			]
		},
		en: {
			prizeList: [
				{
					rank: "CHAMPION",
					prizes: ["400,000,000", "13,500", "15,000,000"]
				},
				{
					rank: "1st Runner Up",
					prizes: ["300,000,000", "10,000", "12,000,000"]
				},
				{
					rank: "2nd Runner Up",
					prizes: ["220,000,000", "7,300", "8,500,000"]
				},
				{
					rank: "3rd Runner Up",
					prizes: ["180,000,000", "6,000", "6,500,000"]
				},
				{
					rank: "4th Runner Up",
					prizes: ["150,000,000", "5,000", "5,000,000"]
				},
				{
					rank: "5th Runner Up",
					prizes: ["130,000,000", "4,300", "3,500,000"]
				},
				{
					rank: "6th Runner Up",
					prizes: ["100,000,000", "3,300", "2,000,000"]
				},
				{
					rank: "7th Runner Up",
					prizes: ["65,000,000", "2,000", "1,000,000"]
				},
				{
					rank: "RANK 9th - 30th",
					prizes: ["35,000,000", "1,200", "500,000"]
				}
			],
			pointCalculation: [
				{
					rank: "SPORTS",
					prizes: ["300,000", "1"]
				},
				{
					rank: "SLOTS",
					prizes: ["1,000,000", "1"]
				},
				{
					rank: "LIVE CASINO",
					prizes: ["2,500,000", "1"]
				}
			]
		},
		th: {
			prizeList: [
				{
					rank: "รางวัลชนะเลิศ",
					prizes: ["400,000,000", "13,500", "15,000,000"]
				},
				{
					rank: "รองชนะเลิศอันดับ 1",
					prizes: ["300,000,000", "10,000", "12,000,000"]
				},
				{
					rank: "รองชนะเลิศอันดับ 2",
					prizes: ["220,000,000", "7,300", "8,500,000"]
				},
				{
					rank: "รองชนะเลิศอันดับ 3",
					prizes: ["180,000,000", "6,000", "6,500,000"]
				},
				{
					rank: "รองชนะเลิศอันดับ 4",
					prizes: ["150,000,000", "5,000", "5,000,000"]
				},
				{
					rank: "รองชนะเลิศอันดับ 5",
					prizes: ["130,000,000", "4,300", "3,500,000"]
				},
				{
					rank: "รองชนะเลิศอันดับ 6",
					prizes: ["100,000,000", "3,300", "2,000,000"]
				},
				{
					rank: "รองชนะเลิศอันดับ 7",
					prizes: ["65,000,000", "2,000", "1,000,000"]
				},
				{
					rank: "อันดับที่ 9 - 30",
					prizes: ["35,000,000", "1,200", "500,000"]
				}
			],
			pointCalculation: [
				{
					rank: "กีฬา",
					prizes: ["300,000", "1"]
				},
				{
					rank: "สล็อต",
					prizes: ["1,000,000", "1"]
				},
				{
					rank: "คาสิโนสด",
					prizes: ["2,500,000", "1"]
				}
			]
		},
		th_en: {
			prizeList: [
				{
					rank: "CHAMPION",
					prizes: ["400,000,000", "13,500", "15,000,000"]
				},
				{
					rank: "1st Runner Up",
					prizes: ["300,000,000", "10,000", "12,000,000"]
				},
				{
					rank: "2nd Runner Up",
					prizes: ["220,000,000", "7,300", "8,500,000"]
				},
				{
					rank: "3rd Runner Up",
					prizes: ["180,000,000", "6,000", "6,500,000"]
				},
				{
					rank: "4th Runner Up",
					prizes: ["150,000,000", "5,000", "5,000,000"]
				},
				{
					rank: "5th Runner Up",
					prizes: ["130,000,000", "4,300", "3,500,000"]
				},
				{
					rank: "6th Runner Up",
					prizes: ["100,000,000", "3,300", "2,000,000"]
				},
				{
					rank: "7th Runner Up",
					prizes: ["65,000,000", "2,000", "1,000,000"]
				},
				{
					rank: "RANK 9th - 30th",
					prizes: ["35,000,000", "1,200", "500,000"]
				}
			],
			pointCalculation: [
				{
					rank: "SPORTS",
					prizes: ["300,000", "1"]
				},
				{
					rank: "SLOTS",
					prizes: ["1,000,000", "1"]
				},
				{
					rank: "LIVE CASINO",
					prizes: ["2,500,000", "1"]
				}
			]
		},
		id_en: {
			prizeList: [
				{
					rank: "CHAMPION",
					prizes: ["400,000,000", "13,500", "15,000,000"]
				},
				{
					rank: "1st Runner Up",
					prizes: ["300,000,000", "10,000", "12,000,000"]
				},
				{
					rank: "2nd Runner Up",
					prizes: ["220,000,000", "7,300", "8,500,000"]
				},
				{
					rank: "3rd Runner Up",
					prizes: ["180,000,000", "6,000", "6,500,000"]
				},
				{
					rank: "4th Runner Up",
					prizes: ["150,000,000", "5,000", "5,000,000"]
				},
				{
					rank: "5th Runner Up",
					prizes: ["130,000,000", "4,300", "3,500,000"]
				},
				{
					rank: "6th Runner Up",
					prizes: ["100,000,000", "3,300", "2,000,000"]
				},
				{
					rank: "7th Runner Up",
					prizes: ["65,000,000", "2,000", "1,000,000"]
				},
				{
					rank: "RANK 9th - 30th",
					prizes: ["35,000,000", "1,200", "500,000"]
				}
			],
			pointCalculation: [
				{
					rank: "SPORTS",
					prizes: ["300,000", "1"]
				},
				{
					rank: "SLOTS",
					prizes: ["1,000,000", "1"]
				},
				{
					rank: "LIVE CASINO",
					prizes: ["2,500,000", "1"]
				}
			]
		},
		hi_en: {
			prizeList: [
				{
					rank: "CHAMPION",
					prizes: ["400,000,000", "13,500", "15,000,000"]
				},
				{
					rank: "1st Runner Up",
					prizes: ["300,000,000", "10,000", "12,000,000"]
				},
				{
					rank: "2nd Runner Up",
					prizes: ["220,000,000", "7,300", "8,500,000"]
				},
				{
					rank: "3rd Runner Up",
					prizes: ["180,000,000", "6,000", "6,500,000"]
				},
				{
					rank: "4th Runner Up",
					prizes: ["150,000,000", "5,000", "5,000,000"]
				},
				{
					rank: "5th Runner Up",
					prizes: ["130,000,000", "4,300", "3,500,000"]
				},
				{
					rank: "6th Runner Up",
					prizes: ["100,000,000", "3,300", "2,000,000"]
				},
				{
					rank: "7th Runner Up",
					prizes: ["65,000,000", "2,000", "1,000,000"]
				},
				{
					rank: "RANK 9th - 30th",
					prizes: ["35,000,000", "1,200", "500,000"]
				}
			],
			pointCalculation: [
				{
					rank: "SPORTS",
					prizes: ["300,000", "1"]
				},
				{
					rank: "SLOTS",
					prizes: ["1,000,000", "1"]
				},
				{
					rank: "LIVE CASINO",
					prizes: ["2,500,000", "1"]
				}
			]
		}
	},
	THB: {
		cs: {
			prizeList: [
				{
					rank: "冠军",
					prizes: ["1,200,000", "24,000", "50,000"]
				},
				{
					rank: "亚军",
					prizes: ["1,100,000", "22,000", "40,000"]
				},
				{
					rank: "季军",
					prizes: ["950,000", "19,000", "35,000"]
				},
				{
					rank: "殿军",
					prizes: ["800,000", "16,000", "25,000"]
				},
				{
					rank: "第五名",
					prizes: ["700,000", "14,000", "20,000"]
				},
				{
					rank: "第六名",
					prizes: ["600,000", "12,000", "15,000"]
				},
				{
					rank: "第七名",
					prizes: ["500,000", "10,000", "10,000"]
				},
				{ rank: "第八名", prizes: ["400,000", "8,000", "5,000"] },
				{
					rank: "第九 - 第30名",
					prizes: ["300,000", "6,000", "3,000"]
				}
			],
			pointCalculation: [
				{
					rank: "体育",
					prizes: ["500", "1"]
				},
				{
					rank: "电子游戏",
					prizes: ["3000", "1"]
				},
				{
					rank: "真人娱乐",
					prizes: ["6000", "1"]
				}
			]
		},
		id: {
			prizeList: [
				{
					rank: "PEMENANG",
					prizes: ["1,200,000", "24,000", "50,000"]
				},
				{
					rank: "JUARA 2",
					prizes: ["1,100,000", "22,000", "40,000"]
				},
				{
					rank: "JUARA 3",
					prizes: ["950,000", "19,000", "35,000"]
				},
				{
					rank: "JUARA 4",
					prizes: ["800,000", "16,000", "25,000"]
				},
				{
					rank: "JUARA 5",
					prizes: ["700,000", "14,000", "20,000"]
				},
				{
					rank: "JUARA 6",
					prizes: ["600,000", "12,000", "15,000"]
				},
				{
					rank: "JUARA 7",
					prizes: ["500,000", "10,000", "10,000"]
				},
				{
					rank: "JUARA 8",
					prizes: ["400,000", "8,000", "5,000"]
				},
				{
					rank: "JUARA 9 - 30",
					prizes: ["300,000", "6,000", "3,000"]
				}
			],
			pointCalculation: [
				{
					rank: "SPORTS",
					prizes: ["500", "1"]
				},
				{
					rank: "SLOTS",
					prizes: ["3000", "1"]
				},
				{
					rank: "LIVE CASINO",
					prizes: ["6000", "1"]
				}
			]
		},
		en: {
			prizeList: [
				{
					rank: "CHAMPION",
					prizes: ["1,200,000", "24,000", "50,000"]
				},
				{
					rank: "1st Runner Up",
					prizes: ["1,100,000", "22,000", "40,000"]
				},
				{
					rank: "2nd Runner Up",
					prizes: ["950,000", "19,000", "35,000"]
				},
				{
					rank: "3rd Runner Up",
					prizes: ["800,000", "16,000", "25,000"]
				},
				{
					rank: "4th Runner Up",
					prizes: ["700,000", "14,000", "20,000"]
				},
				{
					rank: "5th Runner Up",
					prizes: ["600,000", "12,000", "15,000"]
				},
				{
					rank: "6th Runner Up",
					prizes: ["500,000", "10,000", "10,000"]
				},
				{
					rank: "7th Runner Up",
					prizes: ["400,000", "8,000", "5,000"]
				},
				{
					rank: "RANK 9th - 30th",
					prizes: ["300,000", "6,000", "3,000"]
				}
			],
			pointCalculation: [
				{
					rank: "SPORTS",
					prizes: ["500", "1"]
				},
				{
					rank: "SLOTS",
					prizes: ["3000", "1"]
				},
				{
					rank: "LIVE CASINO",
					prizes: ["6000", "1"]
				}
			]
		},
		th: {
			prizeList: [
				{
					rank: "รางวัลชนะเลิศ",
					prizes: ["1,200,000", "24,000", "50,000"]
				},
				{
					rank: "รองชนะเลิศอันดับ 1",
					prizes: ["1,100,000", "22,000", "40,000"]
				},
				{
					rank: "รองชนะเลิศอันดับ 2",
					prizes: ["950,000", "19,000", "35,000"]
				},
				{
					rank: "รองชนะเลิศอันดับ 3",
					prizes: ["800,000", "16,000", "25,000"]
				},
				{
					rank: "รองชนะเลิศอันดับ 4",
					prizes: ["700,000", "14,000", "20,000"]
				},
				{
					rank: "รองชนะเลิศอันดับ 5",
					prizes: ["600,000", "12,000", "15,000"]
				},
				{
					rank: "รองชนะเลิศอันดับ 6",
					prizes: ["500,000", "10,000", "10,000"]
				},
				{
					rank: "รองชนะเลิศอันดับ 7",
					prizes: ["400,000", "8,000", "5,000"]
				},
				{
					rank: "อันดับที่ 9 - 30",
					prizes: ["300,000", "6,000", "3,000"]
				}
			],
			pointCalculation: [
				{
					rank: "กีฬา",
					prizes: ["500", "1"]
				},
				{
					rank: "สล็อต",
					prizes: ["3000", "1"]
				},
				{
					rank: "คาสิโนสด",
					prizes: ["6000", "1"]
				}
			]
		},
		id_en: {
			prizeList: [
				{
					rank: "CHAMPION",
					prizes: ["1,200,000", "24,000", "50,000"]
				},
				{
					rank: "1st Runner Up",
					prizes: ["1,100,000", "22,000", "40,000"]
				},
				{
					rank: "2nd Runner Up",
					prizes: ["950,000", "19,000", "35,000"]
				},
				{
					rank: "3rd Runner Up",
					prizes: ["800,000", "16,000", "25,000"]
				},
				{
					rank: "4th Runner Up",
					prizes: ["700,000", "14,000", "20,000"]
				},
				{
					rank: "5th Runner Up",
					prizes: ["600,000", "12,000", "15,000"]
				},
				{
					rank: "6th Runner Up",
					prizes: ["500,000", "10,000", "10,000"]
				},
				{
					rank: "7th Runner Up",
					prizes: ["400,000", "8,000", "5,000"]
				},
				{
					rank: "RANK 9th - 30th",
					prizes: ["300,000", "6,000", "3,000"]
				}
			],
			pointCalculation: [
				{
					rank: "SPORTS",
					prizes: ["500", "1"]
				},
				{
					rank: "SLOTS",
					prizes: ["3000", "1"]
				},
				{
					rank: "LIVE CASINO",
					prizes: ["6000", "1"]
				}
			]
		},
		hi_en: {
			prizeList: [
				{
					rank: "CHAMPION",
					prizes: ["1,200,000", "24,000", "50,000"]
				},
				{
					rank: "1st Runner Up",
					prizes: ["1,100,000", "22,000", "40,000"]
				},
				{
					rank: "2nd Runner Up",
					prizes: ["950,000", "19,000", "35,000"]
				},
				{
					rank: "3rd Runner Up",
					prizes: ["800,000", "16,000", "25,000"]
				},
				{
					rank: "4th Runner Up",
					prizes: ["700,000", "14,000", "20,000"]
				},
				{
					rank: "5th Runner Up",
					prizes: ["600,000", "12,000", "15,000"]
				},
				{
					rank: "6th Runner Up",
					prizes: ["500,000", "10,000", "10,000"]
				},
				{
					rank: "7th Runner Up",
					prizes: ["400,000", "8,000", "5,000"]
				},
				{
					rank: "RANK 9th - 30th",
					prizes: ["300,000", "6,000", "3,000"]
				}
			],
			pointCalculation: [
				{
					rank: "SPORTS",
					prizes: ["500", "1"]
				},
				{
					rank: "SLOTS",
					prizes: ["3000", "1"]
				},
				{
					rank: "LIVE CASINO",
					prizes: ["6000", "1"]
				}
			]
		},
		th_en: {
			prizeList: [
				{
					rank: "CHAMPION",
					prizes: ["1,200,000", "24,000", "50,000"]
				},
				{
					rank: "1st Runner Up",
					prizes: ["1,100,000", "22,000", "40,000"]
				},
				{
					rank: "2nd Runner Up",
					prizes: ["950,000", "19,000", "35,000"]
				},
				{
					rank: "3rd Runner Up",
					prizes: ["800,000", "16,000", "25,000"]
				},
				{
					rank: "4th Runner Up",
					prizes: ["700,000", "14,000", "20,000"]
				},
				{
					rank: "5th Runner Up",
					prizes: ["600,000", "12,000", "15,000"]
				},
				{
					rank: "6th Runner Up",
					prizes: ["500,000", "10,000", "10,000"]
				},
				{
					rank: "7th Runner Up",
					prizes: ["400,000", "8,000", "5,000"]
				},
				{
					rank: "RANK 9th - 30th",
					prizes: ["300,000", "6,000", "3,000"]
				}
			],
			pointCalculation: [
				{
					rank: "SPORTS",
					prizes: ["500", "1"]
				},
				{
					rank: "SLOTS",
					prizes: ["3000", "1"]
				},
				{
					rank: "LIVE CASINO",
					prizes: ["6000", "1"]
				}
			]
		}
	}
});
