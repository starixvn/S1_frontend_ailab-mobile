import api from "../../service/api";

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
	MYR: {
		cs: {
			[defEuroTourBtns.FinalTournament.value]: [
				{
					rank: "xi*******23",
					prize: "HUBLOT Big Bang Gold Ceramic"
				},
				{
					rank: "an***ew",
					prize: `HUBLOT Classic Fusion Aerofusion Chronograph Titanium `
				},
				{
					rank: "Ch****un",
					prize: `HUBLOT Classic Fusion Chronograph Titanium Blue `
				},
				{ rank: "en*****12", prize: `MYR 18,000` },
				{ rank: "in******ah", prize: `MYR 15,000` },
				{ rank: "ed***00", prize: `MYR 13,000` },
				{ rank: "ch**ai", prize: `MYR 10,000` },
				{ rank: "qq******99", prize: `MYR 8,000` },
				{ rank: "Ho***ig", prize: `MYR 5,000` },
				{ rank: "第十名" }
			],
			[defEuroTourBtns.MonthlyTournament.value]: [
				{
					rank: "冠军",
					prize: "MYR 8,000"
				},
				{ rank: "亚军", prize: `MYR 5,000` },
				{ rank: "季军", prize: `MYR 3,000` }
			]
		},
		en: {
			[defEuroTourBtns.FinalTournament.value]: [
				{
					rank: "xi*******23",
					prize: "HUBLOT Big Bang Gold Ceramic"
				},
				{
					rank: "an***ew",
					prize: `HUBLOT Classic Fusion Aerofusion Chronograph Titanium `
				},
				{
					rank: "Ch****un",
					prize: `HUBLOT Classic Fusion Chronograph Titanium Blue `
				},
				{ rank: "en*****12", prize: `MYR 18,000` },
				{ rank: "in******ah", prize: `MYR 15,000` },
				{ rank: "ed***00", prize: `MYR 13,000` },
				{ rank: "ch**ai", prize: `MYR 10,000` },
				{ rank: "qq******99", prize: `MYR 8,000` },
				{ rank: "Ho***ig", prize: `MYR 5,000` },
				{ rank: "10th Runner Up" }
			],
			[defEuroTourBtns.MonthlyTournament.value]: [
				{
					rank: "CHAMPION",
					prize: "MYR 8,000"
				},
				{ rank: "2nd Runner Up", prize: `MYR 5,000` },
				{ rank: "3rd Runner Up", prize: `MYR 3,000` }
			]
		},
		id: {
			[defEuroTourBtns.FinalTournament.value]: [
				{
					rank: "xi*******23",
					prize: "HUBLOT Big Bang Gold Ceramic"
				},
				{
					rank: "an***ew",
					prize: `HUBLOT Classic Fusion Aerofusion Chronograph Titanium `
				},
				{
					rank: "Ch****un",
					prize: `HUBLOT Classic Fusion Chronograph Titanium Blue `
				},
				{ rank: "en*****12", prize: `MYR 18,000` },
				{ rank: "in******ah", prize: `MYR 15,000` },
				{ rank: "ed***00", prize: `MYR 13,000` },
				{ rank: "ch**ai", prize: `MYR 10,000` },
				{ rank: "qq******99", prize: `MYR 8,000` },
				{ rank: "Ho***ig", prize: `MYR 5,000` },
				{ rank: "Juara 10" }
			],
			[defEuroTourBtns.MonthlyTournament.value]: [
				{
					rank: "PEMENANG",
					prize: "MYR 8,000"
				},
				{ rank: "Juara 2", prize: `MYR 5,000` },
				{ rank: "Juara 3", prize: `MYR 3,000` }
			]
		},
		th: {
			[defEuroTourBtns.FinalTournament.value]: [
				{
					rank: "xi*******23",
					prize: "HUBLOT Big Bang Gold Ceramic"
				},
				{
					rank: "an***ew",
					prize: `HUBLOT Classic Fusion Aerofusion Chronograph Titanium `
				},
				{
					rank: "Ch****un",
					prize: `HUBLOT Classic Fusion Chronograph Titanium Blue `
				},
				{ rank: "en*****12", prize: `MYR 18,000` },
				{ rank: "in******ah", prize: `MYR 15,000` },
				{ rank: "ed***00", prize: `MYR 13,000` },
				{ rank: "ch**ai", prize: `MYR 10,000` },
				{ rank: "qq******99", prize: `MYR 8,000` },
				{ rank: "Ho***ig", prize: `MYR 5,000` },
				{ rank: "รองชนะเลิศอันดับ 9" }
			],
			[defEuroTourBtns.MonthlyTournament.value]: [
				{
					rank: "รางวัลชนะเลิศ",
					prize: "MYR 8,000"
				},
				{ rank: "รองชนะเลิศอันดับ 2", prize: `MYR 5,000` },
				{ rank: "รองชนะเลิศอันดับ 3", prize: `MYR 3,000` }
			]
		}
	},
	IDR: {
		cs: {
			[defEuroTourBtns.FinalTournament.value]: [
				{ rank: "冠军", prize: "LOGAM MULIA 100g" },
				{ rank: "亚军", prize: `LOGAM MULIA 75g` },
				{ rank: "季军", prize: `LOGAM MULIA 50g` },
				{ rank: "殿军", prize: `IDR 35.000.000` },
				{ rank: "第五名", prize: `IDR 30.000.000` },
				{ rank: "He******ah", prize: `IDR 25.000.000` },
				{ rank: "第七名", prize: `IDR 15.000.000` },
				{ rank: "第八名", prize: `IDR 8.000.000` },
				{ rank: "第九名", prize: `IDR 5.000.000` },
				{ rank: "第十名" }
			],
			[defEuroTourBtns.MonthlyTournament.value]: [
				{ rank: "冠军", prize: "IDR 15.000.000" },
				{ rank: "亚军", prize: `IDR 12.000.000` },
				{ rank: "季军", prize: `IDR 8.000.000` }
			]
		},
		en: {
			[defEuroTourBtns.FinalTournament.value]: [
				{ rank: "CHAMPION", prize: "LOGAM MULIA 100g" },
				{ rank: "2nd Runner Up", prize: `LOGAM MULIA 75g` },
				{ rank: "3rd Runner Up", prize: `LOGAM MULIA 50g` },
				{ rank: "4th Runner Up", prize: `IDR 35.000.000` },
				{ rank: "5th Runner Up", prize: `IDR 30.000.000` },
				{ rank: "He******ah", prize: `IDR 25.000.000` },
				{ rank: "7th Runner Up", prize: `IDR 15.000.000` },
				{ rank: "8th Runner Up", prize: `IDR 8.000.000` },
				{ rank: "9th Runner Up", prize: `IDR 5.000.000` },
				{ rank: "10th Runner Up" }
			],
			[defEuroTourBtns.MonthlyTournament.value]: [
				{ rank: "CHAMPION", prize: "IDR 15.000.000" },
				{ rank: "2nd Runner Up", prize: `IDR 12.000.000` },
				{ rank: "3rd Runner Up", prize: `IDR 8.000.000` }
			]
		},
		id: {
			[defEuroTourBtns.FinalTournament.value]: [
				{ rank: "PEMENANG", prize: "LOGAM MULIA 100g" },
				{ rank: "Juara 2", prize: `LOGAM MULIA 75g` },
				{ rank: "Juara 3", prize: `LOGAM MULIA 50g` },
				{ rank: "Juara 4", prize: `IDR 35.000.000` },
				{ rank: "Juara 5", prize: `IDR 30.000.000` },
				{ rank: "He******ah", prize: `IDR 25.000.000` },
				{ rank: "Juara 7", prize: `IDR 15.000.000` },
				{ rank: "Juara 8", prize: `IDR 8.000.000` },
				{ rank: "Juara 9", prize: `IDR 5.000.000` },
				{ rank: "Juara 10" }
			],
			[defEuroTourBtns.MonthlyTournament.value]: [
				{ rank: "PEMENANG", prize: "IDR 15.000.000" },
				{ rank: "Juara 2", prize: `IDR 12.000.000` },
				{ rank: "Juara 3", prize: `IDR 8.000.000` }
			]
		},
		th: {
			[defEuroTourBtns.FinalTournament.value]: [
				{ rank: "รางวัลชนะเลิศ", prize: "LOGAM MULIA 100g" },
				{ rank: "รองชนะเลิศอันดับ 1", prize: `LOGAM MULIA 75g` },
				{ rank: "รองชนะเลิศอันดับ 2", prize: `LOGAM MULIA 50g` },
				{ rank: "รองชนะเลิศอันดับ 3", prize: `IDR 35.000.000` },
				{ rank: "รองชนะเลิศอันดับ 4", prize: `IDR 30.000.000` },
				{ rank: "He******ah", prize: `IDR 25.000.000` },
				{ rank: "รองชนะเลิศอันดับ 6", prize: `IDR 15.000.000` },
				{ rank: "รองชนะเลิศอันดับ 7", prize: `IDR 8.000.000` },
				{ rank: "รองชนะเลิศอันดับ 8", prize: `IDR 5.000.000` },
				{ rank: "รองชนะเลิศอันดับ 9" }
			],
			[defEuroTourBtns.MonthlyTournament.value]: [
				{ rank: "รางวัลชนะเลิศ", prize: "IDR 15.000.000" },
				{ rank: "รองชนะเลิศอันดับ 2", prize: `IDR 12.000.000` },
				{ rank: "รองชนะเลิศอันดับ 3", prize: `IDR 8.000.000` }
			]
		}
	},
	THB: {
		cs: {
			[defEuroTourBtns.FinalTournament.value]: [
				{ rank: "冠军", prize: "THB 80,000 " },
				{ rank: "pt****60", prize: `THB 50,000` },
				{ rank: "Pa**rn", prize: `THB 35,000` },
				{ rank: "殿军", prize: `THB 30,000` },
				{ rank: "Th********75", prize: `THB 25,000` },
				{ rank: "ro*******in", prize: `THB 20,000` },
				{ rank: "oa*****99", prize: `THB 15,000` },
				{ rank: "Th****st", prize: `THB 10,000` },
				{ rank: "Hi**gu", prize: `THB 5,000` },
				{ rank: "第十名" }
			],
			[defEuroTourBtns.MonthlyTournament.value]: [
				{ rank: "冠军", prize: "THB 15,000 " },
				{ rank: "亚军", prize: `THB 12,000` },
				{ rank: "季军", prize: `THB 8,000` }
			]
		},
		en: {
			[defEuroTourBtns.FinalTournament.value]: [
				{ rank: "CHAMPION", prize: "THB 80,000 " },
				{ rank: "pt****60", prize: `THB 50,000` },
				{ rank: "Pa**rn", prize: `THB 35,000` },
				{ rank: "4th Runner Up", prize: `THB 30,000` },
				{ rank: "Th********75", prize: `THB 25,000` },
				{ rank: "ro*******in", prize: `THB 20,000` },
				{ rank: "oa*****99", prize: `THB 15,000` },
				{ rank: "Th****st", prize: `THB 10,000` },
				{ rank: "Hi**gu", prize: `THB 5,000` },
				{ rank: "10th" }
			],
			[defEuroTourBtns.MonthlyTournament.value]: [
				{ rank: "CHAMPION", prize: "THB 15,000 " },
				{ rank: "2nd Runner Up", prize: `THB 12,000` },
				{ rank: "3rd Runner Up", prize: `THB 8,000` }
			]
		},
		id: {
			[defEuroTourBtns.FinalTournament.value]: [
				{ rank: "PEMENANG", prize: "THB 80,000 " },
				{ rank: "pt****60", prize: `THB 50,000` },
				{ rank: "Pa**rn", prize: `THB 35,000` },
				{ rank: "Juara 4", prize: `THB 30,000` },
				{ rank: "Th********75", prize: `THB 25,000` },
				{ rank: "ro*******in", prize: `THB 20,000` },
				{ rank: "oa*****99", prize: `THB 15,000` },
				{ rank: "Th****st", prize: `THB 10,000` },
				{ rank: "Hi**gu", prize: `THB 5,000` },
				{ rank: "Juara 10" }
			],
			[defEuroTourBtns.MonthlyTournament.value]: [
				{ rank: "รางวัลชนะเลิศ", prize: "THB 15,000 " },
				{ rank: "รองชนะเลิศอันดับ 1", prize: `THB 12,000` },
				{ rank: "รองชนะเลิศอันดับ 2", prize: `THB 8,000` }
			]
		},
		th: {
			[defEuroTourBtns.FinalTournament.value]: [
				{ rank: "รางวัลชนะเลิศ", prize: "THB 80,000 " },
				{ rank: "pt****60", prize: `THB 50,000` },
				{ rank: "Pa**rn", prize: `THB 35,000` },
				{ rank: "รองชนะเลิศอันดับ 3", prize: `THB 30,000` },
				{ rank: "Th********75", prize: `THB 25,000` },
				{ rank: "ro*******in", prize: `THB 20,000` },
				{ rank: "oa*****99", prize: `THB 15,000` },
				{ rank: "Th****st", prize: `THB 10,000` },
				{ rank: "Hi**gu", prize: `THB 5,000` },
				{ rank: "รองชนะเลิศอันดับ 9" }
			],
			[defEuroTourBtns.MonthlyTournament.value]: [
				{ rank: "รางวัลชนะเลิศ", prize: "THB 15,000 " },
				{ rank: "รองชนะเลิศอันดับ 1", prize: `THB 12,000` },
				{ rank: "รองชนะเลิศอันดับ 2", prize: `THB 8,000` }
			]
		}
	},
	RMB: {
		[defBtnsOfCategory.Sports.value]: [
			{
				rank: "1",
				prize: "MacBook Pro 13 M1 256GB"
			},
			{ rank: "2", prize: `iPad Air 64GB Wi-Fi+Cellular ` },
			{ rank: "3", prize: `iPad 10.2inch 128GB Wi-Fi ` },
			{ rank: "4", prize: `988 紅包` },
			{ rank: "5", prize: `888 紅包` },
			{ rank: "6", prize: `788 紅包` },
			{ rank: "7", prize: `688 紅包` },
			{ rank: "8", prize: `588 紅包` },
			{ rank: "9", prize: `188 紅包` },
			{ rank: "10", prize: `88 紅包` }
		],
		[defBtnsOfCategory.LiveCasino.value]: [
			{
				rank: "1",
				prize: "MacBook Pro 13 M1 256GB"
			},
			{ rank: "2", prize: `iPad Air 64GB Wi-Fi+Cellular ` },
			{ rank: "3", prize: `iPad 10.2inch 128GB Wi-Fi ` },
			{ rank: "4", prize: `988 紅包` },
			{ rank: "5", prize: `888 紅包` },
			{ rank: "6", prize: `788 紅包` },
			{ rank: "7", prize: `688 紅包` },
			{ rank: "8", prize: `588 紅包` },
			{ rank: "9", prize: `188 紅包` },
			{ rank: "10", prize: `88 紅包` }
		]
	}
});
