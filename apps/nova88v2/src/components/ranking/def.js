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
					ranking: "1"
				},
				{
					rank: "亚军",
					ranking: "2"
				},
				{
					rank: "季军",
					ranking: "3"
				},
				{
					rank: "殿军",
					ranking: "4"
				},
				{
					rank: "第五名",
					ranking: "5"
				},
				{
					rank: "第六名",
					ranking: "6"
				},
				{
					rank: "第七名",
					ranking: "7"
				},
				{
					rank: "第八名",
					ranking: "8"
				},
				{
					rank: "第九 - 第30名",
					ranking: "9-30"
				}
			],
			pointCalculation: [
				{
					rank: "体育"
				},
				{
					rank: "电子游戏"
				},
				{
					rank: "真人娱乐"
				}
			]
		},
		en: {
			prizeList: [
				{
					rank: "CHAMPION",
					ranking: "1"
				},
				{
					rank: "2nd Runner Up",
					ranking: "2"
				},
				{
					rank: "3rd Runner Up",
					ranking: "3"
				},
				{
					rank: "4th Runner Up",
					ranking: "4"
				},
				{
					rank: "5th Runner Up",
					ranking: "5"
				},
				{
					rank: "6th Runner Up",
					ranking: "6"
				},
				{
					rank: "7th Runner Up",
					ranking: "7"
				},
				{
					rank: "8th Runner Up",
					ranking: "8"
				},
				{
					rank: "RANK 9th - 30th",
					ranking: "9-30"
				}
			],
			pointCalculation: [
				{
					rank: "SPORTS"
				},
				{
					rank: "SLOTS"
				},
				{
					rank: "LIVE CASINO"
				}
			]
		},
		my: {
			prizeList: [
				{
					rank: "JOHAN",
					ranking: "1"
				},
				{
					rank: "Naib Johan Ke-2",
					ranking: "2"
				},
				{
					rank: "Naib Johan Ke-3",
					ranking: "3"
				},
				{
					rank: "Naib Johan Ke-4",
					ranking: "4"
				},
				{
					rank: "Naib Johan Ke-5",
					ranking: "5"
				},
				{
					rank: "Naib Johan Ke-6",
					ranking: "6"
				},
				{
					rank: "Naib Johan Ke-7",
					ranking: "7"
				},
				{
					rank: "Naib Johan Ke-8",
					ranking: "8"
				},
				{
					rank: "Naib Johan Ke-9~30",
					ranking: "9-30"
				}
			],
			pointCalculation: [
				{
					rank: "SUKAN"
				},
				{
					rank: "SLOT"
				},
				{
					rank: "KASINO LIVE"
				}
			]
		}
	},
	IDR: {
		id: {
			prizeList: [
				{
					rank: "PEMENANG",
					ranking: "1"
				},
				{
					rank: "JUARA 2",
					ranking: "2"
				},
				{
					rank: "JUARA 3",
					ranking: "3"
				},
				{
					rank: "JUARA 4",
					ranking: "4"
				},
				{
					rank: "JUARA 5",
					ranking: "5"
				},
				{
					rank: "JUARA 6",
					ranking: "6"
				},
				{
					rank: "JUARA 7",
					ranking: "7"
				},
				{
					rank: "JUARA 8",
					ranking: "8"
				},
				{
					rank: "JUARA 9 - 30",
					ranking: "9-30"
				}
			],
			pointCalculation: [
				{
					rank: "SPORTS"
				},
				{
					rank: "SLOTS"
				},
				{
					rank: "LIVE CASINO"
				}
			]
		},
		en: {
			prizeList: [
				{
					rank: "CHAMPION",
					ranking: "1"
				},
				{
					rank: "2nd Runner Up",
					ranking: "2"
				},
				{
					rank: "3rd Runner Up",
					ranking: "3"
				},
				{
					rank: "4th Runner Up",
					ranking: "4"
				},
				{
					rank: "5th Runner Up",
					ranking: "5"
				},
				{
					rank: "6th Runner Up",
					ranking: "6"
				},
				{
					rank: "7th Runner Up",
					ranking: "7"
				},
				{
					rank: "8th Runner Up",
					ranking: "8"
				},
				{
					rank: "RANK 9th - 30th",
					ranking: "9-30"
				}
			],
			pointCalculation: [
				{
					rank: "SPORTS"
				},
				{
					rank: "SLOTS"
				},
				{
					rank: "LIVE CASINO"
				}
			]
		}
	},
	THB: {
		th: {
			prizeList: [
				{
					rank: "รางวัลชนะเลิศ",
					ranking: "1"
				},
				{
					rank: "รองชนะเลิศอันดับ 2",
					ranking: "2"
				},
				{
					rank: "รองชนะเลิศอันดับ 3",
					ranking: "3"
				},
				{
					rank: "รองชนะเลิศอันดับ 4",
					ranking: "4"
				},
				{
					rank: "รองชนะเลิศอันดับ 5",
					ranking: "5"
				},
				{
					rank: "รองชนะเลิศอันดับ 6",
					ranking: "6"
				},
				{
					rank: "รองชนะเลิศอันดับ 7",
					ranking: "7"
				},
				{
					rank: "รองชนะเลิศอันดับ 8",
					ranking: "8"
				},
				{
					rank: "อันดับที่ 9 - 30",
					ranking: "9-30"
				}
			],
			pointCalculation: [
				{
					rank: "กีฬา"
				},
				{
					rank: "สล็อต"
				},
				{
					rank: "คาสิโนสด"
				}
			]
		},
		en: {
			prizeList: [
				{
					rank: "CHAMPION",
					ranking: "1"
				},
				{
					rank: "2nd Runner Up",
					ranking: "2"
				},
				{
					rank: "3rd Runner Up",
					ranking: "3"
				},
				{
					rank: "4th Runner Up",
					ranking: "4"
				},
				{
					rank: "5th Runner Up",
					ranking: "5"
				},
				{
					rank: "6th Runner Up",
					ranking: "6"
				},
				{
					rank: "7th Runner Up",
					ranking: "7"
				},
				{
					rank: "8th Runner Up",
					ranking: "8"
				},
				{
					rank: "RANK 9th - 30th",
					ranking: "9-30"
				}
			],
			pointCalculation: [
				{
					rank: "SPORTS"
				},
				{
					rank: "SLOTS"
				},
				{
					rank: "LIVE CASINO"
				}
			]
		}
	},
	VND: {
		vn: {
			prizeList: [
				{
					rank: "Vô địch",
					ranking: "1"
				},
				{
					rank: "Giải Nhất ",
					ranking: "2"
				},
				{
					rank: "Giải Nhì",
					ranking: "3"
				},
				{
					rank: "Giải Ba",
					ranking: "4"
				},
				{
					rank: "Giải Bốn",
					ranking: "5"
				},
				{
					rank: "Giải Năm",
					ranking: "6"
				},
				{
					rank: "Giải Sáu",
					ranking: "7"
				},
				{
					rank: "Giải Bảy",
					ranking: "8"
				},
				{
					rank: "Giải Tám",
					ranking: "9-30"
				}
			],
			pointCalculation: [
				{
					rank: "Thể Thao"
				},
				{
					rank: "Máy đánh bạc"
				},
				{
					rank: "Casino trực tiếp"
				}
			]
		},
		en: {
			prizeList: [
				{
					rank: "CHAMPION",
					ranking: "1"
				},
				{
					rank: "2nd Runner Up",
					ranking: "2"
				},
				{
					rank: "3rd Runner Up",
					ranking: "3"
				},
				{
					rank: "4th Runner Up",
					ranking: "4"
				},
				{
					rank: "5th Runner Up",
					ranking: "5"
				},
				{
					rank: "6th Runner Up",
					ranking: "6"
				},
				{
					rank: "7th Runner Up",
					ranking: "7"
				},
				{
					rank: "8th Runner Up",
					ranking: "8"
				},
				{
					rank: "RANK 9th - 30th",
					ranking: "9-30"
				}
			],
			pointCalculation: [
				{
					rank: "SPORTS"
				},
				{
					rank: "SLOTS"
				},
				{
					rank: "LIVE CASINO"
				}
			]
		}
	}
});
