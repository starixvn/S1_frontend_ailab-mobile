export const matchType = {
	knockouts: "knockouts",
	groups: "groups"
};

export const knockoutsEvent = {
	roundOf16: {
		eventName: "roundOf16",
		prize: "268,000,000",
		displayKey: "lbl_roundOf16"
	},
	quarterFinals: {
		eventName: "quarterFinals",
		prize: "568,000,000",
		displayKey: "lbl_quarterFinals"
	},
	semiFinals: {
		eventName: "semiFinals",
		prize: "768,000,000",
		displayKey: "lbl_semiFinals"
	},
	thirdPlace: {
		eventName: "3rdPlace",
		prize: "1,368,000,000",
		displayKey: "lbl_3rdPlace"
	},
	final: {
		eventName: "final",
		prize: "2,888,000,000",
		displayKey: "lbl_final"
	}
};

export const defMatchTime = {
	roundOf16: [
		{ match: "49", sort: 1 },
		{ match: "50", sort: 3 },
		{ match: "52", sort: 11 },
		{ match: "51", sort: 9 },
		{ match: "53", sort: 5 },
		{ match: "54", sort: 7 },
		{ match: "55", sort: 13 },
		{ match: "56", sort: 15 }
	],
	quarterFinals: [
		{ match: "58", sort: 3 },
		{ match: "57", sort: 1 },
		{ match: "60", sort: 7 },
		{ match: "59", sort: 5 }
	],
	semiFinals: [
		{ match: "61", sort: 1 },
		{ match: "62", sort: 3 }
	],
	"3rdPlace": [{ match: "63", sort: 1 }],
	final: [{ match: "64", sort: 1 }]
};

export const defPrize = {
	knockouts: {},
	groups: {}
};

export const defKnockoutsEvent = [];

