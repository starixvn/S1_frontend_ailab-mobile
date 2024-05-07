export const REWARD_ITEMS = [
	{
		key: 1,
		displayKey: "lbl_CupEvent_Champions",
		img: "",
		amount: 80000000,
		count: 2,
		winners: []
	},
	{
		key: 2,
		displayKey: "lbl_CupEvent_2ndPlace",
		img: "",
		amount: 50000000,
		count: 3,
		winners: []
	},
	{
		key: 3,
		displayKey: "lbl_CupEvent_semiFinals",
		img: "",
		amount: 10000000,
		count: 12,
		winners: ["test01", "test02", "test03"]
	}
];

export const DIRECTIONS_TYPE = {
	TERMS_AND_CONDITIONS: 1,
	MATCHES: 2
};

export const PREDICT_TABS = {
	PREDICTION: 1,
	SCHEDULE: 2
};

export const defRoundOf16Sort = {
	Match38: [5, 6],
	Match37: [1, 2],
	Match40: [7, 8],
	Match39: [3, 4],
	Match42: [9, 10],
	Match41: [11, 12],
	Match43: [15, 16],
	Match44: [13, 14]
};

export const defQuarterFinalsSort = {
	Match45: [1, 2],
	Match46: [5, 6],
	Match48: [3, 4],
	Match47: [7, 8]
};

export const defSemiFinalsSort = {
	Match49: [1, 4],
	Match50: [3, 2]
};

export const defFinalSort = {
	Match51: [1, 2]
};
