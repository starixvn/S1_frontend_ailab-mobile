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
		displayKey: "lbl_EuroDate1",
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
		[defEuroTourBtns.FinalTournament.value]: [
			{
				rank: "冠军",
				prize: "HUBLOT Big Bang Gold Ceramic"
			},
			{
				rank: "亚军",
				prize: `HUBLOT Classic Fusion Aerofusion Chronograph Titanium `
			},
			{
				rank: "季军",
				prize: `HUBLOT Classic Fusion Chronograph Titanium Blue `
			},
			{ rank: "殿军", prize: `马币 18,000` },
			{ rank: "第五名", prize: `马币 15,000` },
			{ rank: "第六名", prize: `马币 13,000` },
			{ rank: "第七名", prize: `马币 10,000` },
			{ rank: "第八名", prize: `马币 8,000` },
			{ rank: "第九名", prize: `马币 5,000` }
		],
		[defEuroTourBtns.MonthlyTournament.value]: [
			{
				rank: "冠军",
				prize: "马币 15,000"
			},
			{ rank: "亚军", prize: `马币 5,000` },
			{ rank: "季军", prize: `马币 3,000` }
		]
	},
	IDR: {
		[defEuroTourBtns.FinalTournament.value]: [
			{ rank: "PEMENANG", prize: "LOGAM MULIA 100g" },
			{ rank: "Juara 2", prize: `LOGAM MULIA 75g` },
			{ rank: "Juara 3", prize: `LOGAM MULIA 50g` },
			{ rank: "Juara 4", prize: `IDR 35,000,000` },
			{ rank: "Juara 5", prize: `IDR 30,000,000` },
			{ rank: "Juara 6", prize: `IDR 25,000,000` },
			{ rank: "Juara 7", prize: `IDR 15,000,000` },
			{ rank: "Juara 8", prize: `IDR 8,000,000` },
			{ rank: "Juara 9", prize: `IDR 5,000,000` }
		],
		[defEuroTourBtns.MonthlyTournament.value]: [
			{ rank: "PEMENANG", prize: "IDR 15,000,000" },
			{ rank: "Juara 2", prize: `IDR 12,000,000` },
			{ rank: "Juara 3", prize: `IDR 8,000,000` }
		]
	},
	THB: {
		[defEuroTourBtns.FinalTournament.value]: [
			{ rank: "รางวัลชนะเลิศ", prize: "THB 80,000 " },
			{ rank: "รองชนะเลิศอันดับ 1", prize: `THB 50,000` },
			{ rank: "รองชนะเลิศอันดับ 2", prize: `THB 35,000` },
			{ rank: "รองชนะเลิศอันดับ 3", prize: `THB 30,000` },
			{ rank: "รองชนะเลิศอันดับ 4", prize: `THB 25,000` },
			{ rank: "รองชนะเลิศอันดับ 5", prize: `THB 20,000` },
			{ rank: "รองชนะเลิศอันดับ 6", prize: `THB 15,000` },
			{ rank: "รองชนะเลิศอันดับ 7", prize: `THB 10,000` },
			{ rank: "รองชนะเลิศอันดับ 8", prize: `THB 5,000` }
		],
		[defEuroTourBtns.MonthlyTournament.value]: [
			{ rank: "รางวัลชนะเลิศ", prize: "THB 15,000 " },
			{ rank: "รองชนะเลิศอันดับ 1", prize: `THB 12,000` },
			{ rank: "รองชนะเลิศอันดับ 2", prize: `THB 8,000` }
		]
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

export const defEuroPrize = () => ({
	MYR: {
		[defBtnsOfCategory.Sports.value]: [
			{
				rank: "1",
				prize: "MacBook Pro 13 M1 256GB"
			},
			{ rank: "2", prize: `iPad Air 64GB Wi-Fi+Cellular ` },
			{ rank: "3", prize: `iPad 10.2inch 128GB Wi-Fi ` },
			{ rank: "4", prize: `988 Ang Pao` },
			{ rank: "5", prize: `888 Ang Pao` },
			{ rank: "6", prize: `788 Ang Pao` },
			{ rank: "7", prize: `688 Ang Pao` },
			{ rank: "8", prize: `588 Ang Pao` },
			{ rank: "9", prize: `188 Ang Pao` },
			{ rank: "10", prize: `88 Ang Pao` }
		],
		[defBtnsOfCategory.LiveCasino.value]: [
			{
				rank: "1",
				prize: "MacBook Pro 13 M1 256GB"
			},
			{ rank: "2", prize: `iPad Air 64GB Wi-Fi+Cellular ` },
			{ rank: "3", prize: `iPad 10.2inch 128GB Wi-Fi ` },
			{ rank: "4", prize: `988 Ang Pao` },
			{ rank: "5", prize: `888 Ang Pao` },
			{ rank: "6", prize: `788 Ang Pao` },
			{ rank: "7", prize: `688 Ang Pao` },
			{ rank: "8", prize: `588 Ang Pao` },
			{ rank: "9", prize: `188 Ang Pao` },
			{ rank: "10", prize: `88 Ang Pao` }
		],
		[defBtnsOfCategory.Slots.value]: [
			{
				rank: "1",
				prize: "MacBook Pro 13 M1 256GB"
			},
			{ rank: "2", prize: `iPad Air 64GB Wi-Fi+Cellular ` },
			{ rank: "3", prize: `iPad 10.2inch 128GB Wi-Fi ` },
			{ rank: "4", prize: `988 Ang Pao` },
			{ rank: "5", prize: `888 Ang Pao` },
			{ rank: "6", prize: `788 Ang Pao` },
			{ rank: "7", prize: `688 Ang Pao` },
			{ rank: "8", prize: `588 Ang Pao` },
			{ rank: "9", prize: `188 Ang Pao` },
			{ rank: "10", prize: `88 Ang Pao` }
		]
	},
	IDR: {
		[defBtnsOfCategory.Sports.value]: [
			{ rank: "1", prize: "iPad 10.2inch 128GB Wi-Fi" },
			{ rank: "2", prize: `3,388,000 IDR Ang Pao` },
			{ rank: "3", prize: `3,088,000 IDR Ang Pao` },
			{ rank: "4", prize: `2,688,000 IDR Ang Pao` },
			{ rank: "5", prize: `2,388,000 IDR Ang Pao` },
			{ rank: "6", prize: `2,088,000 IDR Ang Pao` },
			{ rank: "7", prize: `688,000 IDR Ang Pao` },
			{ rank: "8", prize: `388,000 IDR Ang Pao` }
		],
		[defBtnsOfCategory.LiveCasino.value]: [
			{ rank: "1", prize: "iPad 10.2inch 128GB Wi-Fi" },
			{ rank: "2", prize: `3,388,000 IDR Ang Pao` },
			{ rank: "3", prize: `3,088,000 IDR Ang Pao` },
			{ rank: "4", prize: `2,688,000 IDR Ang Pao` },
			{ rank: "5", prize: `2,388,000 IDR Ang Pao` },
			{ rank: "6", prize: `2,088,000 IDR Ang Pao` },
			{ rank: "7", prize: `688,000 IDR Ang Pao` },
			{ rank: "8", prize: `388,000 IDR Ang Pao` }
		],
		[defBtnsOfCategory.Slots.value]: [
			{ rank: "1", prize: "iPad 10.2inch 128GB Wi-Fi" },
			{ rank: "2", prize: `3,388,000 IDR Ang Pao` },
			{ rank: "3", prize: `3,088,000 IDR Ang Pao` },
			{ rank: "4", prize: `2,688,000 IDR Ang Pao` },
			{ rank: "5", prize: `2,388,000 IDR Ang Pao` },
			{ rank: "6", prize: `2,088,000 IDR Ang Pao` },
			{ rank: "7", prize: `688,000 IDR Ang Pao` },
			{ rank: "8", prize: `388,000 IDR Ang Pao` }
		]
	},
	THB: {
		[defBtnsOfCategory.Sports.value]: [
			{ rank: "1", prize: "iPad 10.2inch 128GB Wi-Fi " },
			{ rank: "2", prize: `7,788 THB Ang Pao` },
			{ rank: "3", prize: `6,688 THB Ang Pao` },
			{ rank: "4", prize: `5,588 THB Ang Pao` },
			{ rank: "5", prize: `4,888 THB Ang Pao` },
			{ rank: "6", prize: `4,388 THB Ang Pao` },
			{ rank: "7", prize: `1,388 THB Ang Pao` },
			{ rank: "8", prize: `688 THB Ang Pao` }
		],
		[defBtnsOfCategory.LiveCasino.value]: [
			{ rank: "1", prize: "iPad 10.2inch 128GB Wi-Fi " },
			{ rank: "2", prize: `7,788 THB Ang Pao` },
			{ rank: "3", prize: `6,688 THB Ang Pao` },
			{ rank: "4", prize: `5,588 THB Ang Pao` },
			{ rank: "5", prize: `4,888 THB Ang Pao` },
			{ rank: "6", prize: `4,388 THB Ang Pao` },
			{ rank: "7", prize: `1,388 THB Ang Pao` },
			{ rank: "8", prize: `688 THB Ang Pao` }
		],
		[defBtnsOfCategory.Slots.value]: [
			{ rank: "1", prize: "iPad 10.2inch 128GB Wi-Fi " },
			{ rank: "2", prize: `7,788 THB Ang Pao` },
			{ rank: "3", prize: `6,688 THB Ang Pao` },
			{ rank: "4", prize: `5,588 THB Ang Pao` },
			{ rank: "5", prize: `4,888 THB Ang Pao` },
			{ rank: "6", prize: `4,388 THB Ang Pao` },
			{ rank: "7", prize: `1,388 THB Ang Pao` },
			{ rank: "8", prize: `688 THB Ang Pao` }
		]
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
		],
		[defBtnsOfCategory.Slots.value]: [
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