export const defGroupsData = {
	1121: [
		{
			time: "2022/11/21 10:00 +0000",
			teamA: {
				name: "Senegal",
				nameVN: "Senegal",
				imgName: "senegal.jpg"
			},
			teamB: {
				name: "Netherlands",
				nameVN: "Hà Lan",
				imgName: "netherlands.jpg"
			}
		},
		{
			time: "2022/11/21 13:00 +0000",
			teamA: {
				name: "England",
				nameVN: "Anh",
				imgName: "england.jpg"
			},
			teamB: {
				name: "IR Iran",
				nameVN: "IR Iran",
				imgName: "iran.jpg"
			}
		},
		{
			time: "2022/11/21 16:00 +0000",
			teamA: {
				name: "Qatar",
				nameVN: "Qatar",
				imgName: "qatar.jpg"
			},
			teamB: {
				name: "Ecuador",
				nameVN: "Ecuador",
				imgName: "ecuador.jpg"
			}
		}
	],
	1122: [
		{
			time: "2022/11/22 19:00 +0000",
			teamA: {
				name: "USA",
				nameVN: "Mỹ",
				imgName: "usa.jpg"
			},
			teamB: {
				name: "Wales",
				nameVN: "Xứ Wales",
				imgName: "wales.jpg"
			}
		},
		{
			time: "2022/11/22 10:00 +0000",
			teamA: {
				name: "Argentina",
				nameVN: "Argentina",
				imgName: "argentina.jpg"
			},
			teamB: {
				name: "Saudi Arabia",
				nameVN: "Ả Rập Xê Út",
				imgName: "saudi arabia.jpg"
			}
		},
		{
			time: "2022/11/22 13:00 +0000",
			teamA: {
				name: "Denmark",
				nameVN: "Đan Mạch",
				imgName: "denmark.jpg"
			},
			teamB: {
				name: "Tunisia",
				nameVN: "Tunisia",
				imgName: "tunisia.jpg"
			}
		},
		{
			time: "2022/11/22 16:00 +0000",
			teamA: {
				name: "Mexico",
				nameVN: "Mexico",
				imgName: "mexico.jpg"
			},
			teamB: {
				name: "Poland",
				nameVN: "Ba Lan",
				imgName: "poland.jpg"
			}
		}
	],
	1123: [
		{
			time: "2022/11/22 19:00 +0000",
			teamA: {
				name: "France",
				nameVN: "Pháp",
				imgName: "france.jpg"
			},
			teamB: {
				name: "Australia",
				nameVN: "Úc",
				imgName: "australia.jpg"
			}
		},
		{
			time: "2022/11/23 10:00 +0000",
			teamA: {
				name: "Morocco",
				nameVN: "Ma-rốc",
				imgName: "morocco.jpg"
			},
			teamB: {
				name: "Croatia",
				nameVN: "Croatia",
				imgName: "croatia.jpg"
			}
		},
		{
			time: "2022/11/23 13:00 +0000",
			teamA: {
				name: "Germany",
				nameVN: "Đức",
				imgName: "germany.jpg"
			},
			teamB: {
				name: "Japan",
				nameVN: "Nhật Bản",
				imgName: "japan.jpg"
			}
		},
		{
			time: "2022/11/23 16:00 +0000",
			teamA: {
				name: "Spain",
				nameVN: "Tây Ban Nha",
				imgName: "spain.jpg"
			},
			teamB: {
				name: "Costa Rica",
				nameVN: "Costa Rica",
				imgName: "costa rica.jpg"
			}
		}
	],
	1124: [
		{
			time: "2022/11/23 19:00 +0000",
			teamA: {
				name: "Belgium",
				nameVN: "Bỉ",
				imgName: "belgium.jpg"
			},
			teamB: {
				name: "Canada",
				nameVN: "Canada",
				imgName: "canada.jpg"
			}
		},
		{
			time: "2022/11/24 10:00 +0000",
			teamA: {
				name: "Switzerland",
				nameVN: "Thụy Sĩ",
				imgName: "switzerland.jpg"
			},
			teamB: {
				name: "Cameroon",
				nameVN: "Cameroon",
				imgName: "cameroon.jpg"
			}
		},
		{
			time: "2022/11/24 13:00 +0000",
			teamA: {
				name: "Uruguay",
				nameVN: "Uruguay",
				imgName: "uruguay.jpg"
			},
			teamB: {
				name: "Korea Republic",
				nameVN: "Hàn Quốc",
				imgName: "korea republic.jpg"
			}
		},
		{
			time: "2022/11/24 16:00 +0000",
			teamA: {
				name: "Portugal",
				nameVN: "Bồ Đào Nha",
				imgName: "portugal.jpg"
			},
			teamB: {
				name: "Ghana",
				nameVN: "Ghana",
				imgName: "ghana.jpg"
			}
		}
	],
	1125: [
		{
			time: "2022/11/24 19:00 +0000",
			teamA: {
				name: "Brazil",
				nameVN: "Brazil",
				imgName: "brazil.jpg"
			},
			teamB: {
				name: "Serbia",
				nameVN: "Serbia",
				imgName: "serbia.jpg"
			}
		},
		{
			time: "2022/11/25 10:00 +0000",
			teamA: {
				name: "Wales",
				nameVN: "Xứ Wales",
				imgName: "wales.jpg"
			},
			teamB: {
				name: "IR Iran",
				nameVN: "IR Iran",
				imgName: "iran.jpg"
			}
		},
		{
			time: "2022/11/25 13:00 +0000",
			teamA: {
				name: "Qatar",
				nameVN: "Qatar",
				imgName: "qatar.jpg"
			},
			teamB: {
				name: "Senegal",
				nameVN: "Senegal",
				imgName: "senegal.jpg"
			}
		},
		{
			time: "2022/11/25 16:00 +0000",
			teamA: {
				name: "Netherlands",
				nameVN: "Hà Lan",
				imgName: "netherlands.jpg"
			},
			teamB: {
				name: "Ecuador",
				nameVN: "Ecuador",
				imgName: "ecuador.jpg"
			}
		}
	],
	1126: [
		{
			time: "2022/11/25 19:00 +0000",
			teamA: {
				name: "England",
				nameVN: "Anh",
				imgName: "england.jpg"
			},
			teamB: {
				name: "USA",
				nameVN: "Mỹ",
				imgName: "usa.jpg"
			}
		},
		{
			time: "2022/11/26 10:00 +0000",
			teamA: {
				name: "Tunisia",
				nameVN: "Tunisia",
				imgName: "tunisia.jpg"
			},
			teamB: {
				name: "Australia",
				nameVN: "Úc",
				imgName: "australia.jpg"
			}
		},
		{
			time: "2022/11/26 13:00 +0000",
			teamA: {
				name: "Poland",
				nameVN: "Ba Lan",
				imgName: "poland.jpg"
			},
			teamB: {
				name: "Saudi Arabia",
				nameVN: "Ả Rập Xê Út",
				imgName: "saudi arabia.jpg"
			}
		},
		{
			time: "2022/11/26 16:00 +0000",
			teamA: {
				name: "France",
				nameVN: "Pháp",
				imgName: "france.jpg"
			},
			teamB: {
				name: "Denmark",
				nameVN: "Đan Mạch",
				imgName: "denmark.jpg"
			}
		}
	],
	1127: [
		{
			time: "2022/11/26 19:00 +0000",
			teamA: {
				name: "Argentina",
				nameVN: "Argentina",
				imgName: "argentina.jpg"
			},
			teamB: {
				name: "Mexico",
				nameVN: "Mexico",
				imgName: "mexico.jpg"
			}
		},
		{
			time: "2022/11/27 10:00 +0000",
			teamA: {
				name: "Japan",
				nameVN: "Nhật Bản",
				imgName: "japan.jpg"
			},
			teamB: {
				name: "Costa Rica",
				nameVN: "Costa Rica",
				imgName: "costa rica.jpg"
			}
		},
		{
			time: "2022/11/27 13:00 +0000",
			teamA: {
				name: "Belgium",
				nameVN: "Bỉ",
				imgName: "belgium.jpg"
			},
			teamB: {
				name: "Morocco",
				nameVN: "Ma-rốc",
				imgName: "morocco.jpg"
			}
		},
		{
			time: "2022/11/27 16:00 +0000",
			teamA: {
				name: "Croatia",
				nameVN: "Croatia",
				imgName: "croatia.jpg"
			},
			teamB: {
				name: "Canada",
				nameVN: "Canada",
				imgName: "canada.jpg"
			}
		}
	],
	1128: [
		{
			time: "2022/11/27 19:00 +0000",
			teamA: {
				name: "Spain",
				nameVN: "Tây Ban Nha",
				imgName: "spain.jpg"
			},
			teamB: {
				name: "Germany",
				nameVN: "Đức",
				imgName: "germany.jpg"
			}
		},
		{
			time: "2022/11/28 10:00 +0000",
			teamA: {
				name: "Cameroon",
				nameVN: "Cameroon",
				imgName: "cameroon.jpg"
			},
			teamB: {
				name: "Serbia",
				nameVN: "Serbia",
				imgName: "serbia.jpg"
			}
		},
		{
			time: "2022/11/28 13:00 +0000",
			teamA: {
				name: "Korea Republic",
				nameVN: "Hàn Quốc",
				imgName: "korea republic.jpg"
			},
			teamB: {
				name: "Ghana",
				nameVN: "Ghana",
				imgName: "ghana.jpg"
			}
		},
		{
			time: "2022/11/28 16:00 +0000",
			teamA: {
				name: "Brazil",
				nameVN: "Brazil",
				imgName: "brazil.jpg"
			},
			teamB: {
				name: "Switzerland",
				nameVN: "Thụy Sĩ",
				imgName: "switzerland.jpg"
			}
		}
	],
	1129: [
		{
			time: "2022/11/28 19:00 +0000",
			teamA: {
				name: "Portugal",
				nameVN: "Bồ Đào Nha",
				imgName: "portugal.jpg"
			},
			teamB: {
				name: "Uruguay",
				nameVN: "Uruguay",
				imgName: "uruguay.jpg"
			}
		},
		{
			time: "2022/11/29 15:00 +0000",
			teamA: {
				name: "Ecuador",
				nameVN: "Ecuador",
				imgName: "ecuador.jpg"
			},
			teamB: {
				name: "Senegal",
				nameVN: "Senegal",
				imgName: "senegal.jpg"
			}
		},
		{
			time: "2022/11/29 15:00 +0000",
			teamA: {
				name: "Netherlands",
				nameVN: "Hà Lan",
				imgName: "netherlands.jpg"
			},
			teamB: {
				name: "Qatar",
				nameVN: "Qatar",
				imgName: "qatar.jpg"
			}
		}
	],
	1130: [
		{
			time: "2022/11/29 19:00 +0000",
			teamA: {
				name: "Wales",
				nameVN: "Xứ Wales",
				imgName: "wales.jpg"
			},
			teamB: {
				name: "England",
				nameVN: "Anh",
				imgName: "england.jpg"
			}
		},
		{
			time: "2022/11/29 19:00 +0000",
			teamA: {
				name: "IR Iran",
				nameVN: "IR Iran",
				imgName: "iran.jpg"
			},
			teamB: {
				name: "USA",
				nameVN: "Mỹ",
				imgName: "usa.jpg"
			}
		},
		{
			time: "2022/11/30 15:00 +0000",
			teamA: {
				name: "Australia",
				nameVN: "Úc",
				imgName: "australia.jpg"
			},
			teamB: {
				name: "Denmark",
				nameVN: "Đan Mạch",
				imgName: "denmark.jpg"
			}
		},
		{
			time: "2022/11/30 15:00 +0000",
			teamA: {
				name: "Tunisia",
				nameVN: "Tunisia",
				imgName: "tunisia.jpg"
			},
			teamB: {
				name: "France",
				nameVN: "Pháp",
				imgName: "france.jpg"
			}
		}
	],
	1201: [
		{
			time: "2022/11/30 19:00 +0000",
			teamA: {
				name: "Poland",
				nameVN: "Ba Lan",
				imgName: "poland.jpg"
			},
			teamB: {
				name: "Argentina",
				nameVN: "Argentina",
				imgName: "argentina.jpg"
			}
		},
		{
			time: "2022/11/30 19:00 +0000",
			teamA: {
				name: "Saudi Arabia",
				nameVN: "Ả Rập Xê Út",
				imgName: "saudi arabia.jpg"
			},
			teamB: {
				name: "Mexico",
				nameVN: "Mexico",
				imgName: "mexico.jpg"
			}
		},
		{
			time: "2022/12/01 15:00 +0000",
			teamA: {
				name: "Croatia",
				nameVN: "Croatia",
				imgName: "croatia.jpg"
			},
			teamB: {
				name: "Belgium",
				nameVN: "Bỉ",
				imgName: "belgium.jpg"
			}
		},
		{
			time: "2022/12/01 15:00 +0000",
			teamA: {
				name: "Canada",
				nameVN: "Canada",
				imgName: "canada.jpg"
			},
			teamB: {
				name: "Morocco",
				nameVN: "Ma-rốc",
				imgName: "morocco.jpg"
			}
		}
	],
	1202: [
		{
			time: "2022/12/01 19:00 +0000",
			teamA: {
				name: "Japan",
				nameVN: "Nhật Bản",
				imgName: "japan.jpg"
			},
			teamB: {
				name: "Spain",
				nameVN: "Tây Ban Nha",
				imgName: "spain.jpg"
			}
		},
		{
			time: "2022/12/01 19:00 +0000",
			teamA: {
				name: "Costa Rica",
				nameVN: "Costa Rica",
				imgName: "costa rica.jpg"
			},
			teamB: {
				name: "Germany",
				nameVN: "Đức",
				imgName: "germany.jpg"
			}
		},
		{
			time: "2022/12/02 15:00 +0000",
			teamA: {
				name: "Ghana",
				nameVN: "Ghana",
				imgName: "ghana.jpg"
			},
			teamB: {
				name: "Uruguay",
				nameVN: "Uruguay",
				imgName: "uruguay.jpg"
			}
		},
		{
			time: "2022/12/02 15:00 +0000",
			teamA: {
				name: "Korea Republic",
				nameVN: "Hàn Quốc",
				imgName: "korea republic.jpg"
			},
			teamB: {
				name: "Portugal",
				nameVN: "Bồ Đào Nha",
				imgName: "portugal.jpg"
			}
		}
	],
	1203: [
		{
			time: "2022/12/02 19:00 +0000",
			teamA: {
				name: "Serbia",
				nameVN: "Serbia",
				imgName: "serbia.jpg"
			},
			teamB: {
				name: "Switzerland",
				nameVN: "Thụy Sĩ",
				imgName: "switzerland.jpg"
			}
		},
		{
			time: "2022/12/02 19:00 +0000",
			teamA: {
				name: "Cameroon",
				nameVN: "Cameroon",
				imgName: "cameroon.jpg"
			},
			teamB: {
				name: "Brazil",
				nameVN: "Brazil",
				imgName: "brazil.jpg"
			}
		}
	]
};
