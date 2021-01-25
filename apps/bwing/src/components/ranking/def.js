export const defElemType = {
	Event: "Event",
	Ranking: "Ranking",
	Record: "Record",
	LastEvent: "LastEvent"
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

export const defPrize = [
	{
		rank: "1",
		prize: "VND 8,888,000",
		noOfWinners: 1,
		className: "no1"
	},
	{ rank: "2", prize: `VND 5,888,000`, noOfWinners: 1, className: "no2" },
	{ rank: "3", prize: `VND 2,880,000`, noOfWinners: 1, className: "no3" },
	{ rank: "4", prize: `VND 1,880,000`, noOfWinners: 1 },
	{ rank: "5", prize: `VND 880,000`, noOfWinners: 1 },
	{ rank: "6", prize: `VND 80,000`, noOfWinners: 15 }
];
