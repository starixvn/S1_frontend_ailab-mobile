import { defGameInfo } from "../../datas/productList";
import path from "../../path";

const defPlatfrom = [
	{
		...defGameInfo.Sports,
		parameter: { ...defGameInfo.Sports },
		imgName: "sabaa",
		otherPlatformImg: "sabab",
		tpGameType: 1
	},
	// {
	// 	...defGameInfo.BTISport,
	// 	imgName: "btia",
	// 	tpGameType: 49
	// },
	{
		...defGameInfo.LIVEcasinoAG,
		imgName: "aga",
		tpGameType: 8
	},
	{
		...defGameInfo.LIVEcasinoAE,
		imgName: "aea",
		tpGameType: 18
	},
	{
		...defGameInfo.LIVEcasinoN2,
		imgName: "n2livea",
		otherPlatformImg: "n2liveb",
		tpGameType: 45
	},
	{
		...defGameInfo.Casino_PP,
		path: path.casino.root,
		parameter: { ...defGameInfo.Casino_PP },
		imgName: "ppa",
		otherPlatformImg: "ppb",
		tpGameType: 16
	},
	{
		...defGameInfo.Casino_MGP,
		imgName: "mga",
		tpGameType: 58
	},
	{
		...defGameInfo.Casino_PT,
		path: path.casino.root,
		parameter: { ...defGameInfo.Casino_PT },
		imgName: "playtecha",
		tpGameType: 46
	},
	{
		...defGameInfo.Casino_PG,
		path: path.casino.root,
		parameter: { ...defGameInfo.Casino_PG },
		imgName: "pga",
		tpGameType: 17
	},
	{
		...defGameInfo.Casino_SG,
		path: path.casino.root,
		parameter: { ...defGameInfo.Casino_SG },
		imgName: "sga",
		tpGameType: 15
	},
	{
		...defGameInfo.Casino_YGG,
		path: path.casino.root,
		parameter: { ...defGameInfo.Casino_YGG },
		imgName: "yga",
		otherPlatformImg: "ygb",
		tpGameType: 14
	},
	{
		...defGameInfo.Casino_CQ9,
		path: path.casino.root,
		parameter: { ...defGameInfo.Casino_CQ9 },
		imgName: "cq9a",
		tpGameType: 29
	},
	{
		...defGameInfo.Casino_Jili,
		imgName: "jilia",
		tpGameType: 53
	},
	{
		...defGameInfo.Fishing,
		imgName: "yla",
		tpGameType: 12
	},
	{
		...defGameInfo.V8Poker,
		imgName: "v8a",
		tpGameType: 42
	},
	{
		...defGameInfo.kingMaker,
		imgName: "kingmakera",
		tpGameType: 52
	}
];

export default defPlatfrom;
