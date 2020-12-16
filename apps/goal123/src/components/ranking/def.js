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
		prize: "VND 38,888"
	},
	{
		rank: "2",
		prize: "VND 28,888"
	},
	{
		rank: "3",
		prize: "VND 18,888"
	},
	{
		rank: "4",
		prize: "VND 12,888"
	},
	{
		rank: "5",
		prize: "VND 8,888"
	},
	{
		rank: "6",
		prize: "VND 6,888"
	},
	{
		rank: "7",
		prize: "VND 5,888"
	},
	{
		rank: "8-10",
		prize: "VND 3,888"
	},
	{
		rank: "11-20",
		prize: "VND 2,888"
	}
];
