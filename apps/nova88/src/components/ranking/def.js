import api from "../../service/api";

export const defElemType = {
	Event: "Event",
	Ranking: "Ranking",
	Record: "Record"
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

export const defPrize = ({ i18n: { lbl_Cash = "Cash" } }) => ({
	MYR: {
		[defBtnsOfCategory.Sports.value]: [
			{ rank: "1", prize: "iPhone 12 (64GB)" },
			{ rank: "2", prize: `888 MYR (${lbl_Cash})` },
			{ rank: "3", prize: `788 MYR (${lbl_Cash})` },
			{ rank: "4", prize: `688 MYR (${lbl_Cash})` },
			{ rank: "5", prize: `588 MYR (${lbl_Cash})` }
		],
		[defBtnsOfCategory.LiveCasino.value]: [
			{ rank: "1", prize: "iPhone 12 (64GB)" },
			{ rank: "2", prize: `888 MYR (${lbl_Cash})` },
			{ rank: "3", prize: `788 MYR (${lbl_Cash})` },
			{ rank: "4", prize: `688 MYR (${lbl_Cash})` },
			{ rank: "5", prize: `588 MYR (${lbl_Cash})` }
		],
		[defBtnsOfCategory.Slots.value]: [
			{ rank: "1", prize: "iPhone 12 (64GB)" },
			{ rank: "2", prize: `888 MYR (${lbl_Cash})` },
			{ rank: "3", prize: `788 MYR (${lbl_Cash})` },
			{ rank: "4", prize: `688 MYR (${lbl_Cash})` },
			{ rank: "5", prize: `588 MYR (${lbl_Cash})` }
		]
	},
	IDR: {
		[defBtnsOfCategory.Sports.value]: [
			{ rank: "1", prize: "iPhone 12 (64GB)" },
			{ rank: "2", prize: `3,000,000 IDR (${lbl_Cash})` },
			{ rank: "3", prize: `2,688,000 IDR (${lbl_Cash})` },
			{ rank: "4", prize: `2,388,000 IDR (${lbl_Cash})` },
			{ rank: "5", prize: `1,388,000 IDR (${lbl_Cash})` }
		],
		[defBtnsOfCategory.LiveCasino.value]: [
			{ rank: "1", prize: "iPhone 12 (64GB)" },
			{ rank: "2", prize: `3,000,000 IDR (${lbl_Cash})` },
			{ rank: "3", prize: `2,688,000 IDR (${lbl_Cash})` },
			{ rank: "4", prize: `2,388,000 IDR (${lbl_Cash})` },
			{ rank: "5", prize: `1,388,000 IDR (${lbl_Cash})` }
		],
		[defBtnsOfCategory.Slots.value]: [
			{ rank: "1", prize: "iPhone 12 (64GB)" },
			{ rank: "2", prize: `3,000,000 IDR (${lbl_Cash})` },
			{ rank: "3", prize: `2,688,000 IDR (${lbl_Cash})` },
			{ rank: "4", prize: `2,388,000 IDR (${lbl_Cash})` },
			{ rank: "5", prize: `1,388,000 IDR (${lbl_Cash})` }
		]
	},
	THB: {
		[defBtnsOfCategory.Sports.value]: [
			{ rank: "1", prize: "iPhone 12 (64GB)" },
			{ rank: "2", prize: `6,588 THB (${lbl_Cash})` },
			{ rank: "3", prize: `5,588 THB (${lbl_Cash})` },
			{ rank: "4", prize: `5,088 THB (${lbl_Cash})` },
			{ rank: "5", prize: `4,088 THB (${lbl_Cash})` }
		],
		[defBtnsOfCategory.LiveCasino.value]: [
			{ rank: "1", prize: "iPhone 12 (64GB)" },
			{ rank: "2", prize: `6,588 THB (${lbl_Cash})` },
			{ rank: "3", prize: `5,588 THB (${lbl_Cash})` },
			{ rank: "4", prize: `5,088 THB (${lbl_Cash})` },
			{ rank: "5", prize: `4,088 THB (${lbl_Cash})` }
		],
		[defBtnsOfCategory.Slots.value]: [
			{ rank: "1", prize: "iPhone 12 (64GB)" },
			{ rank: "2", prize: `6,588 THB (${lbl_Cash})` },
			{ rank: "3", prize: `5,588 THB (${lbl_Cash})` },
			{ rank: "4", prize: `5,088 THB (${lbl_Cash})` },
			{ rank: "5", prize: `4,088 THB (${lbl_Cash})` }
		]
	}
});
