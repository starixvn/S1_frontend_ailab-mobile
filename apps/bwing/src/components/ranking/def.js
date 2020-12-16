export const defElemType = {
	Event: "Event",
	Ranking: "Ranking",
	Record: "Record"
};

export const defBtns = {
	Event: {
		displayKey: "lbl_Event",
		value: "Event",
		elemType: defElemType.Event,
		beforeLogin: true
	},
	Ranking: {
		displayKey: "lbl_Ranking",
		value: "Ranking",
		elemType: defElemType.Ranking
	},
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

export const defPrize = [
	{
		rank: "1",
		prize: "iPhone 12 Pro Max (256GB)",
		noOfWinners: 1,
		className: "no1"
	},
	{ rank: "2~6", prize: `VND 10,888,000`, noOfWinners: 5, className: "no2" },
	{ rank: "7~16", prize: `VND 5,888,000`, noOfWinners: 10, className: "no3" }
];
