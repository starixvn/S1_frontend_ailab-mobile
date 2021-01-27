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
		prize: "5,888,123 VND"
	},
	{
		rank: "2",
		prize: "2,888,123 VND"
	},
	{
		rank: "3",
		prize: "880,123 VND"
	},
	{
		rank: "4",
		prize: "680,123 VND"
	},
	{
		rank: "5",
		prize: "380,123 VND"
	},
	{
		rank: "6",
		prize: "280,123 VND"
	}
];
