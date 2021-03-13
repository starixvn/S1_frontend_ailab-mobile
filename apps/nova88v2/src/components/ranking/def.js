import api from "../../service/api";

export const defElemType = {
	Event: "Event",
	Ranking: "Ranking",
	Record: "Record",
	LastEvent: "LastEvent"
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
