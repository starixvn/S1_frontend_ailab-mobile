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
		lBCategoryId: api.events.deflBCategoryId.sport
	},
	LiveCasino: {
		displayKey: "lbl_LiveCasino",
		value: "LiveCasino",
		elemType: defElemType.Ranking,
		lBCategoryId: api.events.deflBCategoryId.liveCasino
	},
	Slots: {
		displayKey: "lbl_Slots",
		value: "Slots",
		elemType: defElemType.Ranking,
		lBCategoryId: api.events.deflBCategoryId.casino
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
		value: "1"
	},
	Last2Day: {
		displayKey: "lbl_last_2_day",
		value: "2"
	},
	Last3Day: {
		displayKey: "lbl_last_3_day",
		value: "3"
	}
};

export const defPrize = {
	MYR: {
		[defBtnsOfCategory.Sports.value]: {
			1: "iPhone 12 (64GB)",
			2: "888 MYR (cash)",
			3: "788 MYR (cash)",
			4: "688 MYR (cash)",
			5: "588 MYR (cash)"
		},
		[defBtnsOfCategory.LiveCasino.value]: {
			1: "iPhone 12 (64GB)",
			2: "888 MYR (cash)",
			3: "788 MYR (cash)",
			4: "688 MYR (cash)",
			5: "588 MYR (cash)"
		},
		[defBtnsOfCategory.Slots.value]: {
			1: "iPhone 12 (64GB)",
			2: "888 MYR (cash)",
			3: "788 MYR (cash)",
			4: "688 MYR (cash)",
			5: "588 MYR (cash)"
		}
	},
	IDR: {
		[defBtnsOfCategory.Sports.value]: {
			1: "iPhone 12 (64GB)",
			2: "3,000,000 IDR (cash)",
			3: "2,688,000 IDR (cash)",
			4: "2,388,000 IDR (cash)",
			5: "1,388,000 IDR (cash)"
		},
		[defBtnsOfCategory.LiveCasino.value]: {
			1: "iPhone 12 (64GB)",
			2: "3,000,000 IDR (cash)",
			3: "2,688,000 IDR (cash)",
			4: "2,388,000 IDR (cash)",
			5: "1,388,000 IDR (cash)"
		},
		[defBtnsOfCategory.Slots.value]: {
			1: "iPhone 12 (64GB)",
			2: "3,000,000 IDR (cash)",
			3: "2,688,000 IDR (cash)",
			4: "2,388,000 IDR (cash)",
			5: "1,388,000 IDR (cash)"
		}
	},
	THB: {
		[defBtnsOfCategory.Sports.value]: {
			1: "iPhone 12 (64GB)",
			2: "6,588 THB (cash)",
			3: "5,588 THB (cash)",
			4: "5,088 THB (cash)",
			5: "4,088 THB (cash)"
		},
		[defBtnsOfCategory.LiveCasino.value]: {
			1: "iPhone 12 (64GB)",
			2: "6,588 THB (cash)",
			3: "5,588 THB (cash)",
			4: "5,088 THB (cash)",
			5: "4,088 THB (cash)"
		},
		[defBtnsOfCategory.Slots.value]: {
			1: "iPhone 12 (64GB)",
			2: "6,588 THB (cash)",
			3: "5,588 THB (cash)",
			4: "5,088 THB (cash)",
			5: "4,088 THB (cash)"
		}
	}
};
