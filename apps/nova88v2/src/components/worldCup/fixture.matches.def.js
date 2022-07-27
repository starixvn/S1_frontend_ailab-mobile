export const matchType = {
	knockouts: "knockouts",
	groups: "groups"
};

export const knockoutsEvent = {
	roundOf16: {
		eventName: "roundOf16",
		prize: "18,000",
		displayKey: "lbl_roundOf16"
	},
	quarterFinals: {
		eventName: "quarterFinals",
		prize: "28,000",
		displayKey: "lbl_quarterFinals"
	},
	semiFinals: {
		eventName: "semiFinals",
		prize: "38,000",
		displayKey: "lbl_semiFinals"
	},
	thirdPlace: {
		eventName: "3rdPlace",
		prize: "68,000",
		displayKey: "lbl_3rdPlace"
	},
	final: {
		eventName: "final",
		prize: "118,000",
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
				nameTH: "เซเนกัล",
				nameCS: "塞内加尔",
				imgName: "senegal.jpg"
			},
			teamB: {
				name: "Netherlands",
				nameTH: "เนเธอร์แลนด์",
				nameCS: "荷兰",
				imgName: "netherlands.jpg"
			}
		},
		{
			time: "2022/11/21 13:00 +0000",
			teamA: {
				name: "England",
				nameTH: "อังกฤษ",
				nameCS: "英格兰",
				imgName: "england.jpg"
			},
			teamB: {
				name: "IR Iran",
				nameTH: "อิหร่าน",
				nameCS: "伊朗",
				imgName: "iran.jpg"
			}
		}
	],
	1122: [
		{
			time: "2022/11/21 16:00 +0000",
			teamA: {
				name: "Qatar",
				nameTH: "กาตาร์",
				nameCS: "卡塔尔",
				imgName: "qatar.jpg"
			},
			teamB: {
				name: "Ecuador",
				nameTH: "เอกวาดอร์",
				nameCS: "厄瓜多尔",
				imgName: "ecuador.jpg"
			}
		},
		{
			time: "2022/11/22 19:00 +0000",
			teamA: {
				name: "USA",
				nameTH: "สหรัฐอเมริกา",
				nameCS: "美国",
				imgName: "usa.jpg"
			},
			teamB: {
				name: "Wales",
				nameTH: "เวลส์",
				nameCS: "威尔斯",
				imgName: "wales.jpg"
			}
		},
		{
			time: "2022/11/22 10:00 +0000",
			teamA: {
				name: "Argentina",
				nameTH: "อาร์เจนติน่า",
				nameCS: "阿根廷",
				imgName: "argentina.jpg"
			},
			teamB: {
				name: "Saudi Arabia",
				nameTH: "ซาอุดิ อาระเบีย",
				nameCS: "沙地阿拉伯",
				imgName: "saudi arabia.jpg"
			}
		},
		{
			time: "2022/11/22 13:00 +0000",
			teamA: {
				name: "Denmark",
				nameTH: "เดนมาร์ก",
				nameCS: "丹麦",
				imgName: "denmark.jpg"
			},
			teamB: {
				name: "Tunisia",
				nameTH: "ตูนิเซีย",
				nameCS: "突尼西亚",
				imgName: "tunisia.jpg"
			}
		}
	],
	1123: [
		{
			time: "2022/11/22 16:00 +0000",
			teamA: {
				name: "Mexico",
				nameTH: "เม็กซิโก",
				nameCS: "墨西哥",
				imgName: "mexico.jpg"
			},
			teamB: {
				name: "Poland",
				nameTH: "โปแลนด์",
				nameCS: "波兰",
				imgName: "poland.jpg"
			}
		},
		{
			time: "2022/11/22 19:00 +0000",
			teamA: {
				name: "France",
				nameTH: "ฝรั่งเศส",
				nameCS: "法国",
				imgName: "france.jpg"
			},
			teamB: {
				name: "Australia",
				nameTH: "ออสเตรเลีย",
				nameCS: "澳洲",
				imgName: "australia.jpg"
			}
		},
		{
			time: "2022/11/23 10:00 +0000",
			teamA: {
				name: "Morocco",
				nameTH: "โมร็อกโก",
				nameCS: "摩洛哥",
				imgName: "morocco.jpg"
			},
			teamB: {
				name: "Croatia",
				nameTH: "โครเอเชีย",
				nameCS: "克罗地亚",
				imgName: "croatia.jpg"
			}
		},
		{
			time: "2022/11/23 13:00 +0000",
			teamA: {
				name: "Germany",
				nameTH: "เยอรมัน",
				nameCS: "德国",
				imgName: "germany.jpg"
			},
			teamB: {
				name: "Japan",
				nameTH: "ญุี่ปุ่น",
				nameCS: "日本",
				imgName: "japan.jpg"
			}
		}
	],
	1124: [
		{
			time: "2022/11/23 16:00 +0000",
			teamA: {
				name: "Spain",
				nameTH: "สเปน",
				nameCS: "西班牙",
				imgName: "spain.jpg"
			},
			teamB: {
				name: "Costa Rica",
				nameTH: "คอสตาริกา",
				nameCS: "哥斯达黎加",
				imgName: "costa rica.jpg"
			}
		},
		{
			time: "2022/11/23 19:00 +0000",
			teamA: {
				name: "Belgium",
				nameTH: "เบลเยี่ยม",
				nameCS: "比利时",
				imgName: "belgium.jpg"
			},
			teamB: {
				name: "Canada",
				nameTH: "แคนาดา",
				nameCS: "加拿大",
				imgName: "canada.jpg"
			}
		},
		{
			time: "2022/11/24 10:00 +0000",
			teamA: {
				name: "Switzerland",
				nameTH: "สวิตเซอร์แลนด์",
				nameCS: "瑞士",
				imgName: "switzerland.jpg"
			},
			teamB: {
				name: "Cameroon",
				nameTH: "แคเมอรูน",
				nameCS: "喀麦隆",
				imgName: "cameroon.jpg"
			}
		},
		{
			time: "2022/11/24 13:00 +0000",
			teamA: {
				name: "Uruguay",
				nameTH: "อุรุกวัย",
				nameCS: "乌拉圭",
				imgName: "uruguay.jpg"
			},
			teamB: {
				name: "Korea Republic",
				nameTH: "เกาหลีใต้",
				nameCS: "南韩",
				imgName: "korea republic.jpg"
			}
		}
	],
	1125: [
		{
			time: "2022/11/24 16:00 +0000",
			teamA: {
				name: "Portugal",
				nameTH: "โปรตุเกส",
				nameCS: "葡萄牙",
				imgName: "portugal.jpg"
			},
			teamB: {
				name: "Ghana",
				nameTH: "กานา",
				nameCS: "加纳",
				imgName: "ghana.jpg"
			}
		},
		{
			time: "2022/11/24 19:00 +0000",
			teamA: {
				name: "Brazil",
				nameTH: "บราซิล",
				nameCS: "巴西",
				imgName: "brazil.jpg"
			},
			teamB: {
				name: "Serbia",
				nameTH: "เซอร์เบีย",
				nameCS: "塞尔维亚",
				imgName: "serbia.jpg"
			}
		},
		{
			time: "2022/11/25 10:00 +0000",
			teamA: {
				name: "Wales",
				nameTH: "เวลส์",
				nameCS: "威尔斯",
				imgName: "wales.jpg"
			},
			teamB: {
				name: "IR Iran",
				nameTH: "อิหร่าน",
				nameCS: "伊朗",
				imgName: "iran.jpg"
			}
		},
		{
			time: "2022/11/25 13:00 +0000",
			teamA: {
				name: "Qatar",
				nameTH: "กาตาร์",
				nameCS: "卡塔尔",
				imgName: "qatar.jpg"
			},
			teamB: {
				name: "Senegal",
				nameTH: "เซเนกัล",
				nameCS: "塞内加尔",
				imgName: "senegal.jpg"
			}
		}
	],
	1126: [
		{
			time: "2022/11/25 16:00 +0000",
			teamA: {
				name: "Netherlands",
				nameTH: "เนเธอร์แลนด์",
				nameCS: "荷兰",
				imgName: "netherlands.jpg"
			},
			teamB: {
				name: "Ecuador",
				nameTH: "เอกวาดอร์",
				nameCS: "厄瓜多尔",
				imgName: "ecuador.jpg"
			}
		},
		{
			time: "2022/11/25 19:00 +0000",
			teamA: {
				name: "England",
				nameTH: "อังกฤษ",
				nameCS: "英格兰",
				imgName: "england.jpg"
			},
			teamB: {
				name: "USA",
				nameTH: "สหรัฐอเมริกา",
				nameCS: "美国",
				imgName: "usa.jpg"
			}
		},
		{
			time: "2022/11/26 10:00 +0000",
			teamA: {
				name: "Tunisia",
				nameTH: "ตูนิเซีย",
				nameCS: "突尼西亚",
				imgName: "tunisia.jpg"
			},
			teamB: {
				name: "Australia",
				nameTH: "ออสเตรเลีย",
				nameCS: "澳洲",
				imgName: "australia.jpg"
			}
		},
		{
			time: "2022/11/26 13:00 +0000",
			teamA: {
				name: "Poland",
				nameTH: "โปแลนด์",
				nameCS: "波兰",
				imgName: "poland.jpg"
			},
			teamB: {
				name: "Saudi Arabia",
				nameTH: "ซาอุดิ อาระเบีย",
				nameCS: "沙地阿拉伯",
				imgName: "saudi arabia.jpg"
			}
		}
	],
	1127: [
		{
			time: "2022/11/26 16:00 +0000",
			teamA: {
				name: "France",
				nameTH: "ฝรั่งเศส",
				nameCS: "法国",
				imgName: "france.jpg"
			},
			teamB: {
				name: "Denmark",
				nameTH: "เดนมาร์ก",
				nameCS: "丹麦",
				imgName: "denmark.jpg"
			}
		},
		{
			time: "2022/11/26 19:00 +0000",
			teamA: {
				name: "Argentina",
				nameTH: "อาร์เจนติน่า",
				nameCS: "阿根廷",
				imgName: "argentina.jpg"
			},
			teamB: {
				name: "Mexico",
				nameTH: "เม็กซิโก",
				nameCS: "墨西哥",
				imgName: "mexico.jpg"
			}
		},
		{
			time: "2022/11/27 10:00 +0000",
			teamA: {
				name: "Japan",
				nameTH: "ญุี่ปุ่น",
				nameCS: "日本",
				imgName: "japan.jpg"
			},
			teamB: {
				name: "Costa Rica",
				nameTH: "คอสตาริกา",
				nameCS: "哥斯达黎加",
				imgName: "costa rica.jpg"
			}
		},
		{
			time: "2022/11/27 13:00 +0000",
			teamA: {
				name: "Belgium",
				nameTH: "เบลเยี่ยม",
				nameCS: "比利时",
				imgName: "belgium.jpg"
			},
			teamB: {
				name: "Morocco",
				nameTH: "โมร็อกโก",
				nameCS: "摩洛哥",
				imgName: "morocco.jpg"
			}
		}
	],
	1128: [
		{
			time: "2022/11/27 16:00 +0000",
			teamA: {
				name: "Croatia",
				nameTH: "โครเอเชีย",
				nameCS: "克罗地亚",
				imgName: "croatia.jpg"
			},
			teamB: {
				name: "Canada",
				nameTH: "แคนาดา",
				nameCS: "加拿大",
				imgName: "canada.jpg"
			}
		},
		{
			time: "2022/11/27 19:00 +0000",
			teamA: {
				name: "Spain",
				nameTH: "สเปน",
				nameCS: "西班牙",
				imgName: "spain.jpg"
			},
			teamB: {
				name: "Germany",
				nameTH: "เยอรมัน",
				nameCS: "德国",
				imgName: "germany.jpg"
			}
		},
		{
			time: "2022/11/28 10:00 +0000",
			teamA: {
				name: "Cameroon",
				nameTH: "แคเมอรูน",
				nameCS: "喀麦隆",
				imgName: "cameroon.jpg"
			},
			teamB: {
				name: "Serbia",
				nameTH: "เซอร์เบีย",
				nameCS: "塞尔维亚",
				imgName: "serbia.jpg"
			}
		},
		{
			time: "2022/11/28 13:00 +0000",
			teamA: {
				name: "Korea Republic",
				nameTH: "เกาหลีใต้",
				nameCS: "南韩",
				imgName: "korea republic.jpg"
			},
			teamB: {
				name: "Ghana",
				nameTH: "กานา",
				nameCS: "加纳",
				imgName: "ghana.jpg"
			}
		}
	],
	1129: [
		{
			time: "2022/11/28 16:00 +0000",
			teamA: {
				name: "Brazil",
				nameTH: "บราซิล",
				nameCS: "巴西",
				imgName: "brazil.jpg"
			},
			teamB: {
				name: "Switzerland",
				nameTH: "สวิตเซอร์แลนด์",
				nameCS: "瑞士",
				imgName: "switzerland.jpg"
			}
		},
		{
			time: "2022/11/28 19:00 +0000",
			teamA: {
				name: "Portugal",
				nameTH: "โปรตุเกส",
				nameCS: "葡萄牙",
				imgName: "portugal.jpg"
			},
			teamB: {
				name: "Uruguay",
				nameTH: "อุรุกวัย",
				nameCS: "乌拉圭",
				imgName: "uruguay.jpg"
			}
		},
		{
			time: "2022/11/29 15:00 +0000",
			teamA: {
				name: "Ecuador",
				nameTH: "เอกวาดอร์",
				nameCS: "厄瓜多尔",
				imgName: "ecuador.jpg"
			},
			teamB: {
				name: "Senegal",
				nameTH: "เซเนกัล",
				nameCS: "塞内加尔",
				imgName: "senegal.jpg"
			}
		},
		{
			time: "2022/11/29 15:00 +0000",
			teamA: {
				name: "Netherlands",
				nameTH: "เนเธอร์แลนด์",
				nameCS: "荷兰",
				imgName: "netherlands.jpg"
			},
			teamB: {
				name: "Qatar",
				nameTH: "กาตาร์",
				nameCS: "卡塔尔",
				imgName: "qatar.jpg"
			}
		}
	],
	1130: [
		{
			time: "2022/11/29 19:00 +0000",
			teamA: {
				name: "Wales",
				nameTH: "เวลส์",
				nameCS: "威尔斯",
				imgName: "wales.jpg"
			},
			teamB: {
				name: "England",
				nameTH: "อังกฤษ",
				nameCS: "英格兰",
				imgName: "england.jpg"
			}
		},
		{
			time: "2022/11/29 19:00 +0000",
			teamA: {
				name: "IR Iran",
				nameTH: "อิหร่าน",
				nameCS: "伊朗",
				imgName: "iran.jpg"
			},
			teamB: {
				name: "USA",
				nameTH: "สหรัฐอเมริกา",
				nameCS: "美国",
				imgName: "usa.jpg"
			}
		},
		{
			time: "2022/11/30 15:00 +0000",
			teamA: {
				name: "Australia",
				nameTH: "ออสเตรเลีย",
				nameCS: "澳洲",
				imgName: "australia.jpg"
			},
			teamB: {
				name: "Denmark",
				nameTH: "เดนมาร์ก",
				nameCS: "丹麦",
				imgName: "denmark.jpg"
			}
		},
		{
			time: "2022/11/30 15:00 +0000",
			teamA: {
				name: "Tunisia",
				nameTH: "ตูนิเซีย",
				nameCS: "突尼西亚",
				imgName: "tunisia.jpg"
			},
			teamB: {
				name: "France",
				nameTH: "ฝรั่งเศส",
				nameCS: "法国",
				imgName: "france.jpg"
			}
		}
	],
	1201: [
		{
			time: "2022/11/30 19:00 +0000",
			teamA: {
				name: "Poland",
				nameTH: "โปแลนด์",
				nameCS: "波兰",
				imgName: "poland.jpg"
			},
			teamB: {
				name: "Argentina",
				nameTH: "อาร์เจนติน่า",
				nameCS: "阿根廷",
				imgName: "argentina.jpg"
			}
		},
		{
			time: "2022/11/30 19:00 +0000",
			teamA: {
				name: "Saudi Arabia",
				nameTH: "ซาอุดิ อาระเบีย",
				nameCS: "沙地阿拉伯",
				imgName: "saudi arabia.jpg"
			},
			teamB: {
				name: "Mexico",
				nameTH: "เม็กซิโก",
				nameCS: "墨西哥",
				imgName: "mexico.jpg"
			}
		},
		{
			time: "2022/12/01 15:00 +0000",
			teamA: {
				name: "Croatia",
				nameTH: "โครเอเชีย",
				nameCS: "克罗地亚",
				imgName: "croatia.jpg"
			},
			teamB: {
				name: "Belgium",
				nameTH: "เบลเยี่ยม",
				nameCS: "比利时",
				imgName: "belgium.jpg"
			}
		},
		{
			time: "2022/12/01 15:00 +0000",
			teamA: {
				name: "Canada",
				nameTH: "แคนาดา",
				nameCS: "加拿大",
				imgName: "canada.jpg"
			},
			teamB: {
				name: "Morocco",
				nameTH: "โมร็อกโก",
				nameCS: "摩洛哥",
				imgName: "morocco.jpg"
			}
		}
	],
	1202: [
		{
			time: "2022/12/01 19:00 +0000",
			teamA: {
				name: "Japan",
				nameTH: "ญุี่ปุ่น",
				nameCS: "日本",
				imgName: "japan.jpg"
			},
			teamB: {
				name: "Spain",
				nameTH: "สเปน",
				nameCS: "西班牙",
				imgName: "spain.jpg"
			}
		},
		{
			time: "2022/12/01 19:00 +0000",
			teamA: {
				name: "Costa Rica",
				nameTH: "คอสตาริกา",
				nameCS: "哥斯达黎加",
				imgName: "costa rica.jpg"
			},
			teamB: {
				name: "Germany",
				nameTH: "เยอรมัน",
				nameCS: "德国",
				imgName: "germany.jpg"
			}
		},
		{
			time: "2022/12/02 15:00 +0000",
			teamA: {
				name: "Ghana",
				nameTH: "กานา",
				nameCS: "加纳",
				imgName: "ghana.jpg"
			},
			teamB: {
				name: "Uruguay",
				nameTH: "อุรุกวัย",
				nameCS: "乌拉圭",
				imgName: "uruguay.jpg"
			}
		},
		{
			time: "2022/12/02 15:00 +0000",
			teamA: {
				name: "Korea Republic",
				nameTH: "เกาหลีใต้",
				nameCS: "南韩",
				imgName: "korea republic.jpg"
			},
			teamB: {
				name: "Portugal",
				nameTH: "โปรตุเกส",
				nameCS: "葡萄牙",
				imgName: "portugal.jpg"
			}
		}
	],
	1203: [
		{
			time: "2022/12/02 19:00 +0000",
			teamA: {
				name: "Serbia",
				nameTH: "เซอร์เบีย",
				nameCS: "塞尔维亚",
				imgName: "serbia.jpg"
			},
			teamB: {
				name: "Switzerland",
				nameTH: "สวิตเซอร์แลนด์",
				nameCS: "瑞士",
				imgName: "switzerland.jpg"
			}
		},
		{
			time: "2022/12/02 19:00 +0000",
			teamA: {
				name: "Cameroon",
				nameTH: "แคเมอรูน",
				nameCS: "喀麦隆",
				imgName: "cameroon.jpg"
			},
			teamB: {
				name: "Brazil",
				nameTH: "บราซิล",
				nameCS: "巴西",
				imgName: "brazil.jpg"
			}
		}
	]
};
